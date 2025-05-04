import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan-approval',
  templateUrl: './loan-approval.component.html',
})
export class LoanApprovalComponent implements OnInit {
  requestId!: number;
  token!: string;
  message = '';
  actionDone = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.requestId = +params['requestId'];
      this.token = params['token'];
    });
  }

  approve(): void {
    this.http.post(`http://localhost:8089/pi/api/loan/approve?requestId=${this.requestId}&token=${this.token}`, null, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.actionDone = true;
        },
        error: () => {
          this.message = 'Approval failed.';
          this.actionDone = true;
        }
      });
  }

  reject(): void {
    this.http.post(`http://localhost:8089/pi/api/loan/reject?requestId=${this.requestId}&token=${this.token}`, null, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.message = res;
          this.actionDone = true;
        },
        error: () => {
          this.message = 'Rejection failed.';
          this.actionDone = true;
        }
      });
  }
}
