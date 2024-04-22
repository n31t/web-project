import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CPU, GPU, Game, Token } from './models';

@Injectable({
  providedIn: 'root'
})
export class PcService {
  BASE_URL = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(
      `${this.BASE_URL}/benchmark/login/`,
      {username, password}
    )
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.BASE_URL}/benchmark/games/`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.BASE_URL}/benchmark/games/${id}/`);
  }

  getCpu(id: number): Observable<CPU> {
    return this.http.get<CPU>(`${this.BASE_URL}/benchmark/cpus/${id}/`);
  }

  getGpu(id: number): Observable<GPU> {
    return this.http.get<GPU>(`${this.BASE_URL}/benchmark/gpus/${id}/`);
  }
}


