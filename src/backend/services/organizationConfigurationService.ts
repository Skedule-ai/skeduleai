import { currentUser } from '@clerk/nextjs/server';

import{
    registerOrganizationConfigurationRepository,
    findOrganizationConfigurationRepository
} from '@/backend/repositories/organizationConfigurationRepository';
import { CreateOrganizationConfigurationDTO } from '../interfaces/registerOrganizationConfigurationInterface';

export async function registerOrganizationConfigurationService(data: CreateOrganizationConfigurationDTO) {
    const organizationConfiguration = await registerOrganizationConfigurationRepository(data);
    return { organizationConfiguration };
}

export async function findOrganizationConfigurationService() {
    const user = await currentUser();
    if (user?.id) {
        const organizationConfiguration = await findOrganizationConfigurationRepository({ id: user?.id });
        return { organizationConfiguration };
    }
}

export async function updateOrganizationConfigurationService(data: CreateOrganizationConfigurationDTO) {
    const organizationConfiguration = await registerOrganizationConfigurationRepository(data);
    return { organizationConfiguration };
}