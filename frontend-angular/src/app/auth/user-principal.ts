import { User } from './user';

export interface UserPrincipal {
  clientPrincipal: User | null;
}
