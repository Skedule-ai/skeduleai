import{
    registerOrganizationConfigurationService,
    findOrganizationConfigurationService,
    updateOrganizationConfigurationService,
} from '@/backend/services/organizationConfigurationService';
import { CreateOrganizationConfigurationDTO } from '@/backend/interfaces/registerOrganizationConfigurationInterface';

export async function registerOrganizationConfiguration(data: CreateOrganizationConfigurationDTO) {
    return await registerOrganizationConfigurationService(data);
}

export async function findOrganizationConfiguration() {
    return await findOrganizationConfigurationService();
}

export async function updateOrganizationConfiguration(data: CreateOrganizationConfigurationDTO) {
    return await updateOrganizationConfigurationService(data);
}