import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private baseUrl = 'http://localhost:8089/pi/api/land';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllLands(): Observable<Land[]> {
    return this.http.get<Land[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getLandById(id: number): Observable<Land> {
    return this.http.get<Land>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  deleteLand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
