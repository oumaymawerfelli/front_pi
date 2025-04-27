import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { LoginAttempt } from 'src/app/core/models/LoginAttempt.model';
import { forkJoin } from 'rxjs';

const CHART_COLORS = {
  border: '#42A5F5',
  background: 'rgba(66,165,245,0.2)',
  point: '#42A5F5',
  grid: '#eee',
  ticks: '#666',
  tooltipBg: '#f5f5f5',
  tooltipTitle: '#333',
  tooltipBody: '#666',
};

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {
  loginAttempts: LoginAttempt[] = [];
  usersMap = new Map<number, string>();
  loginHoursData = new Array(24).fill(0);
  suspiciousCount = 0;
  loading = true;

  readonly labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  readonly chartType: ChartType = 'line';
  
  chartData: ChartData<'line'> = {
    labels: this.labels,
    datasets: [{
      data: this.loginHoursData,
      label: 'Login Attempts by Hour',
      tension: 0.4,
      borderColor: CHART_COLORS.border,
      backgroundColor: CHART_COLORS.background,
      borderWidth: 2,
      pointBackgroundColor: CHART_COLORS.point,
      pointRadius: 4
    }]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: { size: 14 }
        }
      },
      tooltip: {
        backgroundColor: CHART_COLORS.tooltipBg,
        titleColor: CHART_COLORS.tooltipTitle,
        bodyColor: CHART_COLORS.tooltipBody,
        callbacks: {
          label: (ctx) => `Attempts: ${ctx.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: CHART_COLORS.ticks },
        grid: { color: CHART_COLORS.grid }
      },
      y: {
        ticks: { color: CHART_COLORS.ticks },
        grid: { color: CHART_COLORS.grid }
      }
    }
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    forkJoin({
      users: this.userService.getUsers(),
      attempts: this.userService.getLoginAnalytics()
    }).subscribe(({ users, attempts }) => {
      users.forEach(user => {
        if (user.idUser !== undefined) {
          this.usersMap.set(user.idUser, user.name);
        }
      });

      this.loginAttempts = attempts;
      this.processAnalytics();
      this.loading = false;
    });
  }

  getUsername(userId: number): string {
    return this.usersMap.get(userId) ?? 'Unknown User';
  }

  processAnalytics(): void {
    this.loginHoursData.fill(0);
    this.suspiciousCount = 0;

    this.loginAttempts.forEach(({ loginHour, suspicious }) => {
      if (loginHour >= 0 && loginHour <= 23) {
        this.loginHoursData[loginHour]++;
      }
      if (suspicious) {
        this.suspiciousCount++;
      }
    });

    this.chartData.datasets[0].data = [...this.loginHoursData];
  }

  formatTimestamp(timestamp: string): string {
    if (!timestamp) return '';
  
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
}
