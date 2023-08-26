
import { User } from '../users/user.interface';

export interface UserAuthResponse {
  token: string;
  user: User;
}