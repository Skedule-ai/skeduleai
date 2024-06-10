<<<<<<< HEAD:src/backend/interfaces/registerOrganizationConfigurationInterface.ts
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
=======
export interface CreateAvailabilityConfigurationDTO{
  userId: String;   
  organizationId: String;  
  timezone: String;
  workingHour: number; 
  workingMinute: number;
  availableSlots: number;
  workingDays: number;
  createdAt: Date; 
  updatedAt: Date; 
>>>>>>> dashboard:src/backend/interfaces/registerAvailabilityConfigurationInterface.ts
}
