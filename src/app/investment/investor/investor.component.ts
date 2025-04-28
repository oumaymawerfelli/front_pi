import { Component } from '@angular/core';
import { Investment, Project, User } from 'src/app/models/investor';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent {
  searchTerm: string = '';

  investment: Investment = {
    id: 0,
    type: '',
    investmentAmount: 0,
    expectedROI: 0,
    strategy: '',
    investmentDate: new Date().toISOString(),
    userId: 1,
    userName: ''
  };

  allInvestments: Investment[] = []; // Liste complète
  investments: Investment[] = [];    // Liste affichée (filtrée)

  users: User[] = [
    { id: 1, name: 'chadi' },
    { id: 2, name: 'firas' },
    { id: 3, name: 'louai' }
  ];

  projects: Project[] = [
    { id: 1, name: 'Project A', description: 'Description of Project A' },
    { id: 2, name: 'Project B', description: 'Description of Project B' },
    { id: 3, name: 'Project C', description: 'Description of Project C' },
  ];

  selectedProjectId: number | null = null;
  submissionStatus: string | null = null;
  isSubmitting: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private investmentService: InvestmentService
  ) {}

  selectProject(projectId: number): void {
    this.selectedProjectId = projectId;
  }

  submitInvestment(): void {
    if (this.selectedProjectId) {
      if (this.investment.investmentAmount <= 0) {
        alert('Investment amount must be a positive number.');
        return;
      }

      this.isSubmitting = true;

      const user = this.users.find(u => u.id === this.investment.userId);
      this.investment.userName = user ? user.name : 'Unknown';

      this.investmentService.addInvestment(this.investment).subscribe({
        next: (savedInvestment) => {
          this.allInvestments.push(savedInvestment);
          this.filterInvestments();
          this.submissionStatus = 'Investment successfully submitted!';
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error submitting investment:', err);
          this.submissionStatus = 'Error submitting investment.';
          this.isSubmitting = false;
        }
      });
    }
  }

  filterInvestments(): void {
    this.investments = this.allInvestments.filter(investment =>
      investment.userName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
