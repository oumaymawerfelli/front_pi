import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.css']
})
export class LoanManagementComponent implements OnInit, OnDestroy {

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.toggleScrollTopButton();
  }
  ngOnInit(): void {
    setTimeout(() => {
      const el = document.getElementById('loanManagementSection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Small delay to wait until view is rendered
  

    this.toggleScrollTopButton();
    window.addEventListener('scroll', this.toggleScrollTopButton.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.toggleScrollTopButton.bind(this));
  }

  private toggleScrollTopButton(): void {
    const scrollTop = document.getElementById('scroll-top');
    if (scrollTop) {
      if (window.scrollY > 200) {
        scrollTop.classList.add('show');
      } else {
        scrollTop.classList.remove('show');
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loanServices = [
    { name: 'Tractor Loans', emoji: '🚜', desc: 'Heavy machinery for field preparation' },
    { name: 'Harvester Loans', emoji: '🌾', desc: 'Modern combine harvesters available' },
    { name: 'Soil Kit Loans', emoji: '🔬', desc: 'Advanced soil testing equipment' },
    { name: 'Weather Stations', emoji: '🌦️', desc: 'Precision climate monitoring systems' },
    { name: 'Drone Loans', emoji: '📡', desc: 'Aerial surveying drones' },
    { name: 'Training Equipment', emoji: '👨🏫', desc: 'Educational tools for workshops' },
    { name: 'Land Loans', emoji: '🌍', desc: 'Rent or purchase land for agriculture' },
    { name: 'Irrigation Loans', emoji: '🌊', desc: 'Water management systems' }
  ];
}
