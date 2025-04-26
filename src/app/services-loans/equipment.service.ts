import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/loans/loan-info/loan-info.component';  // Update to correct import path

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = 'http://localhost:8089/pi/api/equipments';

  constructor(private http: HttpClient) {}

  // Get all equipment
  getEquipments(): Observable<Equipment[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Equipment[]>(this.apiUrl, { headers });
  }

  // Get a single equipment by its ID
  getEquipment(id: number): Observable<Equipment> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Equipment>(`${this.apiUrl}/${id}`, { headers });
  }

  // Add new equipment
  addEquipment(equipment: Equipment): Observable<Equipment> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Equipment>(this.apiUrl, equipment, { headers });
  }

  // Update an existing equipment with FormData (including images)
  updateEquipment(id: number, equipmentData: FormData): Observable<Equipment> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Equipment>(`${this.apiUrl}/${id}`, equipmentData, { headers });
  }

  // Delete an equipment by its ID
  deleteEquipment(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
  filterEquipments(filter: { name: string; type: string; availability: boolean | null }): Observable<Equipment[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Equipment[]>(`${this.apiUrl}/search`, filter, { headers });
  }
}

export { Equipment };
