import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class FarmerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getUserRole() === 'ROLE_FARMER') {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); 
      return false;
    }
  }
}