export type CreateUserConfigurationArgs = {
    onBoardingModal?: boolean;
};

export type CreateAppointmentArgs = {
    serviceId: string;
    name: string;
    email: string;
    phoneNumber: string;
    date: string;
    time: string;
};


export type BookingDetailsArgs = {
    id: string;
    userId: string;
    organisationId: string;
    timezone: string;
    workingHour: number;
    workingMinute: number;
    availableSlots: number[];
    workingDays: string[];
    createdAt: string;
    updatedAt: string;
    BookingDetails: Array<{
        id: string;
        customerId: string;
        Service: object;
        serviceId: string;
        date: string;
        time: string;
        status: string;
        duration: number;
        createdAt: string;
        updatedAt: string;
    }>;
};