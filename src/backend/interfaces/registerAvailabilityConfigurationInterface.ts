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
}