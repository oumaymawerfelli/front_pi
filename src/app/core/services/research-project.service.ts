import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResearchProject } from 'src/app/core/models/research-project';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResearchProjectService {
  private baseUrl = 'http://localhost:8088/pi/research-project';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<ResearchProject[]> {
    return this.http.get<ResearchProject[]>(`${this.baseUrl}/retrieve-all-projects`);
  }

  getProjectById(id: number): Observable<ResearchProject> {
    return this.http.get<ResearchProject>(`${this.baseUrl}/retrieve-project/${id}`);
  }

  addProject(project: ResearchProject): Observable<ResearchProject> {
    return this.http.post<ResearchProject>(`${this.baseUrl}/add-project`, project);
  }

  updateProject(id: number, project: ResearchProject): Observable<ResearchProject> {
    return this.http.put<ResearchProject>(`${this.baseUrl}/modify-project/${id}`, project);
  }
  

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-project/${id}`);
  }
}
