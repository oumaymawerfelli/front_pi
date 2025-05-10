// src/app/components/investment-list/investment-list.component.ts

import { Component, OnInit } from '@angular/core';
import { InvestmentService } from 'src/app/core/services/investment.service';
import { Investment } from 'src/app/core/models/investor';
import { UserService } from  'src/app/core/services/user.service';


@Component({
  selector: 'app-investment-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.css']
})
export class InvestorListComponent implements OnInit {

  investments: Investment[] = [];
  searchTerm: string = '';
  filteredInvestments: Investment[] = [];
  userNames: Map<number, string> = new Map();
  selectedInvestment: Investment | null = null; 

  constructor(private investmentService: InvestmentService,private userService: UserService) { }

  ngOnInit(): void {
    this.loadInvestments();
  }

  // Charger les investissements
  loadInvestments(): void {
    this.investmentService.getAllInvestments().subscribe((data) => {
      this.investments = data;
      this.filteredInvestments = data;

      // Charger les noms des utilisateurs pour chaque investissement
      this.investments.forEach(investment => {
        this.userService.getUser(investment.userId).subscribe(user => {
          this.userNames.set(investment.userId, user.name); // Stocke le nom de l'utilisateur par son ID
        });
      });
    });
  }
  selectInvestmentForUpdate(investment: Investment): void {
    this.selectedInvestment = { ...investment }; // Crée une copie de l'investissement sélectionné
  }
  updateInvestment(): void {
    if (this.selectedInvestment) {
      // Assurez-vous que l'ID est présent
      if (!this.selectedInvestment.id) {
        console.error('ID manquant pour la mise à jour de l\'investissement.');
        return;
      }
  
      // Appelez la méthode de mise à jour du service
      this.investmentService.updateInvestment(this.selectedInvestment.id, this.selectedInvestment).subscribe({
        next: (updated) => {
          console.log('Investissement mis à jour avec succès:', updated);
          this.loadInvestments(); // Recharger la liste des investissements après mise à jour
          this.selectedInvestment = null; // Réinitialiser la sélection
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
        }
      });
    } else {
      console.error('Aucun investissement sélectionné pour la mise à jour.');
    }
  }
  

  // Filtrer les investissements en fonction du terme de recherche
  filterInvestments(): void {
    this.filteredInvestments = this.investments.filter((investment) =>
      // Vérifie si le nom de l'investisseur (dans userNames) contient le terme de recherche
      (this.userNames.get(investment.userId)?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
  deleteInvestment(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet investissement ?')) {
      this.investmentService.deleteInvestment(id).subscribe({
        next: () => {
          // Après suppression, on recharge les investissements
          this.loadInvestments();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
        }
      });
    }

  }
 
  
 

 searchById(): void {
    const id = Number(this.searchTerm);
    console.log('Recherche de l\'investissement avec l\'ID:', id);  // Ajout des logs pour vérifier l'ID

    if (!isNaN(id)) {
      this.investmentService.getInvestmentById(id).subscribe(
        (investment) => {
          console.log('Réponse de la recherche:', investment);  // Affiche la réponse de l'API
          this.filteredInvestments = investment ? [investment] : [];
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.filteredInvestments = [];
        }
      );
    } else {
      console.error('Veuillez entrer un ID valide');
      this.filteredInvestments = [];
    }
  }


}
