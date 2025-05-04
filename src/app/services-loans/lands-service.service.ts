// land.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Land {
  idLand: number;
  location: string;
  size: number;
  soilType: string;
  available: boolean;
  waterRequirement: number;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LandService {
  private baseUrl = 'http://localhost:8089/pi/api/land'; // adjust endpoint

  constructor(private http: HttpClient) {}

  getAllLands(): Observable<Land[]> {
    return this.http.get<Land[]>(`${this.baseUrl}/getAll`);
  }

  getLandById(id: number): Observable<Land> {
    return this.http.get<Land>(`${this.baseUrl}/get/${id}`);
  }

  deleteLand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
