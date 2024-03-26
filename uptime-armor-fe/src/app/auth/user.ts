export interface User {
    employeeId: string;
    password: string;
  }

  export class UserPassUpdate{
    
    oldPassword: string;
    newPassword: string;
  }