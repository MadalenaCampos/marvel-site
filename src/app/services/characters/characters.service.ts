import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  PUBLIC_KEY = '?apikey='; // Use sua PUBLIC_KEY aqui!!!
  HASH = '';
  URL_API = `https://gateway.marvel.com:443/v1/public/characters`;

  constructor(private http: HttpClient) {}

  public getAllCharacters(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}${this.PUBLIC_KEY}`);
  }

  public getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL_API}&id=${id}`);
  }

  public getCharacterComicsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/${id}/comics${this.PUBLIC_KEY}`);
  }
}
