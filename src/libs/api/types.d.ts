import { Prisma } from '@prisma/client';

export type CreateUserConfigurationArgs = {
    onBoardingModal?: boolean;
};

export type AvailabilityConfigurationInput = Pick<
    Prisma.availabilityConfigurationCreateInput,
    'timezone' | 'startTime' | 'endTime' | 'duration'
> & { days: number[] };

export type CreateAvailabilityConfigurationInput = {
    organizationId?: string;
    availabilityConfiguration: AvailabilityConfigurationInput;
};
