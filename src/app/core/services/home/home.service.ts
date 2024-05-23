import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private SERVER_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getFixturesForWeek(page: number = 1): Observable<any>{
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    const endDateStr = endDate.toISOString().split('T')[0];
    return this.http.get(`${this.SERVER_URL}/fixtures/${startDate}/${endDateStr}/${page}`);
  }
}
