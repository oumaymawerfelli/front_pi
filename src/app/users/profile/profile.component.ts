import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  adresse?: string;
  dateOfBirth?: string;
  profilePicture?: string; 
  role?: string;// Optiona
  institution? : string;// il, adjust based on your implementation
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserProfile = { name: '', email: '' }; // Initialize with default values
  errorMessage: string = '';
  isEditing = false;
originalUser: any;

  constructor(public authService: AuthService, private router: Router , private cdRef: ChangeDetectorRef,   private userService: UserService ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.cdRef.detectChanges(); 

    this.authService.getProfile().subscribe(
      (userData: UserProfile) => {
        if (userData) {
          this.user = userData;
        } else {
          this.errorMessage = 'Profile data not found';
        }
      },
      (error: any) => {
        this.errorMessage = 'Failed to load profile data';
        console.error(error);
      }
    );
  }
  goToUsers() {
    this.router.navigate(['/admin/users']);
  }

  getProfilePictureUrl(filePath: string): string {
    return filePath ? `/uploads/${filePath}` : '/assets/default-profile.png';
  }
  

  updateUser(): void {
    // Assuming your `user` object has an `idUser` field available
    if (!(this.user as any).idUser) {
      console.error('User ID is missing');
      return;
    }
  
    this.userService.updateUser(this.user as unknown as User).subscribe(
      (updatedUser: User) => {
        this.user = { 
          ...updatedUser, 
          dateOfBirth: updatedUser.dateOfBirth ? updatedUser.dateOfBirth.toISOString() : undefined 
        };
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      }
    );
  }
  
  selectedFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    
    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.user.profilePicture = e.target.result; // Preview
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

saveChanges(): void {
  console.log("Save Changes clicked!");
  const formData = new FormData();
  formData.append('name', this.user.name);
  formData.append('email', this.user.email);
  formData.append('phone', this.user.phone || '');
  formData.append('adresse', this.user.adresse || '');
  formData.append('dateOfBirth', this.user.dateOfBirth || '');

  if (this.selectedFile) {
    formData.append('profilePicture', this.selectedFile);
  }

  this.userService.updateUserProfile(formData).subscribe(
    response => {
      console.log('Profile updated successfully', response);
      this.isEditing = false;
      // Optionally update the user object with the response
    },
    error => {
      console.error('Error updating profile:', error);
    }
  );
}



  editProfilePicture() {
    // Trigger file input or navigate to edit picture modal
    console.log('Edit profile picture clicked');
  }
  
  
  
  cancelEdit() {
    this.user = JSON.parse(JSON.stringify(this.originalUser));
    this.isEditing = false;
  }
  
  
}