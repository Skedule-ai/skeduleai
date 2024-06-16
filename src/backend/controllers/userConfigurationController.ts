import {
    updateUserConfigurationService,
    findUserConfgurationByUserIdService,
    UpdateUserConfigurationDataInput,
} from '@/backend/services/userConfigurationService';

export async function findUserConfigurationByUserIdController() {
    const userConfiguration = await findUserConfgurationByUserIdService();
    return { userConfiguration };
}

export async function createUserConfigurationController(data: UpdateUserConfigurationDataInput) {
    const userConfiguration = await updateUserConfigurationService(data);
    return { userConfiguration };
}
