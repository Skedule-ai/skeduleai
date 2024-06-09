export interface BookingServiceDTO {
    id: string;
    userId: string;
    organizationId: string;
    // bookingDetails: BookingDetails[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookingDetails {
    id: string;
    customerId: string;
    service: BookingServiceDTO;
    serviceId: string;
    date: Date;
    status: number;
    duration: Date;
    createdAt: Date;
    updatedAt: Date;
}
