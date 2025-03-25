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
  selectedUser: User | null = null; // Property to hold the user to be edited

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  editUser(user: User): void {
    this.selectedUser = user;  // Set the selected user for editing
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(user => user.idUser !== id);  // Remove user from list
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

  handleFormSubmit(user: User): void {
    if (user.idUser) {
      // If there is an idUser, we are updating an existing user
      this.userService.updateUser(user).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex(u => u.idUser === updatedUser.idUser);
          if (index !== -1) {
            this.users[index] = updatedUser;  // Replace old user with updated user
          }
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      // Otherwise, we are adding a new user
      this.userService.addUser(user).subscribe(
        (newUser) => {
          this.users.push(newUser);  // Add the new user to the list
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    }
    this.selectedUser = null;  // Clear the selected user after form submission
  }
}
