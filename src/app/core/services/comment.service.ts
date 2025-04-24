import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from 'src/app/core/models/commentaire';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:8089/pi/comments';

  constructor(private http: HttpClient) {}

  addComment(postId: number, comment: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.apiUrl}/add/${postId}`, comment);
  }

  getCommentsByPost(postId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}/post/${postId}`);
  }

  likeComment(id: number): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiUrl}/like/${id}`, {});
  }

  dislikeComment(id: number): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiUrl}/dislike/${id}`, {});
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
