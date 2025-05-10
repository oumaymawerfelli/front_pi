import { Component } from '@angular/core';
import { Investment } from 'src/app/core/models/investor';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/core/services/investment.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent {
  investment: Investment = {
    id: 0,
    type: '',
    investmentAmount: 0,
    expectedROI: 0,
    strategy: '',
    investmentDate: new Date().toISOString().substring(0, 10), // format 'YYYY-MM-DD'
    performance: 0,
    userId: 0, // tu vas remplir userId via formulaire ou fixe
    userName: '' // pas obligatoire d'envoyer userName
  };

  submissionStatus: string | null = null;
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private investmentService: InvestmentService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home/login']);
    }
  }

  submitInvestment(): void {
    if (this.investment.investmentAmount <= 0) {
      alert('Le montant doit être supérieur à 0.');
      return;
    }
  
    this.isSubmitting = true;
  
    this.investmentService.addInvestment(this.investment).subscribe({
      next: (savedInvestment) => {
        console.log('Investment ajouté:', savedInvestment);
  
        // Utiliser ta fonction updateInvestmentPerformance
        this.investmentService.updateInvestmentPerformance(savedInvestment.id).subscribe({
          next: (updatedInvestment) => {
            console.log('Performance mise à jour:', updatedInvestment);
            this.investment = updatedInvestment; // Optionnel : pour rafraîchir l'objet affiché
            this.submissionStatus = 'Investissement soumis et performance mise à jour avec succès !';
            this.isSubmitting = false;
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour de la performance:', err);
            this.submissionStatus = 'Investissement soumis, mais erreur lors de la mise à jour de la performance.';
            this.isSubmitting = false;
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la soumission:', err);
        this.submissionStatus = 'Erreur lors de la soumission.';
        this.isSubmitting = false;
      }
    });
  }
  
}
