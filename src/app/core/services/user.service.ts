import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8089/pi/users'; 

  constructor(private http: HttpClient) { }

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/get-all-users`);
  }


  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user/${id}`);
  }


  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add-user`, user);
  }

 
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-user`, user);
  }


  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${id}`);
  }
}
