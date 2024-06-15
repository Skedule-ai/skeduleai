import { prisma } from '@/backend/utils/db';
import { ErrorMessages } from '@/libs/message/error';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function addAvailabilityConfigurationRepository(
    data: Prisma.availabilityConfigurationCreateInput[],
) {
    try {
        return await prisma.availabilityConfiguration.createMany({ data });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError && ErrorMessages[err.code]) {
            throw new Error(ErrorMessages[err.code]);
        } else {
            console.log('addAvailabilityConfigurationRepository: ', err);
            throw new Error('Failed to add availabilty configuration.');
        }
    }
}

export async function findAvailabilityConfigurationRepository(
    userId: string,
    organizationId?: string,
) {
    return await prisma.availabilityConfiguration.findMany({
        where: {
            userId,
            organizationId,
        },
    });
}

export async function updateAvailabilityConfigurationRepository(
    filter: Prisma.availabilityConfigurationUserIdOrganizationIdDayCompoundUniqueInput,
    data: Prisma.availabilityConfigurationUpdateInput,
) {
    return await prisma.availabilityConfiguration.update({
        where: {
            userId_organizationId_day: filter,
        },
        data,
    });
}
