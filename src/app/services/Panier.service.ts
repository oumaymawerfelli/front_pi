// services/panier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LignePanier } from '../models/LignePanier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseUrl = 'http://localhost:8095/pi1/Panier';

  constructor(private http: HttpClient) {}

  getLignesByPanierId(panierId: number): Observable<LignePanier[]> {
    return this.http.get<LignePanier[]>(`${this.baseUrl}/${panierId}/lignes`);
  }
}
