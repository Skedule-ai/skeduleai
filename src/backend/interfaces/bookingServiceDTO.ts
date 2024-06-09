export interface BookingServiceDTO {
    id: string;
    userId: string;
    organizationId: string;
    // bookingDetails: BookingDetails[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookingDetailsDTO {
    id: string;
    customerId: string;
    serviceId: string;
    date: string | Date;
    duration: string | Date;
    status: number;
    createdAt?: Date;
    updatedAt?: Date;
}
