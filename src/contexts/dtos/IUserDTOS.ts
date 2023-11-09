export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string; 
  dioceseId: string;
  parishId: string;
  isAdmin: boolean;
  permissions: string[];
  roles: string[];
}