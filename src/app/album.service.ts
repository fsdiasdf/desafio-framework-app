import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Album } from './album/album';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiUrl: string = environment.apiURLBase + "/api/album";

  constructor(
    private http: HttpClient
  ) { }


  salvar(album : Album) : Observable<Album> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
     return this.http.post<Album>(this.apiUrl, album, {headers});
  }

  atualizar(post : Album) : Observable<any> {
   const tokenString = localStorage.getItem('access_token')
   const token = JSON.parse(tokenString)
   const headers = {
     'Authorization' : 'Bearer ' + token.access_token
   }
    return this.http.put<Album>(this.apiUrl+`/${post.id}`, post, {headers});
 }

  getAlbuns() : Observable<Album[]> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
      return this.http.get<Album[]>(this.apiUrl, {headers});
   }


   getAlbumPorId(id: number) : Observable<Album> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return this.http.get<any>(this.apiUrl+`/${id}`, {headers});
   }
   
   deletar(post : Album) : Observable<any> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
     return this.http.delete<any>(this.apiUrl+`/${post.id}`, {headers});
   }
}
