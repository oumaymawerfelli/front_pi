import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanierService } from 'src/app/services/Panier.service';
import { LignePanier } from 'src/app/models/LignePanier';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  lignesPanier: LignePanier[] = [];
  panierId: number = 38; 

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.getLignesByPanierId(this.panierId).subscribe({
      next: (data) => {
        this.lignesPanier = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du panier :', err);
      }
    });
  }
}
