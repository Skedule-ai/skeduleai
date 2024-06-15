import {
    updateUserConfigurationService,
    findUserConfgurationByUserIdService,
} from '@/backend/services/userConfigurationService';
import { UserConfigurationDTO } from '@/backend/interfaces/userConfigurationDTO';

export async function findUserConfigurationByUserIdController() {
    const userConfiguration = await findUserConfgurationByUserIdService();
    return { userConfiguration };
}

export async function createUserConfigurationController(data: UserConfigurationDTO) {
    const userConfiguration = await updateUserConfigurationService(data);
    return { userConfiguration };
}
