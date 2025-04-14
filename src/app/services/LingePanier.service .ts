// src/app/services/ligne-panier.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LignePanier } from 'src/app/models/LignePanier';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LignePanierService {
  private apiUrl = `${environment.apiUrl}/Panier`;

  constructor(private http: HttpClient) {}

  addLigneToPanier(panierId: number, ligne: LignePanier): Observable<LignePanier> {
    return this.http.post<LignePanier>(`${this.apiUrl}/${panierId}/add-ligne`, ligne);
  }
}
