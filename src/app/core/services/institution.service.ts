import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Institution } from 'src/app/core/models/institution.model';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private baseUrl = 'http://localhost:8089/pi/institution';

  constructor(private http: HttpClient) {}

  getInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.baseUrl}/retrieve-all-institutions`);
  }

  addInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(`${this.baseUrl}/add-institution`, institution);
  }
  deleteInstitution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-institution/${id}`); 
  }
// GET a single institution by ID
getInstitutionById(id: number): Observable<Institution> {
  return this.http.get<Institution>(`${this.baseUrl}/retrieve-institution/${id}`);
}

// PUT - update an existing institution
updateInstitution(institution: Institution): Observable<Institution> {
  return this.http.put<Institution>(`${this.baseUrl}/modify-institution`, institution);
}
}
