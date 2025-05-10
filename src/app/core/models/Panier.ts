import { User } from './user.model';
import { LignePanier } from "./LignePanier";


export class Panier {
  id!: number;  
  utilisateur!: User; 
  lignePanier!: LignePanier[];  
}
