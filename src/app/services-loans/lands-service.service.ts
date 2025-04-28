// src/app/services-loans/land.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Land {
  idLand?: number;
  location: string;
  size: number;
  soilType: string;
  available: boolean;
  waterRequirement: number;
  images?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LandService {
  private apiUrl = 'http://localhost:8089/api/land'; // Adjust port if needed

  constructor(private http: HttpClient) {}

  getLands(): Observable<Land[]> {
    return this.http.get<Land[]>(this.apiUrl);
  }

  getLand(id: number): Observable<Land> {
    return this.http.get<Land>(`${this.apiUrl}/${id}`);
  }

  addLand(land: Land): Observable<Land> {
    return this.http.post<Land>(this.apiUrl, land);
  }

  updateLand(id: number, land: Land): Observable<Land> {
    return this.http.put<Land>(`${this.apiUrl}/${id}`, land);
  }

  deleteLand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // (Optional) filter by location, soilType etc (bonus if needed later)
  filterLands(filter: any): Observable<Land[]> {
    // Implement filter query later if backend supports
    return this.http.get<Land[]>(this.apiUrl); // currently just gets all
  }
}
