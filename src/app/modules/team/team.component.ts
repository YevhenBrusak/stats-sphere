import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../core/services/team/team.service';
import { CommonModule } from '@angular/common';
import { KeyValuePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, KeyValuePipe, RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit{
  teamID: string = "9";
  seasonID: string = "21646";
  teamInfo: any;
  
  constructor(private teamService: TeamService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.teamID = params['teamID'];
      this.seasonID = params['seasonID'];
      this.teamService.getTeamInfoByID(this.teamID).subscribe(data=>{
        this.teamInfo = data;
      })
    })
  }
}
