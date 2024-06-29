import { clerkClient } from '@clerk/nextjs/server';
import {
    createOrganizationRepository,
    getOrganizationDetailsFromClerk,
} from '../repositories/organizationRepository';

export const createOrganization = async (userId: string, organizationName: string) => {
    const response = await clerkClient.organizations.createOrganization({
        name: organizationName,
        createdBy: userId,
    });
    return response;
};
// export const createOrganizationService = async (data: Prisma.organizationDetailsCreateInput) => {
//     try {
//         const organization = await createOrganizationRepository(data);
//         const response = await clerkClient.organizations.getOrganizationList();
//         // const clerkOrganizations = response.data;

//         const organizationNames = response.data.map((org) => org.name);

//         return { organization, clerkOrganizations: organizationNames };
//     } catch (error) {
//         console.error('Error creating organization:', error);
//         throw error;
//     }
// };
interface organizationDetailsInput {
    userId: string;
    typeOfOrganization: string;
    servicesOffered: string;
    aboutOrganization: string;
}

export async function getOrganizationDetailsService({
    userId,
    typeOfOrganization,
    servicesOffered,
    aboutOrganization,
}: organizationDetailsInput) {
    const { organizationId, name, imageUrl } = await getOrganizationDetailsFromClerk(userId);

    const organizationDetails = await createOrganizationRepository({
        organizationId,
        typeOfOrganization,
        servicesOffered,
        aboutOrganization,
    });

    return {
        organizationId: organizationDetails.organizationId,
        name,
        imageUrl,
        typeOfOrganization: organizationDetails.typeOfOrganization,
        servicesOffered: organizationDetails.servicesOffered,
        aboutOrganization: organizationDetails.aboutOrganization,
        createdAt: organizationDetails.createdAt,
        updatedAt: organizationDetails.updatedAt,
    };
}
