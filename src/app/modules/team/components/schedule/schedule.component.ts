import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../../core/services/team/team.service';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{
  teamID: string = "9";
  seasonID: string = "21646";
  scheduleINFO : any;

  constructor(private route: ActivatedRoute, private teamService: TeamService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.teamID = params['teamID'];
      this.seasonID = params['seasonID'];

      this.teamService.getTeamScheduleByID(this.teamID, this.seasonID).subscribe(data =>{
        this.scheduleINFO = data[0];    
        
        this.scheduleINFO.rounds.sort((a: any, b: any) => {
          const roundA = parseInt(a.name);
          const roundB = parseInt(b.name);
          return roundB - roundA;
        });
      })
    });
  }
}
