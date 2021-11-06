import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Better } from '../models/better';

@Injectable({
  providedIn: 'root'
})
export class BetterService {

  private http : HttpClient;

  constructor(http : HttpClient) {
    this.http = http;
   }

   public getAllBetters(): Observable<Better[]>{
    return this.http.get<Better[]>("https://localhost:44348/Better")
  }
  public addBetter(better : Better): Observable<number>{
    return this.http.post<number>("https://localhost:44348/Better", better)
  }
  public deleteBetter(id: number): Observable<Better> {
    return this.http.delete<Better>(`https://localhost:44348/${id}`);
  }
  public updateBetter(updatedBetter:Better): Observable<Better> {
    return this.http.put<Better>("https://localhost:44348/Better", updatedBetter);
  }
  public getAllBettersByHorse(id :number): Observable<Better[]>{
    return this.http.get<Better[]>(`https://localhost:44348/Better/${id}/Horse`)
  }
}
