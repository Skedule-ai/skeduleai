export interface CreateAvailabilityConfigurationDTO{
  userId: String;   
  organizationId: String;  
  timezone: string;
  startTime: DateTime; 
  endTime: DateTime;
  duration: Date;
  workingDay: number;
  createdAt: Date; 
  updatedAt: Date; 
}


