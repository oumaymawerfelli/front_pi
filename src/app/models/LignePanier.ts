import { Product } from "./Product";
import { Panier } from "./Panier";
export class LignePanier {
    id?: number;
    produit!: Product;
    panier?: any;  // L'objet Panier est également requis
    quantite!: number;
    prixTotal!: number;
  }
  