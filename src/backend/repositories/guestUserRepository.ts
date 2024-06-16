import { prisma } from '@/backend/utils/db';
import { Prisma } from '@prisma/client';

export async function createGuestUserRepository(
    data: Pick<Prisma.guestUserCreateInput, 'name' | 'email' | 'phoneNumber'>,
) {
    return await prisma.guestUser.create({ data });
}
