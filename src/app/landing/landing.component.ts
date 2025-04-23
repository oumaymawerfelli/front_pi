import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

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
