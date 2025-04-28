import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.css']
})
export class PendingUsersComponent implements OnInit {
  pendingUsers: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadPendingUsers();
  }

  loadPendingUsers() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.userService.getPendingUsers().subscribe({
      next: (data) => {
        this.pendingUsers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load pending users';
        this.isLoading = false;
        console.error('Error loading pending users:', err);
      }
    });
  }

  approve(userId: number): void {
    if (confirm('Are you sure you want to approve this user?')) {
      this.userService.approveUser(userId).subscribe({
        next: () => {
          alert('User approved and SMS sent!');
          this.loadPendingUsers(); 
        },
        error: (err) => {
          alert('Error approving user: ' + err.message);
        }
      });
    }
  }

logClick() {
  console.log('Button clicked!');
  
  console.log('Attempting to navigate to pending users...');
}
}