import { prisma } from '@/backend/utils/db';
import { Prisma } from '@prisma/client';

export async function updateUserConfiguration(
    id: string,
    data: Pick<Prisma.userConfigurationCreateInput, 'onBoardingModal'>,
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

export async function findUserConfigurationByUserId(
    filter: Pick<Prisma.userConfigurationWhereInput, 'userId'>,
) {
    return await prisma.userConfiguration.findFirst({ where: filter });
}
