import { currentUser } from '@clerk/nextjs/server';

import {
    findUserConfigurationByUserId,
    updateUserConfiguration,
} from '@/backend/repositories/userConfigurationRepository';
import { ErrorMessages } from '@/libs/message/error';

import * as yup from 'yup';
import { Prisma } from '@prisma/client';

const updateUserConfigurationInput = yup.object({
    onBoardingModal: yup.boolean().default(false),
});

export async function findUserConfgurationByUserIdService() {
    const user = await currentUser();
    if (!user?.id) {
        throw new Error(ErrorMessages.UNAUTHORIZED);
    }

    const userConfiguration = await findUserConfigurationByUserId({ userId: user?.id });
    return { onBoardingModal: !!userConfiguration?.onBoardingModal };
}

export type UpdateUserConfigurationDataInput = Pick<
    Prisma.userConfigurationCreateInput,
    'onBoardingModal'
>;

export async function updateUserConfigurationService(data: UpdateUserConfigurationDataInput) {
    const user = await currentUser();
    if (!user?.id) {
        throw new Error(ErrorMessages.UNAUTHORIZED);
    }

    const isInputValid = await updateUserConfigurationInput.isValid(data);
    if (!isInputValid) {
        throw new Error(ErrorMessages.UNAUTHORIZED);
    }
    const userConfiguration = await updateUserConfiguration(user?.id, data);
    return { onBoardingModal: !!userConfiguration?.onBoardingModal };
}
