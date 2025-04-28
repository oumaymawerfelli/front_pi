// src/app/models/Product.ts
export class Product {
    productId!: number;       // Remplace 'id' par 'productId'
    productName!: string;     // Remplace 'nom' par 'productName'
    productPrice!: number;    // Remplace 'prix' par 'productPrice'
    productStock!: number;    // Remplace 'quantite' par 'productStock'
    lignesPanier?: any[];     // Si tu veux utiliser 'lignesPanier', garde cette propriété
    productImage?: string;
  }
  