import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/posts';
import { PostCategory } from '../models/PostCategory';

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
  addPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/add`, postData);
  }

  updatePost(id: number, postData: FormData): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/update/${id}`, postData);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }


  
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getPostsByCategory(category: string): Observable<Post[]> {
    // Send empty string for "All" categories
    const url = `${this.baseUrl}/all${category === 'All' ? '' : `?category=${category}`}`;
    return this.http.get<Post[]>(url);
  }
  
  searchPosts(query: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
  }


    
    // post.service.ts
  pinPost(id: number): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/pin/${id}`, {});
  }

  unpinPost(id: number): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/unpin/${id}`, {});
  }

  getPinnedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/pinned`);
  }
}