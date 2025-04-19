import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product'; 
import { ProductService } from 'src/app/services/product.service';
import { LignePanierService } from 'src/app/services/LingePanier.service ';
import { LignePanier } from 'src/app/models/LignePanier'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  chatbotVisible = false;
  produits: Product[] = [];
  quantities: { [key: number]: number } = {};  // Dictionnaire pour stocker les quantités de chaque produit

  constructor(
    private productService: ProductService,
    private lignePanierService: LignePanierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits:', err);
      }
    });
  }

  // Fonction pour ajouter un produit au panier
  addToCart(produit: Product) {
    const quantite = this.quantities[produit.productId];  // Récupérer la quantité pour ce produit
  
    if (!quantite || quantite <= 0 || isNaN(quantite)) {
      alert('Quantité invalide.');
      return;
    }
  
    const prixTotal = produit.productPrice * quantite;
  
    const ligne: LignePanier = {
      produit: produit,
      quantite: quantite,
      prixTotal: prixTotal,
      panier: null,
    };
  
    const panierId = 38;  // ID du panier, vous pouvez le changer dynamiquement
  
    this.lignePanierService.addLigneToPanier(panierId, ligne).subscribe({
      next: () => alert('Produit ajouté au panier.'),
      error: (err) => {
        console.error('Erreur lors de l’ajout au panier:', err);
        alert('Une erreur est survenue.');
      }
    });
  }

  // Redirige vers le panier
  goToPanier() {
    this.router.navigate(['/Panier']);
  }}
