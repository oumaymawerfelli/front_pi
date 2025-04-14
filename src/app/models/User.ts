import { Role } from './Role';

export class User {
  idUser!: number;
  photodeprofile!: number; // Ou string si c'est une image encodée ou un lien
  name!: string;
  email!: string;
  password!: string;
  role!: Role;
  adresse!: string;
  phone!: string;
  cin!: number;
  service?: string;
  paymentInfo?: string;
  companyName?: string;
}
