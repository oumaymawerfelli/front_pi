import { User } from './user.model';
import { LignePanier } from './LignePanier'; // Assurez-vous que le modèle `LignePanier` existe

export class Panier {
  id!: number;  
  utilisateur!: User; 
  lignePanier!: LignePanier[];  
}
