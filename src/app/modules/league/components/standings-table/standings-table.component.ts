import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueService } from '../../../../core/services/league/league.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-standings-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './standings-table.component.html',
  styleUrl: './standings-table.component.css'
})
export class StandingsTableComponent implements OnInit{
  leagueId!: string;
  teamsData: any;

  constructor(private leagueService: LeagueService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.leagueId = params['leagueId'];
      this.leagueService.getStandingsById(this.leagueId).subscribe(data => {
        this.teamsData = data;
      });
    });
  }
  getDetailsValue(teamStanding: any, typeId: number): any {
    const detail = teamStanding.details.find((detail: any) => detail.type_id === typeId);
    return detail ? detail.value : '-';
  }
}