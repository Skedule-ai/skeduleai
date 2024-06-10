import { prisma } from '@/backend/utils/db';
import { CreateAvailabilityConfigurationDTO } from '../interfaces/registerAvailabilityConfigurationInterface';

export async function registerAvailabilityConfigurationRepository(data: CreateAvailabilityConfigurationDTO) {
    return await prisma.availabilityConfiguration.create({ data });
} 

export async function findAvailabilityConfigurationRepository(
    filter: Pick<CreateAvailabilityConfigurationDTO, 'organizationId'>,
) {
    return await prisma.availabilityConfiguration.findFirst({ where: filter });
}

export async function updateAvailabilityConfigurationRepository(
    filter: Pick<CreateAvailabilityConfigurationDTO, 'organizationId'>,
    data: Omit<CreateAvailabilityConfigurationDTO, 'organizationId'>,
) {
    return await prisma.availabilityConfiguration.update({ where: filter, data });
}
