import { Component, Input, OnInit  } from '@angular/core';
import { InvestmentHistoryService } from 'src/app/services/investment-history.service';
import { InvestmentHistory } from 'src/app/models/investment-history';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-investor-histo',
  templateUrl: './investor-histo.component.html',
  styleUrls: ['./investor-histo.component.css']
})
export class InvestorHistoComponent {
  @Input() investmentId!: number;
  histories: InvestmentHistory[] = [];

  constructor(
    private route: ActivatedRoute,
    private historyService: InvestmentHistoryService
  ) {}

  ngOnInit(): void {
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
