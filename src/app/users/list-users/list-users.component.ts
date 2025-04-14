import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  showForm: boolean = false;
console: any;
  
  constructor(private userService: UserService , private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.showForm = true;
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(user => user.idUser !== id);
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

  handleFormSubmit(user: User): void {
    if (user.idUser) {
      this.userService.updateUser(user).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex(u => u.idUser === updatedUser.idUser);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      this.userService.addUser(user).subscribe(
        (newUser) => {
          this.users.push(newUser);
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    }
    this.selectedUser = null;
    this.showForm = false;
  }
  
  

  addNewUser(): void {
    this.selectedUser = null;
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.selectedUser = null;
  }
  approveUser(id: number): void {
    this.userService.approveUser(id).subscribe(
      () => {
        this.loadUsers(); // refresh the list
        alert('User approved and SMS sent');
      },
      (error) => {
        console.error('Error approving user', error);
      }
    );
  }
  // Add this method
logClick() {
  console.log('Button clicked!');
  // Add any other debug info you need
  console.log('Attempting to navigate to pending users...');
}
// In your ListUsersComponent
// In your ListUsersComponent
testNavigation() {
  console.log('Navigation attempted to /admin/pending-users');
  
  // Check if router is available
  if (!this.router) {
    console.error('Router is not injected!');
    return;
  }

  this.router.navigate(['/admin/pending-users'])
    .then(success => {
      console.log('Navigation success:', success);
      if (!success) {
        console.warn('Navigation returned false - check your routes and guards');
      }
    })
    .catch(err => {
      console.error('Navigation error:', err);
    });
}
  
}
