import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LignePanier } from '../models/LignePanier';
import { environment } from 'src/assets/envirnment/environment';
import { AuthService } from './auth.service'; // Assurez-vous que AuthService est importé pour gérer l'authentification

@Injectable({
  providedIn: 'root'
})
export class LignePanierService {
  private apiUrl = `${environment.apiUrl}/Panier`;
  private ligneUrl = `${environment.apiUrl}/lignes-panier`;

  constructor(
    private http: HttpClient,
    private authService: AuthService // Ajouter AuthService pour la gestion de l'authentification
  ) {}

  // Méthode pour ajouter une ligne au panier
  addLigneToPanier(panierId: number, ligne: LignePanier): Observable<LignePanier> {
    return this.http.post<LignePanier>(`${this.apiUrl}/${panierId}/add-ligne`, ligne, { headers: this.createAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour mettre à jour une ligne du panier
  updateLignePanier(id: number, ligne: LignePanier): Observable<LignePanier> {
    return this.http.put<LignePanier>(`${this.ligneUrl}/update_panier/${id}`, ligne, { headers: this.createAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour supprimer une ligne du panier
  deleteLignePanier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ligneUrl}/${id}`, { headers: this.createAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Créer des en-têtes d'authentification (si nécessaire)
  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Assurez-vous d'avoir la méthode getToken dans votre AuthService
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Gestion des erreurs
  private handleError(error: any) {
    let errorMessage = 'Une erreur est survenue.';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code erreur: ${error.status}, Message: ${error.message}`;
    }

    // Vous pouvez aussi enregistrer l'erreur dans un service de logs ou d'analyse
    console.error(errorMessage);

    // Retourne un observable avec le message d'erreur
    return throwError(() => new Error(errorMessage));
  }
}
