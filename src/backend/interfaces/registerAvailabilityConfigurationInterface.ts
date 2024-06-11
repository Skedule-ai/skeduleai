export interface CreateAvailabilityConfigurationDTO{
  userId: String;   
  organizationId: String;  
  timezone: String;
  startTime: String; 
  endTime: String;
  duration: Date;
  workingDay: number;
  createdAt: Date; 
  updatedAt: Date; 
}


