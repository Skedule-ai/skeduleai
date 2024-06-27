// pages/booking/[id].tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form } from 'formik';
import BookingManageSchema from '@/components/organisms/validations/booking-manage-form-validation';
import toast, { Toaster } from 'react-hot-toast';
import Container from '@/components/atoms/container';
import PageHeader from '@/components/atoms/pageheader';
import { Flex } from '@/components/atoms/flex';
import { ErrorTitle, Header1, Header3 } from '@/components/atoms/typography';
import Input from '@/components/atoms/fields';
import Button from '@/components/atoms/button';
import InfoCard from '@/components/atoms/card/InfoCard';
import BookingModal from '@/components/atoms/modals/BookingModal';
import BookingModalMobile from '@/components/atoms/modals/booking-modal-mobile';
import ScheduleAILogo from '@/components/atoms/icons/schedule-ai-logo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimezoneSelect, { ITimezone } from 'react-timezone-select';
import makeAnimated from 'react-select/animated';
import Select, { GroupBase, StylesConfig } from 'react-select';
import { Loader } from '@strapi/icons';
import { useUser } from '@clerk/nextjs';
import useServiceProvider from '@/libs/hooks/useServiceProvider';
import useBookAppointment from '@/libs/hooks/useBookAppointment';
import BookingSkeletonLoader from '@/components/atoms/skeleton/bookingPage/bookingSkeleton';

const animatedComponents = makeAnimated();

type SlotType = { startTime: string; endTime: string };
type FieldType = { name: string; value: Date | string };

type AvailabilityFormInputType = {
    field: FieldType;
    form: any;
    availableTimeSlots: { day: number; slots: SlotType[] }[];
    setAvailableTimeSlots: (val: SlotType[]) => void;
};

const CustomDatePicker: React.FC<AvailabilityFormInputType> = ({
    field,
    form,
    availableTimeSlots,
    setAvailableTimeSlots,
    ...props
}) => {
    const handleDateChange = (val: Date | null) => {
        form.setFieldValue(field.name, val);
        if (val) {
            const selectedDay = val.getDay() + 1;
            const timeSlotsForDay =
                availableTimeSlots.find((slot) => slot.day === selectedDay)?.slots || [];
            setAvailableTimeSlots(timeSlotsForDay);
        }
    };

    return (
        <DatePicker
            selected={field.value as Date}
            onChange={handleDateChange}
            minDate={new Date()}
            {...props}
            className='w-full rounded-md border p-3'
        />
    );
};

const CustomTimezoneSelect: React.FC<{ field: FieldType; form: any }> = ({
    field,
    form,
    ...props
}) => {
    const customStyles: StylesConfig<ITimezone, false, GroupBase<ITimezone>> | undefined = {
        control: (provided) => ({
            ...provided,
            width: '100%',
            padding: '5px',
        }),
    };

    return (
        <TimezoneSelect
            value={field.value.toString()}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
            styles={customStyles}
            {...props}
        />
    );
};

const CustomTimeSelect: React.FC<
    Omit<AvailabilityFormInputType, 'setAvailableTimeSlots' | 'availableTimeSlots'> & {
        availableTimeSlots: SlotType[];
    }
> = ({ field, form, availableTimeSlots, ...props }) => {
    const options = availableTimeSlots.map((slot) => ({
        value: slot.startTime,
        label: slot.startTime,
    }));

    const customStyles = {
        menu: (provided: any) => ({
            ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        }),
        option: (provided: any, state: { isSelected: boolean }) => ({
            ...provided,
            padding: '10px',
            border: '1px solid gray',
            width: '7rem',
            backgroundColor: state.isSelected ? 'green' : 'transparent',
            color: state.isSelected ? 'white' : 'black',
        }),
    };

    return (
        <Select
            options={options}
            value={options.find((option) => option.value === field.value) || null}
            onChange={(option) => form.setFieldValue(field.name, option?.value ?? '')}
            components={animatedComponents}
            isClearable
            className='w-full rounded-md border p-3'
            styles={customStyles}
            isMulti={false}
            {...props}
        />
    );
};

const BookAppointmentsPage: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { isSignedIn } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMobile, setIsOpenMobile] = useState(false);
    const [isMediumOrLarger, setIsMediumOrLarger] = useState(false);
    const [formData, setFormData] = useState({
        meetingDuration: '30',
        selectDate: '',
        selectTime: '',
        timeZone: '',
    });
    const [availableTimeSlots, setAvailableTimeSlots] = useState<SlotType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const id = params.id;
    const router = useRouter();

    const { serviceProvider, allTimeSlots, error, isLoading, organization } = useServiceProvider(
        id,
        {
            onCompleted: () => toast.success('Successfully fetched the Details'),
            onError: () => {
                toast.error('Failed to fetch service provider details.');
                router.push('/404');
            },
        },
    );

    const { bookAppointment } = useBookAppointment(id, {
        onCompleted: (responseData: any) => {
            toast.success('Appointment booked successfully!');
            const queryParams = new URLSearchParams({
                image: serviceProvider?.image ?? '',
                name: serviceProvider?.name ?? '',
                organizationName: organization?.name ?? '',
                id: params.id,
            }).toString();

            router.push(`/booking/${id}/booking-confirm?${queryParams}`);
            setIsSubmitting(false);
        },
        onError: () => {
            toast.error('Failed to book the appointment.');
            setIsSubmitting(false);
        },
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMediumOrLarger(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (allTimeSlots) {
            setAvailableTimeSlots(allTimeSlots);
        }
    }, [allTimeSlots]);

    const handleSubmit = async (values: {
        meetingDuration: string;
        selectDate: string;
        selectTime: string;
        timeZone: string;
    }) => {
        setIsSubmitting(true);

        const formattedValues = {
            ...values,
            selectDate: values.selectDate,
            selectTime: values.selectTime,
            timeZone: values.timeZone,
        };

        setFormData(formattedValues);

        if (isSignedIn) {
            try {
                const payload = {
                    timezone: formattedValues.timeZone,
                    startTime: '2024-06-25T08:00:00Z',
                    endTime: '2024-06-25T09:00:00Z',
                };

                console.log('Payload:', JSON.stringify(payload));
                await bookAppointment(payload);
            } catch (error) {
                console.error('Error booking appointment:', error);
            }
        } else {
            if (isMediumOrLarger) {
                setIsOpen(true);
            } else {
                setIsOpenMobile(true);
            }
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <BookingSkeletonLoader />;
    }

    return (
        <Container fullWidth>
            <Toaster />
            <PageHeader logoSrc={<ScheduleAILogo />} OrganizationName={organization?.name || ''} />
            <Flex
                dir='row'
                justifyContent='between'
                alignItems='center'
                className='m-auto mt-10 w-[90%]'
            >
                <Flex dir='column' gap={4} className='m-5 h-auto md:m-0 md:pl-28 lg:w-1/2'>
                    <Header1>Hey There!</Header1>
                    <Header3>
                        Schedule your appointment in just a few easy steps: Select a service, choose
                        your date and time, and enter your details. We look forward to seeing you!
                    </Header3>
                    <Formik
                        initialValues={formData}
                        validationSchema={BookingManageSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className='md:w-80'>
                                <Flex dir='column' gap={3} className='w-full md:w-auto'>
                                    <Field
                                        name='meetingDuration'
                                        as={Input}
                                        placeholder='Meeting duration'
                                    />
                                    {errors.meetingDuration && touched.meetingDuration ? (
                                        <ErrorTitle>{errors.meetingDuration}</ErrorTitle>
                                    ) : null}
                                    <Field
                                        name='selectDate'
                                        component={CustomDatePicker}
                                        availableTimeSlots={allTimeSlots}
                                        setAvailableTimeSlots={setAvailableTimeSlots}
                                        placeholderText='Select date'
                                    />
                                    {errors.selectDate && touched.selectDate ? (
                                        <ErrorTitle className=''>{errors.selectDate}</ErrorTitle>
                                    ) : null}

                                    {availableTimeSlots.length > 0 ? (
                                        <Field
                                            name='selectTime'
                                            component={CustomTimeSelect}
                                            availableTimeSlots={availableTimeSlots}
                                            placeholder='Select time'
                                        />
                                    ) : (
                                        <ErrorTitle>No available time slots</ErrorTitle>
                                    )}

                                    {errors.selectTime && touched.selectTime ? (
                                        <ErrorTitle>{errors.selectTime}</ErrorTitle>
                                    ) : null}

                                    <Field
                                        name='timeZone'
                                        component={CustomTimezoneSelect}
                                        placeholder='Select timezone'
                                    />
                                    {errors.timeZone && touched.timeZone ? (
                                        <ErrorTitle>{errors.timeZone}</ErrorTitle>
                                    ) : null}
                                </Flex>
                                {error && <ErrorTitle>{error.message}</ErrorTitle>}
                                <Flex
                                    dir='row'
                                    justifyContent='center'
                                    className='md:flex md:justify-start'
                                >
                                    <Button
                                        className='mt-10'
                                        type='submit'
                                        size='lg'
                                        color='outline'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className='flex items-center gap-2'>
                                                <div className='animate-spin'>
                                                    <Loader fontSize={16} />
                                                </div>
                                                {'Booking...'}
                                            </div>
                                        ) : (
                                            'Book Appointment'
                                        )}
                                    </Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Flex>

                <Flex dir='row' justifyContent='center' className='hidden h-full w-1/2 lg:flex'>
                    <InfoCard
                        batchColor='green'
                        batchState='default'
                        buttonText='designation'
                        imageUrl={serviceProvider?.image || '/default-image.jpg'}
                        subtitle='Service Provider'
                        title={serviceProvider?.name || 'Service Provider Name'}
                        variant='default'
                    >
                        <p></p>
                    </InfoCard>
                </Flex>
            </Flex>

            {isOpen && isMediumOrLarger && (
                <BookingModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    formData={formData}
                    serviceId={id}
                    serviceProviderName={serviceProvider?.name ?? ''}
                    availableTimeSlots={availableTimeSlots}
                    image={serviceProvider?.image ?? ''}
                />
            )}

            {isOpenMobile && !isMediumOrLarger && (
                <BookingModalMobile
                    isOpen={isOpenMobile}
                    onClose={() => setIsOpenMobile(false)}
                    formData={formData}
                />
            )}
        </Container>
    );
};

export default BookAppointmentsPage;
