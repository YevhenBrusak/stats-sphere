import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../../core/services/league/league.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topscorers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topscorers.component.html',
  styleUrl: './topscorers.component.css'
})
export class TopscorersComponent implements OnInit{
  seasonID!: string;
  topscorersData: any = [];
  
  constructor(private leagueService: LeagueService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.seasonID = params['seasonId'];
    });
    this.getgoalscorersData(this.seasonID);
    this.getassistscorersData(this.seasonID);
    this.getyellowCardscorersData(this.seasonID);
    this.getpenaltyscorersData(this.seasonID);   
  }

  getgoalscorersData(id: string) : void{
    this.leagueService.getGoalscorersBySeasonId(id).subscribe(data => {
      this.topscorersData.push({ title: 'Goals', data: data });
    });
  }

  getassistscorersData(id: string) : void{
    this.leagueService.getAssistscorersBySeasonId(id).subscribe(data => {
      this.topscorersData.push({ title: 'Assists', data: data });
    });
  }

  getyellowCardscorersData(id: string) : void{
    this.leagueService.getYellowCardsScorersBySeasonId(id).subscribe(data => {
      this.topscorersData.push({ title: 'Yellow Cards', data: data });
    });
  }

  getpenaltyscorersData(id: string) : void{
    this.leagueService.getPenaltyScorersBySeasonId(id).subscribe(data => {
      this.topscorersData.push({ title: 'Penalty Scored', data: data });
    });
  }

}
