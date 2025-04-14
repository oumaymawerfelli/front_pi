import { Product } from "./Product";
import { Panier } from "./Panier";
export class LignePanier {
    id?: number;
    produit!: Product; // On peut aussi envoyer un objet Product si nécessaire
    panier?: any;  // L'objet Panier est également requis
    quantite!: number;
    prixTotal!: number;
  }
  