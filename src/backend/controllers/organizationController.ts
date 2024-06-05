// src/controllers/userController.ts
import { createOrganizationrService } from '@/backend/services/organizationService';
import { CreateOrganizationDTO } from '@/backend/interfaces/organizationInterface';

export async function createOrganizationController(data: CreateOrganizationDTO) {
    return await createOrganizationrService(data);
}
