import { User } from './User'; // Assurez-vous que le modèle `User` existe
import { LignePanier } from './LignePanier'; // Assurez-vous que le modèle `LignePanier` existe

export class Panier {
  id!: number;  
  utilisateur!: User; 
  lignePanier!: LignePanier[];  
}
