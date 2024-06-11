export interface GuestUserDTO {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    phoneNumberVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
