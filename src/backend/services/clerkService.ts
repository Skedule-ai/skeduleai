import { getClerkClient as getClient } from '../utils/clerkClient';

export const getClerkImagePath = (imageUrl: string = '') => {
    const path = imageUrl.split('https://img.clerk.com').find((path, inx) => inx === 1) ?? '';
    return path;
};

export const getFormattedImagePath = (imageUrl: string = '') => {
    const path = getClerkImagePath(imageUrl);
    return imageUrl ? '/profile'.concat(path) : '';
};

export const getUser = async (id: string) => {
    const client = getClient();
    const user = await client.users.getUser(id);
    return user;
};

export const getUserOrganization = async (organizationId: string, userId: string) => {
    const client = getClient();
    const organizationMembers = await client.users.getOrganizationMembershipList({ userId });
    const organizationMembership = organizationMembers.data.find(
        (data) => data.id === organizationId,
    );
    if (!organizationMembership) {
        throw new Error('Invalid organization');
    }
    return organizationMembership.organization;
};
