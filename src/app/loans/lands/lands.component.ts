import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Land, LandService } from 'src/app/services-loans/lands-service.service';

@Component({
  selector: 'app-land',
  templateUrl: './lands.component.html',
  styleUrls: ['./lands.component.css']
})
export class LandComponent implements OnInit, AfterViewInit {
  landList: Land[] = [];
  searchId!: number;
  searchError = false;

  constructor(private landService: LandService) {}

  ngOnInit(): void {
    this.getAllLands();
  }

  ngAfterViewInit(): void {
    const el = document.getElementById('landManagementSection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getAllLands(): void {
    this.landService.getAllLands().subscribe((lands) => {
      this.landList = lands;
    });
  }

  getLand(id: number): void {
    this.landService.getLandById(id).subscribe({
      next: (land) => {
        this.landList = [land];
        this.searchError = false;
      },
      error: () => {
        this.searchError = true;
        this.getAllLands();
      }
    });
  }

  resetSearch(): void {
    this.searchId = 0;
    this.searchError = false;
    this.getAllLands();
  }

  deleteLand(id: number): void {
    this.landService.deleteLand(id).subscribe(() => {
      this.getAllLands();
    });
  }
}
