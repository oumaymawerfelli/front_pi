import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LignePanier } from '../models/LignePanier';
import { Order } from '../models/Order';
import { environment } from 'src/assets/envirnment/environment';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseUrl = 'http://localhost:8089/pi/Panier';
 private apiUrl = `${environment.apiUrl}/order`;
  constructor(private http: HttpClient) {}

  // Méthode privée pour récupérer les headers avec le token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  validerPanier(panierId: number, order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/valider-panier/${panierId}`, order, {
      headers: this.getHeaders()
    }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la validation du panier :', error);
        if (error.status === 401) {
          console.error('Erreur 401 : Utilisateur non autorisé. Veuillez vérifier vos identifiants.');
        }
        return throwError(error);
      })
    );
  }
  // Récupérer les lignes du panier d'un utilisateur en fonction de l'ID du panier
    getLignesByPanierId(panierId: number): Observable<LignePanier[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${panierId}/lignes`);
  }

  // Récupérer ou créer un panier utilisateur
  getOrCreateUserPanier(): Observable<any> {
    console.log('Vérification du panier pour l\'utilisateur...');
  
    return this.http.get(`${this.baseUrl}/user`, {
      headers: this.getHeaders()
    }).pipe(
      catchError((error) => {
        console.log('Erreur récupérant le panier :', error);
        if (error.status === 404) { // Si le panier n'existe pas
          console.log('Aucun panier trouvé, création d\'un nouveau panier...');
          return this.createPanier();
        }
        return throwError(error);
      })
    );
  }
  
  // Créer un nouveau panier pour l'utilisateur
  createPanier(): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, {}, {
      headers: this.getHeaders()
    });
  }

  // Vérifie si un panier existe pour l'utilisateur
  verifyIfPanierExists(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/user`, {
      headers: this.getHeaders()
    }).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return new Observable<boolean>((observer) => observer.next(false)); // Le panier n'existe pas
        }
        return throwError(error);
      })
    );
  }

}
