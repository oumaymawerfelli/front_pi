// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8089/pi/posts';

  constructor(private http: HttpClient) {}
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/all`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/add`, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/update/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  ////
  uploadImage(file: File, postId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload/${postId}`, formData);
  }
  ////
}