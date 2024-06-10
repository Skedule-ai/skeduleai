import{
    registerAvailabilityConfigurationService,
    findAvailabilityConfigurationService,
    updateAvailabilityConfigurationService,
} from '@/backend/services/availabilityConfigurationService';
import { CreateAvailabilityConfigurationDTO } from '@/backend/interfaces/registerAvailabilityConfigurationInterface';

export async function registerAvailabilityConfiguration(data: CreateAvailabilityConfigurationDTO) {
    return await registerAvailabilityConfigurationService(data);
}

export async function findAvailabilityConfiguration() {
    return await findAvailabilityConfigurationService();
}

export async function updateAvailabilityConfiguration(data: CreateAvailabilityConfigurationDTO) {
    return await updateAvailabilityConfigurationService(data);
}