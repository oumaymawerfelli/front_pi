// src/app/components/investment-list/investment-list.component.ts

import { Component, OnInit } from '@angular/core';
import { InvestmentService } from 'src/app/services/investment.service';
import { Investment } from 'src/app/models/investor';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.css']
})
export class InvestorListComponent implements OnInit {

  investments: Investment[] = [];
  searchTerm: string = '';
  filteredInvestments: Investment[] = [];

  constructor(private investmentService: InvestmentService) { }

  ngOnInit(): void {
    this.loadInvestments();
  }

  // Charger les investissements
  loadInvestments(): void {
    this.investmentService.getAllInvestments().subscribe((data) => {
      this.investments = data;
      this.filteredInvestments = data;
    });
  }

  // Filtrer les investissements en fonction du terme de recherche
  filterInvestments(): void {
    this.filteredInvestments = this.investments.filter((investment) =>
      investment.userName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
