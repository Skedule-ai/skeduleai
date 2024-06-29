import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getOrganizationDetailsService } from '../services/organizationService';

// export const createOrganizationController = async (data: Prisma.organizationDetailsCreateInput) => {
//     try {
//         const organization = await createOrganizationService(data);
//         return organization;
//     } catch (error) {
//         console.error('Error creating organization:', error);
//         throw error;
//     }
// };

export async function handleOrganizationDetails(req: Request) {
    try {
        const user = await currentUser();
        console.log('Current User:', user);
        if (!user?.id) {
            throw new Error('User not authenticated');
        }

        const { typeOfOrganization, servicesOffered, aboutOrganization } = await req.json();
        const organizationDetails = await getOrganizationDetailsService({
            userId: user.id,
            typeOfOrganization,
            servicesOffered,
            aboutOrganization,
        });
        return NextResponse.json(organizationDetails);
    } catch (error: any) {
        console.error('Error in handleOrganizationDetails:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
