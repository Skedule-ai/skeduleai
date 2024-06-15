import { currentUser } from '@clerk/nextjs/server';

import {
    registerAvailabilityConfigurationRepository,
    findAvailabilityConfigurationRepository,
} from '@/backend/repositories/availabilityConfigurationRepository';
import { CreateAvailabilityConfigurationDTO } from '../interfaces/registerAvailabilityConfigurationInterface';
import { error } from 'console';

export async function registerAvailabilityConfigurationService(
    data: CreateAvailabilityConfigurationDTO,
) {
    try {
        const user = await currentUser();
        if (!user?.id){
            throw new Error("Unauthorized")
        }
        const availabilityConfiguration = await registerAvailabilityConfigurationRepository({...data,userId:user?.id});
        return { availabilityConfiguration };
    } catch (error) {
        console.error('Error registering availability configuration:', error);
        throw new Error('Failed to register availability configuration');
    }
}

export async function findAvailabilityConfigurationService() {
    try {
        const user = await currentUser();
        console.log(user)
        if (user?.id) {
            const availabilityConfiguration = await findAvailabilityConfigurationRepository({
                organizationId: user.id,
            });
            return { availabilityConfiguration };
        } else {
            throw new Error('User not found or missing ID');
        }
    } catch (error) {
        console.error('Error finding availability configuration:', error);
        throw error;
    }
}


export async function updateAvailabilityConfigurationService(
    data: CreateAvailabilityConfigurationDTO,
) {
    try {
    const availabilityConfiguration = await registerAvailabilityConfigurationRepository(data);
    return { availabilityConfiguration };
    } catch (error) {
        console.error('Error updating availability configuration:', error);
        throw new Error('Failed to update availability configuration');
    }
}
