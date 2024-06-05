// src/repositories/userRepository.ts
import { prisma } from '@/backend/utils/db';
import { CreateOrganizationDTO } from '@/backend/interfaces/organizationInterface';

export async function createOrganizationRepository(data: CreateOrganizationDTO) {
    return await prisma.workspace.create({ data });
}
