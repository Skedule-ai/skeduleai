import { currentUser } from '@clerk/nextjs/server';

import{
    registerAvailabilityConfigurationRepository,
    findAvailabilityConfigurationRepository
} from '@/backend/repositories/availabilityConfigurationRepository';
import { CreateAvailabilityConfigurationDTO } from '../interfaces/registerAvailabilityConfigurationInterface';

export async function registerAvailabilityConfigurationService(data: CreateAvailabilityConfigurationDTO) {
    const availabilityConfiguration = await registerAvailabilityConfigurationRepository(data);
    return { availabilityConfiguration };
}

export async function findAvailabilityConfigurationService() {
    const user = await currentUser();
    if (user?.id) {
        const availabilityConfiguration = await findAvailabilityConfigurationRepository({ organizationId: user?.id });
        return { availabilityConfiguration };
    }
}

export async function updateAvailabilityConfigurationService(data: CreateAvailabilityConfigurationDTO) {
    const availabilityConfiguration = await registerAvailabilityConfigurationRepository(data);
    return { availabilityConfiguration };
}