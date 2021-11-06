import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from '../models/horse';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  private http : HttpClient;

  constructor(http : HttpClient) { 
    this.http = http;
  }
  public getAllHorse(): Observable<Horse[]>{
    return this.http.get<Horse[]>("https://localhost:44348/Horse")
  }

  public addHorse(horse : Horse): Observable<number>{
    return this.http.post<number>("https://localhost:44348/Horse", horse)
  }
  public updateHorse(updatedHorse:Horse): Observable<Horse> {
    return this.http.put<Horse>("https://localhost:44348/Horse", updatedHorse);
  }
  public deleteHorse(id: number): Observable<Horse> {
    return this.http.delete<Horse>(`https://localhost:44348/Horse/${id}`);
  }
}
