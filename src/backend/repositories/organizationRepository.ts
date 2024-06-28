import { prisma } from '@/backend/utils/db';
import { ErrorMessages } from '@/libs/message/error';
import { clerkClient } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function createOrganizationRepository(data: Prisma.organizationDetailsCreateInput) {
    try {
        const { organizationId, ...rest } = data;

        // Check if organization with this ID already exists
        const existingOrganization = await prisma.organizationDetails.findUnique({
            where: { organizationId },
        });

        if (existingOrganization) {
            // If exists, update the existing record
            return await prisma.organizationDetails.update({
                where: { organizationId },
                data: { ...rest }, // Update other fields as needed
            });
        } else {
            // If doesn't exist, create a new record
            return await prisma.organizationDetails.create({ data });
        }
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            console.error('PrismaClientKnownRequestError:', err.message, err.meta);
            throw new Error(ErrorMessages.ORGANIZATION_CREATE_ERROR);
        } else {
            console.error('createOrganizationRepository:', err);
            throw new Error('Failed to create organization.');
        }
    }
}

export async function getOrganizationDetailsFromClerk(userId: string) {
    const membershipsResponse = await clerkClient.users.getOrganizationMembershipList({ userId });
    const memberships = membershipsResponse.data;

    // Assuming we are interested in the first organization the user is a member of
    if (!memberships || memberships.length === 0) {
        throw new Error('User is not a member of any organization');
    }

    // Retrieve details of the first organization (you may adjust this logic based on your requirements)
    const organizationId = memberships[0].organization.id;
    const organization = await clerkClient.organizations.getOrganization({ organizationId });

    // Extract necessary details
    const { id, name, imageUrl } = organization;

    return { organizationId: id, name, imageUrl };

    // const user = await clerkClient.users.getUser(userId);
    // console.log('user id repo', user);
    // // const organizationId = user.publicMetadata?.OrganizationId;

    //  if (!organizationId || typeof organizationId !== 'string') {
    //     throw new Error('User does not have a organization set');
    //  }
    // const organization = await clerkClient.organizations.getOrganization({ organizationId });
    // const { name, imageUrl } = organization;
    // return { organizationId, name, imageUrl };
}
