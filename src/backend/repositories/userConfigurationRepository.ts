import { prisma } from '@/backend/utils/db';
import { CreateUserConfigurationDTO } from '../interfaces/createUserConfigurationInterface';

export async function createUserConfigurationRepository(
    id: string,
    data: CreateUserConfigurationDTO,
) {
    return await prisma.userConfiguration.upsert({
        where: {
            userId: id,
        },
        update: {
            ...data,
        },
        create: { ...data, userId: id },
    });
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
