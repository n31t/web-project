import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, concatMap, expand, forkJoin, map, switchMap, toArray } from 'rxjs';
import { CPU, GPU, Game, Token, UserPc } from './models';


interface GameListResponse {
  count: number;
  next: string;
  previous: string;
  results: Game[];
}

interface UserPcResponse {
  count: number;
  next: string;
  previous: string;
  results: UserPc[];
}
@Injectable({
  providedIn: 'root'
})
export class PcService {
  BASE_URL = 'http://localhost:8000';
  private loggedSubject = new BehaviorSubject<boolean>(false);
  logged$ = this.loggedSubject.asObservable();
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(
      `${this.BASE_URL}/benchmark/login/`,
      {username, password}
    )
  }

  setLogged(logged: boolean): void {
    this.loggedSubject.next(logged);
  }

  setUnlogged(): void {
    this.loggedSubject.next(false);
  }

  refreshToken(refresh: string ): Observable<Token> {
    return this.http.post<Token>(
      `${this.BASE_URL}/benchmark/refresh/`,
      {refresh}
    )
  }

  getGames(): Observable<Game[]> {
    return this.http.get<GameListResponse>(`${this.BASE_URL}/benchmark/games/`).pipe(
      map(response => response.results)
    );
  }
  // getAllGames(): Observable<Game[]> {
  //   const count = this.http.get<GameListResponse>(`${this.BASE_URL}/benchmark/games/`).pipe(
  //     map(respone => respone.count)
  //   );
  //   return count.pipe(
  //     switchMap(count =>{
  //       const requests = [];
  //       for(let i = 0; i < count; i+=1){
  //         requests.push(this.http.get<Game>(`${this.BASE_URL}/benchmark/games/?limit=20&offset=${i}`));
  //       }
  //       return forkJoin(requests);
  //     })
  //   );
  // }
  getAllGames(): Observable<Game[]> {
    return this.getPage(1).pipe(
      expand(page => page.next ? this.getPage(Number(page.next.split('=')[1])) : EMPTY),
      concatMap(page => page.results),
      toArray()
    );
  }
  
  private getPage(page: number): Observable<GameListResponse> {
    return this.http.get<GameListResponse>(`${this.BASE_URL}/benchmark/games/?page=${page}`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.BASE_URL}/benchmark/games/${id}/`);
  }

  getGameByName(name: string): Observable<Game> {
    return this.http.get<Game>(`${this.BASE_URL}/benchmark/games/name/${name}/`);
  }

  getCpu(id: number): Observable<CPU> {
    return this.http.get<CPU>(`${this.BASE_URL}/benchmark/cpus/${id}/`);
  }

  getGpu(id: number): Observable<GPU> {
    return this.http.get<GPU>(`${this.BASE_URL}/benchmark/gpus/${id}/`);
  }

  getCpus(): Observable<CPU[]> {
    return this.http.get<CPU[]>(`${this.BASE_URL}/benchmark/cpus/`);
  }

  getGpus(): Observable<GPU[]> {
    return this.http.get<GPU[]>(`${this.BASE_URL}/benchmark/gpus/`);
  }

  getUserPc(): Observable<UserPc> {
    return this.http.get<UserPcResponse>(`${this.BASE_URL}/benchmark/userpc/`).pipe(
      map(response => response.results[0])
    );
  }
  postUserPc(cpu_id: number, gpu_id: number, ram: number, storage: number): Observable<UserPc> {
    return this.http.post<UserPc>(`${this.BASE_URL}/benchmark/userpc/`, {cpu_id, gpu_id, ram, storage});
  }
  deleteUserPc(id: number): Observable<UserPc> {
    return this.http.delete<UserPc>(`${this.BASE_URL}/benchmark/userpc/${id}/`);
  }
  updateUserPc(id: number, cpu_id: number, gpu_id: number, ram: number, storage: number): Observable<UserPc> {
    return this.http.put<UserPc>(`${this.BASE_URL}/benchmark/userpc/${id}/`, {cpu_id, gpu_id, ram, storage});
  }
}


