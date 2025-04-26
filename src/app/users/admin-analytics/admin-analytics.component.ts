import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { LoginAttempt } from 'src/app/core/models/LoginAttempt.model';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {
  loginAttempts: LoginAttempt[] = [];

  loginHoursData: number[] = new Array(24).fill(0);
  suspiciousCount = 0;

  labels: string[] = Array.from({length: 24}, (_, i) => `${i}:00`);

  chartData: ChartData<'line'> = {
    labels: this.labels,
    datasets: [
      { data: this.loginHoursData, label: 'Login Attempts by Hour' }
    ]
  };

  options: ChartOptions = {
    responsive: true,
  };
  chartType: ChartType = 'line';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getLoginAnalytics().subscribe((attempts) => {
      this.loginAttempts = attempts;
      this.processAnalytics();
    });
  }

  processAnalytics(): void {
    this.loginHoursData.fill(0);
    this.suspiciousCount = 0;

    for (let attempt of this.loginAttempts) {
      if (attempt.loginHour >= 0 && attempt.loginHour <= 23) {
        this.loginHoursData[attempt.loginHour]++;
      }
      if (attempt.suspicious) {
        this.suspiciousCount++;
      }
    }

    // Update chart data after processing
    this.chartData = {
      labels: this.labels,
      datasets: [
        { data: [...this.loginHoursData], label: 'Login Attempts by Hour' }
      ]
    };
  }
}
