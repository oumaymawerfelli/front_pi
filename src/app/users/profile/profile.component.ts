import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  adresse?: string;
  dateOfBirth?: string;
  profilePicture?: string; // Optional, adjust based on your implementation
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserProfile = { name: '', email: '' }; // Initialize with default values
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

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

  getProfilePictureUrl(profilePicture: any): string {
    return `data:image/jpeg;base64,${profilePicture}`;
  }
}
