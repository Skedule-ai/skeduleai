import { Organization, User, clerkClient, currentUser } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { object, string } from 'yup';

import {
    createAppoinmentRepository,
    findAppointmentRepository,
    findAppointmentsRepositoryByServiceId,
    findBookingDetails,
    findGuestUserDetails,
    updateBookingStatusRepo,
} from '@/backend/repositories/appointmentRepository';

import { formatTime } from '@/libs/utils/datetime-helpers';
import {
    findBookingServiceRepo,
    findBookingServiceRepoByUser,
} from '../repositories/bookingServiceRepository';
import { AppointmentStatus } from '../utils/enum';

import {
    sendAppointmentAcceptedEmailService,
    sendAppointmentRejectEmailService,
} from '@/backend/services/emailService';
import { ErrorMessages } from '@/libs/message/error';
import moment from 'moment';
import { findGuestUserData } from '../repositories/guestUserRepository';
import { getClerkClient } from '../utils/clerkClient';
import { getFormattedImagePath, getUser, getUserOrganization } from './clerkService';

const validateAppointmentBooking = object({
    timezone: string().required(ErrorMessages.REQUIRED_INPUT),
    startTime: string().required(ErrorMessages.REQUIRED_INPUT),
    endTime: string().required(ErrorMessages.REQUIRED_INPUT),
    name: string(),
    email: string(),
    phoneNumber: string(),
});

const validateGuestUserData = object({
    name: string().required(ErrorMessages.REQUIRED_INPUT),
    email: string().email().required(ErrorMessages.REQUIRED_INPUT),
    phoneNumber: string().required(ErrorMessages.REQUIRED_INPUT),
});

export type CreateAppointmentInputDataType = Pick<
    Prisma.bookingDetailsCreateInput,
    'startTime' | 'endTime'
> &
    Pick<Prisma.guestUserCreateInput, 'name' | 'email' | 'phoneNumber'>;

export async function createAppointmentService(
    serviceId: string,
    data: CreateAppointmentInputDataType,
) {
    try {
        // Step 1: Validate input data
        const validatedData = await validateAppointmentBooking.validate(data);
        const { name, email, phoneNumber, ...appointmentData } = validatedData;

        // Step 2: Check if user is logged in.
        let user: User | null | undefined = await currentUser();
        const client = getClerkClient();

        // Step 3: If not a logged in user, Make basic info of user required.
        if (!user) {
            await validateGuestUserData.validate(validatedData);
        }

        // Step 4: Check if given basic info is part of our users list.
        if (!user && email && phoneNumber) {
            const userList = await client.users.getUserList({
                emailAddress: [email],
                phoneNumber: [phoneNumber],
            });

            user = userList.data.find((data, inx) => inx === 0);
        }

        // Step 5: Generate booking details.
        const bookingDetails: Prisma.bookingDetailsCreateInput = {
            id: nanoid(8),
            customerId: user?.id ?? '',
            startTime: appointmentData.startTime,
            endTime: appointmentData.endTime,
            timezone: appointmentData.timezone,
            status: AppointmentStatus.PENDING,
        };

        // Step 6: If user record is not found, Register as guest user.
        if (!user && name && email && phoneNumber) {
            bookingDetails.guest = {
                connectOrCreate: {
                    where: {
                        email_phoneNumber: {
                            email,
                            phoneNumber,
                        },
                    },
                    create: {
                        name,
                        email,
                        phoneNumber,
                    },
                },
            };
        }

        // Step 7: Validate if booking service for given serviceid
        if (serviceId) {
            bookingDetails.service = {
                connect: {
                    id: serviceId,
                },
            };
        }

        // Step 8: Add booking details to DB
        const appointment = await createAppoinmentRepository(bookingDetails);

        // Step 9: return booking details
        return { appointment };
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

export async function getAppointmentsService(organizationId: string | null = '') {
    try {
        // Step 1: Check if user is logged in.
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Get user bookin service data for service id
        const bookingService = await findBookingServiceRepoByUser(user.id, organizationId ?? '');
        if (!bookingService) {
            return { appointments: [] };
        }

        // Step 3: Fetch user appointments

        const appointmentList = await findAppointmentsRepositoryByServiceId(bookingService.id);

        // Step 4: format appointment and return it
        const formattedAppointments = await Promise.all(
            appointmentList.map(async (data) => {
                let guestDetails = null;

                if (data.guestUserId) {
                    guestDetails = await findGuestUserDetails(data.guestUserId);
                } else {
                    const clerkUser = await clerkClient.users.getUser(data.customerId);
                    if (clerkUser) {
                        // Fetch additional details including phoneNumber
                        const { username, emailAddresses, phoneNumbers } = clerkUser;
                        guestDetails = {
                            name: `${username}`,
                            email: emailAddresses[0]?.emailAddress ?? '',
                            phoneNumber: phoneNumbers[0]?.phoneNumber ?? '',
                        };
                    }
                }

                return {
                    id: data.id,
                    status: data.status,
                    serviceId: data.serviceId,
                    startTime: formatTime(data.startTime.toISOString()),
                    endTime: formatTime(data.endTime.toISOString()),
                    guestDetails: guestDetails || {},
                };
            }),
        );

        return { appointments: formattedAppointments };
    } catch (error) {
        console.error('Error finding appointment:', error);
        throw error;
    }
}

export async function updateAppointmentStatusService(
    bookingId: string,
    accepted: boolean,
    organizationId = '',
) {
    try {
        // Step 1: Check if user is logged in.
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Get user booking service details.
        const bookingService = await findBookingServiceRepoByUser(user.id, organizationId);
        if (!bookingService?.id) {
            throw new Error(ErrorMessages.BOOKING_DETAILS_NOT_FOUND);
        }

        // Step 3: Get booking details for given booking id.
        const bookingDetails = await findBookingDetails(bookingId, bookingService.id);
        if (!bookingDetails) {
            throw new Error(ErrorMessages.BOOKING_DETAILS_NOT_FOUND);
        }

        // Step 4: Get booking details accept status.
        const acceptStatus = accepted ? AppointmentStatus.ACCEPTED : AppointmentStatus.REJECT;
        if (bookingDetails.status === acceptStatus) {
            return { bookingDetails };
        }

        // Step 5: Update booking details
        const updatedBookingDetails = await updateBookingStatusRepo(bookingId, acceptStatus);

        // Step 6: ToDo: Send email notification.

        let serviceProviderName: string | undefined, customerEmail: string | undefined;
        let appointmentDate: string | undefined, appointmentTime: string | undefined;
        if (bookingDetails.guestUserId) {
            const guestData = await findGuestUserData(bookingDetails.guestUserId);
            serviceProviderName = guestData?.name;
            customerEmail = guestData?.email;
            appointmentDate = moment(guestData?.createdAt).format('YYYY-MM-DD');
            appointmentTime = moment(guestData?.createdAt).format('HH:mm');
        } else if (bookingDetails.customerId) {
            const client = getClerkClient();
            const userData = await client.users.getUser(bookingDetails.customerId);
            serviceProviderName = userData.fullName ?? '';
            const customerEmailObj = userData.emailAddresses.find((email) => email);
            customerEmail = customerEmailObj?.emailAddress;
            appointmentDate = moment(userData.createdAt).format('YYYY-MM-DD');
            appointmentTime = moment(userData.createdAt).format('HH:mm');
        }
        if (acceptStatus === AppointmentStatus.ACCEPTED) {
            if (customerEmail && serviceProviderName && appointmentDate && appointmentTime) {
                await sendAppointmentAcceptedEmailService(
                    customerEmail,
                    serviceProviderName,
                    appointmentDate,
                    appointmentTime,
                );
            }
        } else if (acceptStatus === AppointmentStatus.REJECT) {
            if (customerEmail && serviceProviderName) {
                await sendAppointmentRejectEmailService(customerEmail, serviceProviderName);
            }
        }
        // Step 7: Return formatted booking detials.
        return { bookingDetails: updatedBookingDetails };
    } catch (error) {
        console.error('updateAppointmentStatusService', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export const getBookingDetailsByBookingIdService = async (bookingId?: string) => {
    try {
        if (!bookingId) {
            throw new Error(ErrorMessages.REQUIRED_INPUT);
        }

        const appointmentDetials = await findAppointmentRepository({ id: bookingId });

        if (appointmentDetials) {
            // Step 2: Get booking service data
            const userBookingServiceInfo = await findBookingServiceRepo(
                appointmentDetials.serviceId,
            );
            if (!userBookingServiceInfo?.id) {
                throw new Error(ErrorMessages.INVALID_BOOKING_URL);
            }

            // Step 3: Get organization info if organization id is present
            let organization: Organization | undefined;
            if (userBookingServiceInfo.organizationId) {
                organization = await getUserOrganization(
                    userBookingServiceInfo.organizationId,
                    userBookingServiceInfo.id,
                );
            }

            // Step 4: Get service provider user info
            const user = await getUser(userBookingServiceInfo.userId);

            const formattedOrgDetails = {
                name: organization?.name,
                image: getFormattedImagePath(organization?.imageUrl),
            };

            const serviceProvider = {
                name: user.fullName,
                image: getFormattedImagePath(user?.imageUrl),
            };

            const formattedBookingDetials = {
                date: moment(appointmentDetials.startTime).format('DD-MM-YYYY'),
                startTime: moment(appointmentDetials.startTime).format('HH:MM a'),
                endTime: moment(appointmentDetials.endTime).format('HH:MM a'),
                duration: moment(appointmentDetials.startTime).diff(
                    moment(appointmentDetials.endTime),
                    'minutes',
                ),
                timezone: appointmentDetials.timezone,
                calenderlink: '',
                organization: formattedOrgDetails,
                serviceProvider,
            };

            return {
                bookingDetails: formattedBookingDetials,
            };
        }

        return { bookingDetials: null };
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
};
