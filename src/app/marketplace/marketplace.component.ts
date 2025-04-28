import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product'; 
import { ProductService } from 'src/app/core/services/Product.service';
import { LignePanierService } from 'src/app/core/services/LingePanier.service ';
import { LignePanier } from 'src/app/core/models/LignePanier'; 
import { Router } from '@angular/router';
import { PanierService } from 'src/app/core/services/Panier.service'; // Importer le service Panier

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  chatbotVisible = false;
  produits: Product[] = [];
  quantities: { [key: number]: number } = {};  // Dictionnaire pour stocker les quantités de chaque produit
  panierId: number | null = null;  // ID du panier de l'utilisateur connecté

  constructor(
    private productService: ProductService,
    private lignePanierService: LignePanierService,
    private panierService: PanierService,  // Injection du service Panier
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer tous les produits
    this.productService.getAll().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits:', err);
      }
    });

    // Charger le panier de l'utilisateur connecté ou en créer un si nécessaire
    this.panierService.getOrCreateUserPanier().subscribe({
      next: (data) => {
        if (data && data.id) {
          this.panierId = data.id;  // Assigner l'ID du panier
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du panier de l\'utilisateur:', err);
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

    if (this.panierId) {  // Vérifier si le panierId est disponible
      // Ajouter la ligne au panier de l'utilisateur
      this.lignePanierService.addLigneToPanier(this.panierId, ligne).subscribe({
        next: () => {
          alert('Produit ajouté au panier.');
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout au panier:', err);
          alert('Une erreur est survenue.');
        }
      });
    } else {
      alert('Aucun panier trouvé. Veuillez vous connecter ou créer un panier.');
    }
  }

  // Redirige vers le panier
  goToPanier() {
    this.router.navigate(['/home/panier']);
  }
}
