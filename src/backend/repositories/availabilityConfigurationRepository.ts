import { prisma } from '@/backend/utils/db';
import { ErrorMessages } from '@/libs/message/error';
import { getTodaysDay } from '@/libs/utils/datetime-helpers';
import { DaysEnum } from '@/libs/utils/enums';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



export async function addAvailabilityConfigurationRepository(
    data: Prisma.availabilityConfigurationCreateInput[],
) {
    try {
        return await prisma.availabilityConfiguration.createMany({ data });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            throw new Error(ErrorMessages.AVAILABILITY_CONFIG_CREATE_ERROR);
        } else {
            console.log('addAvailabilityConfigurationRepository: ', err);
            throw new Error('Failed to add availabilty configuration.');
        }
    }
}

export async function findAvailabilityConfigurationRepository(
    userId: string,
    organizationId = '',
    day: DaysEnum = getTodaysDay(),
) {
    return await prisma.availabilityConfiguration.findFirst({
        where: {
            userId,
            organizationId,
            day,
        },
    });
}

export async function findAllAvailabilityConfigurationRepository(
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


