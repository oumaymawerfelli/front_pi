import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  childRouteActive = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        this.childRouteActive = currentUrl !== '/landing';

        // Scroll to auth form after route change
        if (this.childRouteActive) {
          setTimeout(() => {
            const el = document.getElementById('authForms');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100); // short delay to make sure element is rendered
        }
      }
    });
  }

  ngOnInit(): void {
    this.onScroll();
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

  closeModal(): void {
    this.router.navigate(['/landing']);
  }
}
