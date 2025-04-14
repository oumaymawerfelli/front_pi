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
  
  produits: Product[] = [];

  constructor(
    private productService: ProductService,
    private lignePanierService: LignePanierService, // Injection du service LignePanierService
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.produits = data; // Récupération des produits et affectation à la variable
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits:', err);
      }
    });
  }

  addToCart(produit: Product) {
    const quantiteStr = prompt('Entrez la quantité :');
    const quantite = Number(quantiteStr);
  
    if (!quantite || quantite <= 0 || isNaN(quantite)) {
      alert('Quantité invalide.');
      return;
    }
  
    const prixTotal = produit.productPrice * quantite;
  
    const ligne: LignePanier = { 
      produit: produit,
      quantite: quantite,
      prixTotal: prixTotal,
      panier: null ,
    };
  
    const panierId = 38;
  
    this.lignePanierService.addLigneToPanier(panierId, ligne).subscribe({
      next: () => alert('Produit ajouté au panier.'),
      error: (err) => {
        console.error('Erreur lors de l’ajout au panier:', err);
        alert('Une erreur est survenue.');
      }
    });
  }
  goToPanier() {
    this.router.navigate(['/panier']); // Redirige vers le composant panier
  }
}
