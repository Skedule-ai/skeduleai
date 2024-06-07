import { prisma } from '@/backend/utils/db';
import { CreateUserConfigurationDTO } from '../interfaces/createUserConfigurationInterface';

export async function createUserConfigurationRepository(data: CreateUserConfigurationDTO) {
    return await prisma.userConfiguration.create({ data });
}

export async function findUserConfigurationRepository(
    filter: Pick<CreateUserConfigurationDTO, 'userId'>,
) {
    return await prisma.userConfiguration.findFirst({ where: filter });
}

export async function updateUserConfigurationRepository(
    filter: Pick<CreateUserConfigurationDTO, 'userId'>,
    data: Omit<CreateUserConfigurationDTO, 'userId'>,
) {
    return await prisma.userConfiguration.update({ where: filter, data });
}
