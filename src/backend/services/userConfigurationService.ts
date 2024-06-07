import { currentUser } from '@clerk/nextjs/server';

import {
    createUserConfigurationRepository,
    findUserConfigurationRepository,
} from '@/backend/repositories/userConfigurationRepository';
import { CreateUserConfigurationDTO } from '../interfaces/createUserConfigurationInterface';

export async function createUserConfigurationService(data: CreateUserConfigurationDTO) {
    const userConfiguration = await createUserConfigurationRepository(data);
    return { userConfiguration };
}

export async function findUserConfigurationService() {
    const user = await currentUser();
    if (user?.id) {
        const userConfiguration = await findUserConfigurationRepository({ userId: user?.id });
        return { userConfiguration };
    }
}

export async function updateUserConfigurationService(data: CreateUserConfigurationDTO) {
    const userConfiguration = await createUserConfigurationRepository(data);
    return { userConfiguration };
}
