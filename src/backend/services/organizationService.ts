// src/services/userService.ts
import { createOrganizationRepository } from '@/backend/repositories/organizationRepository';
import { CreateOrganizationDTO } from '@/backend/interfaces/organizationInterface';

export async function createOrganizationrService(data: CreateOrganizationDTO) {
    const user = await createOrganizationRepository(data);
    return user;
}
