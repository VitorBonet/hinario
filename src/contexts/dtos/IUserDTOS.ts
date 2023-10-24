export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string; 
  dioceseId: string;
  parishId: string;
  permissions: string[];
  roles: string[];
}