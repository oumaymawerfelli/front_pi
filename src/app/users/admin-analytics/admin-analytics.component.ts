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
  usersMap = new Map<number, string>();

  loginHoursData: number[] = new Array(24).fill(0);
  suspiciousCount = 0;

  labels: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  chartData: ChartData<'line'> = {
    labels: this.labels,
    datasets: [
      { data: this.loginHoursData, label: 'Login Attempts by Hour' }
    ]
  };

  options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#f5f5f5',
        titleColor: '#333',
        bodyColor: '#666',
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: '#eee',
        }
      },
      y: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: '#eee',
        }
      }
    },
    elements: {
      line: {
        tension: 0.4, // smooth curves
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.2)',
        borderWidth: 2
      },
      point: {
        radius: 4,
        backgroundColor: '#42A5F5'
      }
    }
  };

  chartType: ChartType = 'line';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAnalytics();  
  }

  loadAnalytics(): void {
    this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        if (user.idUser !== undefined) {
          this.usersMap.set(user.idUser, user.name);
        }
      });
  
      this.userService.getLoginAnalytics().subscribe(attempts => {
        this.loginAttempts = attempts;
        this.processAnalytics();
      });
    });
  }
  

  getUsername(userId: number): string {
    return this.usersMap.get(userId) || 'Unknown User';
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

    this.chartData = {
      labels: this.labels,
      datasets: [
        { data: [...this.loginHoursData], label: 'Login Attempts by Hour' }
      ]
    };
  }
}
