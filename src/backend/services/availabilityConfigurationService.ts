import { currentUser } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { object, string, number, array } from 'yup';
import pick from 'lodash/pick';

import {
    addAvailabilityConfigurationRepository,
    findAllAvailabilityConfigurationRepository,
    updateAvailabilityConfigurationRepository,
} from '@/backend/repositories/availabilityConfigurationRepository';
import { ErrorMessages } from '@/libs/message/error';
import { DaysEnum } from '@/libs/utils/enums';
import { createBookingService } from './bookingService';
import { updateUserConfigurationService } from './userConfigurationService';
import { DAYS_LIST } from '@/libs/utils/datetime-helpers';

const validateCreate = object({
    // organizationId: string().required(),
    timezone: string().required(),
    startTime: string().required(),
    endTime: string().required(),
    duration: number().required(),
    days: array(
        number().oneOf(DAYS_LIST, 'Invalid days input.').required('Days input is required.'),
    ).required('Days input is required.'),
});

const validateUpdate = object({
    organizationName: string().typeError('Invalid organization name input'),
    timezone: string().typeError('Invalid timezone input'),
    startTime: string().typeError('Invalid startTime input'),
    endTime: string().typeError('Invalid endTime input'),
    duration: number().typeError('Invalid duration input'),
    day: number()
        .oneOf(DAYS_LIST, 'Invalid day input.')
        .typeError('Invalid day input')
        .required('Missing required input'),
});

export type AvailabilityConfigServiceInput = Omit<
    Prisma.availabilityConfigurationUpdateInput,
    'userId' | 'organizationId' | 'day' | 'createdAt' | 'updatedAt'
> & { days: DaysEnum[] };

export async function addAvailabilitConfigurationService(
    organizationId = '',
    data: AvailabilityConfigServiceInput,
) {
    try {
        // Step 1: Validate if user is authenticated
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Pick required data from JSON
        const inputData = pick(data, ['timezone', 'startTime', 'endTime', 'duration', 'days']);

        // Step 3: Validate input data
        const { days = [], ...validatedData } = await validateCreate.validate(inputData);

        // Step 4: Generate availability configuration for given list of days
        const availabilityConfigArray = days.map((day) => {
            return {
                userId: user?.id,
                organizationId,
                day,
                ...validatedData,
            };
        });

        // Step 5: Insert list of availability configuration
        const availabilityConfiguration =
            await addAvailabilityConfigurationRepository(availabilityConfigArray);

        // Step 6: Create booking url
        await createBookingService({ organizationId });

        // Step 7: Update onboarding status
        await updateUserConfigurationService({ onBoardingModal: true });

        // Step 7: Return count of availability configuration
        return availabilityConfiguration;
    } catch (err) {
        // Added error console for server side debugging
        console.error('addAvailabilitConfigurationService:', err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

export async function findAvailabilityConfigurationService(organizationId = '') {
    try {
        // Step 1: Validate if user is authenticated
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Get list of availability configuration
        const availabilityConfiguration = await findAllAvailabilityConfigurationRepository(
            user.id,
            organizationId,
        );

        // Step 3: Return list of availability configuration
        return availabilityConfiguration;
    } catch (error) {
        throw error;
    }
}

export async function updateAvailabilityConfigurationService(
    organizationId = '',
    data: Omit<
        Prisma.availabilityConfigurationUpdateInput,
        'userId' | 'organizationId' | 'createdAt' | 'updatedAt'
    >,
) {
    try {
        // Step 1: Validate if user is authenticated
        const user = await currentUser();
        if (!user?.id) {
            throw new Error(ErrorMessages.UNAUTHORIZED);
        }

        // Step 2: Pick required data from JSON
        const inputData = pick(data, ['organizationName','timezone', 'startTime', 'endTime', 'duration', 'day']);

        // Step 3: Validate input data
        const { day, ...updateData } = await validateUpdate.validate(inputData);

        // Step 4: Update availability configuration for given user, organization and day
        const availabilityConfiguration = await updateAvailabilityConfigurationRepository(
            { userId: user?.id, organizationId, day },
            updateData,
        );

        // Step 5: Return updated configuration.
        return { availabilityConfiguration };
    } catch (err) {
        console.error('Error updating availability configuration:', err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}
