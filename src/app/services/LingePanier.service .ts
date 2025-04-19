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
  private ligneUrl = `${environment.apiUrl}/lignes-panier`;

  constructor(private http: HttpClient) {}

  addLigneToPanier(panierId: number, ligne: LignePanier): Observable<LignePanier> {
    return this.http.post<LignePanier>(`${this.apiUrl}/${panierId}/add-ligne`, ligne);
  }

  updateLignePanier(id: number, ligne: LignePanier): Observable<LignePanier> {
    return this.http.put<LignePanier>(`${this.ligneUrl}/update_panier/${id}`, ligne);
  }

  deleteLignePanier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ligneUrl}/${id}`);
  }
}
