import { clerkClient } from '@clerk/nextjs/server';

export const createOrganization = async(userId:string,organizationName:string) =>{   
    const response = await clerkClient.organizations.createOrganization({ name:organizationName, createdBy:userId });  
    return response;  
}


