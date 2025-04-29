import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/core/services/Panier.service';
import { LignePanierService } from 'src/app/core/services/LingePanier.service ';
import { LignePanier } from 'src/app/core/models/LignePanier';
import { AuthService } from 'src/app/core/services/auth.service';
import { Order } from '../core/models/Order';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  lignesPanier: LignePanier[] = [];
  panierId: number | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  order: Order = {
    status: 'EN_ATTENTE',
    dateCommande: new Date(),
    paymentMethod: undefined
  };
  paymentMethod: string = ''; // <-- AJOUT : Champ pour la méthode de paiement
  commandeValidee: Order | null = null; // <-- AJOUT : Pour stocker la commande après validation

  constructor(
    private panierService: PanierService,
    private lignePanierService: LignePanierService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier(): void {
    const utilisateurId = this.authService.getUserInfo()?.userId;
    if (utilisateurId) {
      this.isLoading = true;
      this.panierService.getOrCreateUserPanier().subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data && data.id) {
            this.panierId = data.id;
            this.loadPanierLines();
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erreur lors de la récupération/création du panier :', err);
          this.errorMessage = 'Erreur lors du chargement du panier';
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  allerVersOrders(): void {
    this.router.navigate(['/home/orders']);
  }
  retournerVersMarketplace(): void {
    this.router.navigate(['/home/market']);
  }

  loadPanierLines(): void {
    if (this.panierId) {
      this.isLoading = true;
      this.panierService.getLignesByPanierId(this.panierId).subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data && data.length > 0) {
            this.lignesPanier = data;
          } else {
            console.warn('Aucune ligne dans le panier');
            this.errorMessage = 'Votre panier est vide';
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erreur lors du chargement des lignes du panier :', err);  
          this.errorMessage = 'Erreur lors du chargement des lignes du panier';
        }
      });
    } else {
      console.warn('PanierId est invalide');
      this.errorMessage = 'Panier invalide';
    }
  }

  changerQuantite(ligne: LignePanier, delta: number): void {
    const nouvelleQuantite = ligne.quantite + delta;

    if (nouvelleQuantite > 0) {
      const updatedLigne = { ...ligne, quantite: nouvelleQuantite };

      if (ligne.id != null) {
        this.isLoading = true;
        this.lignePanierService.updateLignePanier(ligne.id, updatedLigne).subscribe({
          next: () => {
            this.isLoading = false;
            const index = this.lignesPanier.findIndex(l => l.id === ligne.id);
            if (index !== -1) {
              this.lignesPanier[index].quantite = nouvelleQuantite;
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Erreur lors de la mise à jour de la ligne :', err);
            this.errorMessage = 'Erreur lors de la mise à jour de la ligne';
          }
        });
      } else {
        console.warn('Ligne sans ID, mise à jour impossible');
        this.errorMessage = 'Ligne sans ID, mise à jour impossible';
      }
    } else if (nouvelleQuantite === 0) {
      if (ligne.id != null) {
        this.supprimerLigne(ligne.id);
      } else {
        console.warn('Impossible de supprimer : ID de la ligne introuvable.');
        this.errorMessage = 'Impossible de supprimer cette ligne';
      }
    }
  }

  supprimerLigne(id: number): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer ce produit du panier ?')) {
      this.isLoading = true;
      this.lignePanierService.deleteLignePanier(id).subscribe({
        next: () => {
          this.isLoading = false;
          this.lignesPanier = this.lignesPanier.filter(l => l.id !== id);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erreur lors de la suppression de la ligne :', err);
          this.errorMessage = 'Erreur lors de la suppression de la ligne';
        }
      });
    }
  }

  getTotal(): number {
    return this.lignesPanier.reduce((total, ligne) => {
      const prix = ligne?.produit?.productPrice ?? 0;
      const quantite = ligne?.quantite ?? 0;
      return total + prix * quantite;
    }, 0);
  }

  // --> Validation du panier avec méthode de paiement
  validerPanier(panierId: number | null): void {
    if (!panierId) {
      console.error('Panier ID est invalide');
      return;
    }

    if (!this.paymentMethod) {
      alert('Veuillez sélectionner une méthode de paiement avant de valider.');
      return;
    }

    const order: Order = {
      status: 'EN_ATTENTE',
      dateCommande: new Date(),
      // <-- Ajout du paymentMethod
      paymentMethod: this.paymentMethod // <-- Correction : Ajout de la propriété manquante
    };

    this.panierService.validerPanier(panierId, order).subscribe(
      (savedOrder) => {
        console.log('Commande validée avec succès :', savedOrder);
        this.commandeValidee = savedOrder; // <-- Stocker la commande validée
        this.lignesPanier = []; // vider le panier après validation
      },
      (error) => {
        console.error('Erreur lors de la validation du panier :', error);
      }
    );
  }
}
