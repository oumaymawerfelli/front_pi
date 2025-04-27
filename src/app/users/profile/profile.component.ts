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
  profilePictureBase64?: string;
  role?: string;
  institution?: string;
  score?: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserProfile = { name: '', email: '' }; 
  errorMessage: string = '';
  isEditing = false;
  originalUser: any;

  constructor(
    public authService: AuthService, 
    private router: Router,
    private cdRef: ChangeDetectorRef, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken?.userId || decodedToken?.idUser;
  
    if (!userId) {
      console.error('User ID not found in token');
      return;
    }

    // Fetch the profile of the logged-in user
    this.userService.getProfile().subscribe(
      (user: UserProfile) => {
        this.user = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          adresse: user.adresse,
          dateOfBirth: user.dateOfBirth,
          profilePictureBase64: user.profilePictureBase64,
          role: user.role,
          score: user.score  // <-- Now you also save the score
        };
        this.originalUser = JSON.parse(JSON.stringify(this.user));
        console.log("Received profile with score:", user);
      },
      error => {
        console.error('Failed to load profile with score', error);
        this.errorMessage = 'Failed to load profile data';
      }
    );
  }    

  goToUsers() {
    this.router.navigate(['/admin/users']);
  }

  getProfilePictureUrl(filePath: string): string {
    if (filePath && filePath.startsWith('data:image')) {
      return filePath; 
    }
    return filePath ? `/uploads/${filePath}` : '/assets/default-profile.png'; 
  }

  updateUser(): void {
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);
      if (this.user.phone) formData.append('phone', this.user.phone);
      if (this.user.adresse) formData.append('adresse', this.user.adresse);
      if (this.user.dateOfBirth) formData.append('dateOfBirth', this.user.dateOfBirth);

      this.userService.updateUserProfile(formData).subscribe(
        (response) => {
          console.log('Profile updated successfully', response);

          // Update profile picture base64 value
          const reader = new FileReader();
          reader.onload = () => {
            this.user.profilePictureBase64 = reader.result as string;
            // Manually trigger change detection to update the view
            this.cdRef.detectChanges();
          };
          reader.readAsDataURL(file);
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
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

        // Fetch the updated user profile after saving changes
        this.userService.getLoggedInUser().subscribe(
          (updatedUser: User) => {
            this.user = { 
              ...updatedUser, 
              dateOfBirth: updatedUser.dateOfBirth ? new Date(updatedUser.dateOfBirth).toISOString().split('T')[0] : undefined
            };
            this.originalUser = JSON.parse(JSON.stringify(this.user));
            console.log('Updated profile loaded:', updatedUser);
          },
          error => {
            console.error('Failed to reload updated profile', error);
          }
        );
      },
      error => {
        console.error('Error updating profile:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }

  editProfilePicture() {
    console.log('Edit profile picture clicked');
  }

  cancelEdit() {
    this.user = JSON.parse(JSON.stringify(this.originalUser));
    this.isEditing = false;
  }

  goToAnalytics() {
    this.router.navigate(['/admin/analytics']);
  }
}
