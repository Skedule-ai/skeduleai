import { prisma } from '@/backend/utils/db';
import { UserConfigurationDTO } from '../interfaces/userConfigurationDTO';

export async function updateUserConfiguration(id: string, data: Partial<UserConfigurationDTO>) {
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

export async function findUserConfigurationByUserId(filter: Pick<UserConfigurationDTO, 'userId'>) {
    return await prisma.userConfiguration.findFirst({ where: filter });
}
