import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  showForm: boolean = false;

  constructor(private userService: UserService) {}

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
}
