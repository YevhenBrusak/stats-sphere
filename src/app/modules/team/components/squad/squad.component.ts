import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../../core/services/team/team.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-squad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './squad.component.html',
  styleUrl: './squad.component.css'
})
export class SquadComponent implements OnInit{
  teamID: string = "9";
  seasonID: string = "21646";
  goalkeepers: any;
  defenders: any;
  midfielders: any;
  attackers: any;

  constructor(private route: ActivatedRoute, private teamService: TeamService){}

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      this.teamID = params['teamID'];
      this.seasonID = params['seasonID'];
      this.teamService.getTeamSquadByID(this.teamID, this.seasonID).subscribe(data=>{
        this.goalkeepers = data.filter((player: any) => player.position.code === 'goalkeeper');
        this.defenders = data.filter((player: any) => player.position.code === 'defender');
        this.midfielders = data.filter((player: any) => player.position.code === 'midfielder');
        this.attackers = data.filter((player: any) => player.position.code === 'attacker');
      });
     })
  }

  getDetailsValue(player: any, typeId: number): any {
    const detail = player.details.find((detail: any) => detail.type_id === typeId);
    return detail ? detail.value.total : '0';
  }
}
