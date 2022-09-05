import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  PUBLIC_KEY = '3347647ad69d2b89ca5e6efd59a0375f'; // Use sua PUBLIC_KEY aqui!!!
  HASH = '';
  URL_API = `https://gateway.marvel.com:443/v1/public/characters`;

  constructor(private http: HttpClient) {}

  public getAllCharacters(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_API}?limit=${limit}&offset=${offset}&apikey=${this.PUBLIC_KEY}`
    );
  }

  public getCharacterComicsById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_API}/${id}/comics?apikey=${this.PUBLIC_KEY}`
    );
  }
}
