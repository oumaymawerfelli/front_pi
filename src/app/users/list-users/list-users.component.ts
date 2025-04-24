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
  filteredUsers: User[] = [];
  approvedUsersCount: number = 0;
  selectedUser: User | null = null;
  showForm: boolean = false;
  searchTerm: string = '';
  groupedUsers: { [role: string]: any[] } = {};


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    
  }
  

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
        this.approvedUsersCount = this.users.filter(user => user.enabled).length;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  getRoleClass(role: string): string {
    return role.toLowerCase().replace('role_', '');
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = term;
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  editUser(user: User): void {
    this.selectedUser = {...user};
    this.showForm = true;
  }

  deleteUser(id?: number): void {
    if (id === undefined) {
      console.error('Cannot delete user without ID');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(user => user.idUser !== id);
          this.filteredUsers = this.filteredUsers.filter(user => user.idUser !== id);
          this.approvedUsersCount = this.users.filter(user => user.enabled).length;
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
            this.filteredUsers = [...this.users];
          }
          this.showForm = false;
          this.approvedUsersCount = this.users.filter(u => u.enabled).length;
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      this.userService.addUser(user).subscribe(
        (newUser) => {
          this.users.push(newUser);
          this.filteredUsers = [...this.users];
          this.showForm = false;
          this.approvedUsersCount = this.users.filter(u => u.enabled).length;
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    }
  }

  addNewUser(): void {
    this.selectedUser = null;
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.selectedUser = null;
  }

  approveUser(id?: number): void {
    if (id === undefined) {
      console.error('Cannot approve user without ID');
      return;
    }

    this.userService.approveUser(id).subscribe(
      () => {
        const user = this.users.find(u => u.idUser === id);
        if (user) {
          user.enabled = true;
          this.filteredUsers = [...this.users];
          this.approvedUsersCount = this.users.filter(u => u.enabled).length;
        }
      },
      (error) => {
        console.error('Error approving user', error);
      }
    );
  }

  testNavigation() {
    this.router.navigate(['/admin/pending-users'])
      .then(success => {
        if (!success) {
          console.warn('Navigation failed - check your routes and guards');
        }
      })
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }

  getUserProfileImage(user: User): string {
    return user.profilePictureBase64 || user.profilePicture || 'https://via.placeholder.com/80';
  }
  
}