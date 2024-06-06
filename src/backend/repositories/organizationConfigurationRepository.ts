import { prisma } from '@/backend/utils/db';
import { CreateOrganizationConfigurationDTO } from '../interfaces/registerOrganizationConfigurationInterface';

export async function registerOrganizationConfigurationRepository(data: CreateOrganizationConfigurationDTO) {
    return await prisma.availabilityConfiguration.create({ data });
} 

export async function findOrganizationConfigurationRepository(
    filter: Pick<CreateOrganizationConfigurationDTO, 'organizationId'>,
) {
    return await prisma.availabilityConfiguration.findFirst({ where: filter });
}

export async function updateOrganizationConfigurationRepository(
    filter: Pick<CreateOrganizationConfigurationDTO, 'organizationId'>,
    data: Omit<CreateOrganizationConfigurationDTO, 'organizationId'>,
) {
    return await prisma.availabilityConfiguration.update({ where: filter, data });
}
