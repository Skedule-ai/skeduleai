export interface CreateOrganizationConfigurationDTO {
    userId: string;
    organizationId: string;
    timezone: string;
    workingHour: number;
    workingMinute: number;
    availableSlots: number;
    workingDays: number;
    createdAt: Date;
    updatedAt: Date;
}
