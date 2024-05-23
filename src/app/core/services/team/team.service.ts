import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private SERVER_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTeamInfoByID(teamID: string): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/teams/${teamID}`);
  }

  getTeamStatisticByID(teamID: string, seasonID: string): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/teams/statistic/${teamID}/${seasonID}`);
  }

  getTeamSquadByID(teamID: string, seasonID: string): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/teams/squad/${teamID}/${seasonID}`);
  }

  getTeamScheduleByID(teamID: string, seasonID: string): Observable<any>{
    return this.http.get(`${this.SERVER_URL}/teams/schedule/${teamID}/${seasonID}`);
  }
}
