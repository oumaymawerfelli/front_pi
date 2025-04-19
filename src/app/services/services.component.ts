import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  ngAfterViewInit(): void {
    const carousel = document.querySelector('#hero-carousel');
    const items = carousel?.querySelectorAll('.carousel-item');
    const indicators = carousel?.querySelector('.carousel-indicators');

    if (carousel && items && indicators) {
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-bs-target', '#hero-carousel');
        li.setAttribute('data-bs-slide-to', index.toString());
        if (index === 0) li.classList.add('active');
        indicators.appendChild(li);
      });
    }
  }

}
