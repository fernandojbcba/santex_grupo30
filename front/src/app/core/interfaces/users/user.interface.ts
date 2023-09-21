
export interface User {
    id: number;
    username: string;
    updatedAt: Date;
    createdAt: Date;
  }
export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roleName: string;
  }
  export interface UserWithApprovalStatus {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
    };
    approvalStatusId: number;
  }
  
  
  export const MIN_USERNAME_LENGTH: number = 5;
  export const MAX_USERNAME_LENGTH: number = 60;
  export const MIN_PASSWORD_LENGTH: number = 5;
  export const MAX_PASSWORD_LENGTH: number = 60;
  export const PASSWORD_PATTERN: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?.,])[A-Za-z\\d#$@!%&*?.,]{5,250}$';