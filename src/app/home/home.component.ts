import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}
  isComponentRoute(): boolean {
    // List of routes where you want to hide main content and show only component
    
    const componentRoutes = [
      '/home/university/institution',
      '/home/university/research-project',
      '/home/loan-management',
      '/home/loan-info',
      '/home/loan-application',
      '/home/equipment',
      '/home/land',
      '/home/add-land',
      '/home/profile'
    ];
    
    return componentRoutes.some(route => this.router.url.startsWith(route));
  }

}
