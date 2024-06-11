import { prisma } from '@/backend/utils/db';
import { GuestUserDTO } from '../interfaces/guestUserDTO';

export async function createGuestUserRepository(
    data: Pick<GuestUserDTO, 'name' | 'email' | 'phoneNumber'>,
) {
    return await prisma.guestUser.create({ data });
}
