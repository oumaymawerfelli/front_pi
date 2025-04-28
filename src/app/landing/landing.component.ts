import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
<<<<<<< Updated upstream
=======
  childRouteActive = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        this.childRouteActive = currentUrl !== '/landing';
    
        if (this.childRouteActive) {
          setTimeout(() => {
            let targetId = '';
    
            if (currentUrl.includes('loan-management')) {
              targetId = 'loanManagementSection';
            } else if (currentUrl.includes('equipment-management')) {
              targetId = 'equipmentManagementSection';
            } else if (currentUrl.includes('loan-approval')) {
              targetId = 'loanApprovalSection';
            } else {
              targetId = 'authForms'; // fallback
            }
    
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    });
    
   
  }
>>>>>>> Stashed changes

  ngOnInit(): void {
    this.onScroll(); // Run once in case the page is already scrolled
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
}
