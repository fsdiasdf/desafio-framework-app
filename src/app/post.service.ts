import { Injectable } from '@angular/core';
import { Post } from './post/post';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl: string = environment.apiURLBase + "/api/post";

  constructor(private http: HttpClient) { 

   }

   salvar(post : Post) : Observable<Post> {
     const tokenString = localStorage.getItem('access_token')
     const token = JSON.parse(tokenString)
     const headers = {
       'Authorization' : 'Bearer ' + token.access_token
     }
      return this.http.post<Post>(this.apiUrl, post, {headers});
   }

   atualizar(post : Post) : Observable<any> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
     return this.http.put<Post>(this.apiUrl+`/${post.id}`, post, {headers});
  }

   getPosts() : Observable<Post[]> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
      return this.http.get<Post[]>(this.apiUrl, {headers});
   }

   getPostPorId(id: number) : Observable<Post> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return this.http.get<any>(this.apiUrl+`/${id}`, {headers});
   }
   
   deletar(post : Post) : Observable<any> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
     return this.http.delete<any>(this.apiUrl+`/${post.id}`, {headers});
   }

}
