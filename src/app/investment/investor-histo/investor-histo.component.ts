import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentHistoryService } from 'src/app/services/investment-history.service';
import { InvestmentHistory } from 'src/app/models/investment-history';

@Component({
  selector: 'app-investor-histo',
  templateUrl: './investor-histo.component.html',
  styleUrls: ['./investor-histo.component.css']
})
export class InvestorHistoComponent implements OnInit { // <-- Ajoute implements OnInit
  @Input() investmentId!: number;
  histories: InvestmentHistory[] = [];

  constructor(
    private route: ActivatedRoute,
    private historyService: InvestmentHistoryService
  ) {}

  ngOnInit(): void { // <-- Il faut implémenter OnInit
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); 
      if (idParam) {
        this.investmentId = +idParam;
        this.loadHistory();
      }
    });
  }

  loadHistory(): void {
    this.historyService.getHistoryByInvestmentId(this.investmentId).subscribe(data => {
      this.histories = data;
    });
  }
  
}
