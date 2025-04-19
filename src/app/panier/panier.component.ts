import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/Panier.service';
import { LignePanierService } from 'src/app/services/LingePanier.service ';
import { LignePanier } from 'src/app/models/LignePanier';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  lignesPanier: LignePanier[] = [];
  panierId: number = 38;

  constructor(
    private panierService: PanierService,
    private lignePanierService: LignePanierService
  ) {}

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier(): void {
    this.panierService.getLignesByPanierId(this.panierId).subscribe({
      next: (data) => this.lignesPanier = data ?? [],
      error: (err) => console.error('Erreur lors du chargement du panier :', err)
    });
  }

  changerQuantite(ligne: LignePanier, delta: number): void {
    const nouvelleQuantite = ligne.quantite + delta;
  
    if (nouvelleQuantite > 0) {
      const updatedLigne = { ...ligne, quantite: nouvelleQuantite };
  
      if (ligne.id != null) {
        this.lignePanierService.updateLignePanier(ligne.id, updatedLigne).subscribe({
          next: () => {
            // 🔄 Met à jour la ligne directement dans le tableau sans recharger
            const index = this.lignesPanier.findIndex(l => l.id === ligne.id);
            if (index !== -1) {
              this.lignesPanier[index].quantite = nouvelleQuantite;
            }
          },
          error: (err) => {
            console.error("Erreur lors de la mise à jour :", err);
          }
        });
      } else {
        console.warn("Ligne sans ID, impossible de mettre à jour");
      }
  
    } else if (nouvelleQuantite === 0) {
      // Si la quantité devient 0, on supprime
      if (ligne.id != null) {
        this.supprimerLigne(ligne.id);
      } else {
        console.warn("Impossible de supprimer : ID de la ligne introuvable.");
      }
    }
  }
  

  supprimerLigne(id: number): void {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer ce produit du panier ?")) {
      this.lignePanierService.deleteLignePanier(id).subscribe({
        next: () => {
          this.lignesPanier = this.lignesPanier.filter(l => l.id !== id);
        },
        error: (err) => console.error("Erreur lors de la suppression :", err)
      });
    }
  }

  getTotal(): number {
    if (!Array.isArray(this.lignesPanier)) {
      return 0;
    }
    return this.lignesPanier.reduce((total, ligne) => {
      const prix = ligne?.produit?.productPrice ?? 0;
      const quantite = ligne?.quantite ?? 0;
      return total + prix * quantite;
    }, 0);
  }
}
