import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Comentario } from './comentario/comentario';
import { Post } from './post/post';
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  
  apiUrl: string = environment.apiURLBase + "/api/comentario";


  constructor(private http: HttpClient) { }

  salvar(comentario : Comentario) : Observable<Comentario> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
     return this.http.post<Comentario>(this.apiUrl, comentario, {headers});
  }

}
