import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginatedResponse, SimpsonsCharacter, SimpsonsEpisode } from '../models/simpsons.model';

@Injectable({
  providedIn: 'root',
})
export class SimpsonsApi {
  private readonly baseUrl = 'https://thesimpsonsapi.com/api';

  constructor(private http: HttpClient) {}

  // Página 1 (o la que sea)
  getCharacters(page = 1): Observable<PaginatedResponse<SimpsonsCharacter>> {
    return this.http
      .get<PaginatedResponse<SimpsonsCharacter>>(
        `${this.baseUrl}/characters?page=${page}`
      )
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error cargando personajes'))
        )
      );
  }

  // La API devuelve portrait_path tipo "/character/1.webp"
  portraitUrl(portraitPath: string | null): string {
    if (!portraitPath) return '';
    if (portraitPath.startsWith('http')) return portraitPath;
    return `https://cdn.thesimpsonsapi.com/500${portraitPath}`;
  }
  // Detalle por id
  getCharacterById(id: number): Observable<SimpsonsCharacter> {
    return this.http
      .get<SimpsonsCharacter>(`${this.baseUrl}/characters/${id}`)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error cargando personaje'))
        )
      );
  }

  // Métodos nuevos para los episodios (base los de character)
   // Listado paginado de episodios
   getEpisodes(page = 1): Observable<PaginatedResponse<SimpsonsEpisode>> {
    return this.http
      .get<PaginatedResponse<SimpsonsEpisode>>(
        `${this.baseUrl}/episodes?page=${page}`
      )
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error cargando episodios'))
        )
      );
  }

  // Detalle de episodio por id
  getEpisodeById(id: number): Observable<SimpsonsEpisode> {
    return this.http
      .get<SimpsonsEpisode>(`${this.baseUrl}/episodes/${id}`)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error cargando episodio'))
        )
      );
  }
  episodeImageUrl(path: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `https://cdn.thesimpsonsapi.com/500${path}`;
  }
  
}
