import { Component, OnInit } from '@angular/core';
import { LoanRequestService, LoanRequestRecommendation } from '../loan-request.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
})
export class RecommendationsComponent implements OnInit {
  recommendations: LoanRequestRecommendation[] = [];

  constructor(private loanRequestService: LoanRequestService) {}

  ngOnInit(): void {
    this.loadRecommendations('equipment');
  }

  loadRecommendations(keyword: string): void {
    this.loanRequestService.getRecommendations(keyword).subscribe({
      next: (data) => {
        console.log('Recommendations:', data);
        this.recommendations = data;
      },
      error: (error) => {
        console.error('Error fetching recommendations', error);
      }
    });
  }
}
