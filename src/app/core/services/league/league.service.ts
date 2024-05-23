import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private SERVER_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getLeagueById(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/leagues/${id}`);
  }

  getScheduleById(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/leagues/schedules/seasons/${id}`);
  }

  getStandingsById(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/leagues/standings/${id}`);
  }

  getGoalscorersBySeasonId(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/topscorers/goals/${id}`);
  }

  getAssistscorersBySeasonId(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/topscorers/assists/${id}`);
  }
  
  getYellowCardsScorersBySeasonId(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/topscorers/yellow-cards/${id}`);
  }

  getPenaltyScorersBySeasonId(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/topscorers/penalty/${id}`);
  }

  getSquadStatistic(): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/squadStatistic`);
  }
}