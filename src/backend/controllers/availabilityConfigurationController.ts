import {
    addAvailabilitConfigurationService,
    AvailabilityConfigServiceInput,
    findAvailabilityConfigurationService,
    updateAvailabilityConfigurationService,
} from '@/backend/services/availabilityConfigurationService';

type AvailabilityConfigurationInput = {
    organizationId: string;
    availabilityConfiguration: AvailabilityConfigServiceInput;
};

export async function addAvailabilitConfigurationController(data: AvailabilityConfigurationInput) {
    const availabilityConfiguration = await addAvailabilitConfigurationService(
        data.organizationId,
        data.availabilityConfiguration,
    );
    return { availabilityConfiguration };
}

export async function findAvailabilityConfigurationController() {
    const availabilityConfiguration = await findAvailabilityConfigurationService();
    return { availabilityConfiguration };
}

export async function updateAvailabilityConfigurationController(
    data: AvailabilityConfigurationInput,
) {
    return await updateAvailabilityConfigurationService(
        data.organizationId,
        data.availabilityConfiguration,
    );
}


