import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular_pi';

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
