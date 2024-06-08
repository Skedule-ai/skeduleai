import {
    createUserConfigurationService,
    findUserConfigurationService,
    updateUserConfigurationService,
} from '@/backend/services/userConfigurationService';
import { CreateUserConfigurationDTO } from '@/backend/interfaces/createUserConfigurationInterface';

export async function createUserConfiguration(data: CreateUserConfigurationDTO) {
    return await createUserConfigurationService(data);
}

export async function findUserConfiguration() {
    return await findUserConfigurationService();
}

export async function updateUserConfiguration(data: CreateUserConfigurationDTO) {
    return await updateUserConfigurationService(data);
}



