import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../models/user.model'; 

import { UserProfile } from '../models/userProfile.model'; 
import { LoginAttempt } from '../models/LoginAttempt.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8089/pi/users'; 

  constructor(private http: HttpClient) { }
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/get-all-users`, { headers: this.getHeaders() });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user/${id}`, { headers: this.getHeaders() });
  }

  addUser(user: User): Observable<User> {

    const userToAdd = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      address: user.address,
      phone: user.phone,
      cin: user.cin,
      enabled: user.enabled,
      dateOfBirth: user.dateOfBirth,
      service: user.service,
      paymentInfo: user.paymentInfo,
      companyName: user.companyName
    };
  
    return this.http.post<User>(`${this.apiUrl}/add-user`, userToAdd, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }
  getLoggedInUser(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<User>(`${this.apiUrl}/profile/profile`, { headers });

  }
  

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-user/${user.idUser}`, user, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }
  updateUserProfile(data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-user-profile`, data, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
       
      }),
      withCredentials: true
    });
  }

  
  
  approveUser(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/approve/${userId}`, null, {
        headers: this.getHeaders(),
        withCredentials: true
    });
}
  
getPendingUsers(): Observable<any[]> {
  console.log('Attempting to fetch pending users...');
  return this.http.get<any[]>(`${this.apiUrl}/pending-users`, { 
    headers: this.getHeaders(),
    withCredentials: true 
  }).pipe(
    tap(response => console.log('Received pending users:', response)),
    catchError(error => {
      console.error('Error fetching pending users:', error);
      return throwError(() => new Error('Failed to fetch pending users'));
    })
  );
}
  
  
    
  

  
  

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${id}`, { headers: this.getHeaders() });
  }

  getProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ user: UserProfile, score: number }>('http://localhost:8089/pi/profile/profile', { headers })
      .pipe(
     
        map(response => ({
          ...response.user,
          score: response.score
        }))
      );
  }
  
  getLoginAnalytics(): Observable<LoginAttempt[]> {
    const token = localStorage.getItem('token');
    if (!token) return of([]);
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<LoginAttempt[]>('http://localhost:8089/pi/admin/analytics', { headers });
  }
  
  

  
}