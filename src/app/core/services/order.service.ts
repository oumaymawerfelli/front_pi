import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Order } from '../models/Order'; // Ton modèle d'Order

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8089/pi/order'; // Attention adapte bien si ton URL change

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Récupérer toutes les commandes
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/get-all-orders`, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('Données reçues du serveur:', data)),
        catchError(this.handleError)
      );
  }

  // Ajouter une commande
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/add-order`, order, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour une commande
  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/update-order/${id}`, order, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
      const token = localStorage.getItem('token');

  }

  // Supprimer une commande
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer une commande par ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/get-order/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Valider un panier pour créer une commande
  validerPanier(idPanier: number, order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/valider-panier/${idPanier}`, order, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs
  private handleError(error: any) {
    console.error('Erreur dans OrderService:', error);
    return throwError(() => new Error(error.message || 'Erreur serveur'));
  }
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user-orders`, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('Commandes utilisateur reçues:', data)),
        catchError(this.handleError)
      );
  }
  
}