import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../../core/services/team/team.service';
import { ChartsService } from '../../../../core/services/charts/charts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-statistic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-statistic.component.html',
  styleUrl: './team-statistic.component.css'
})
export class TeamStatisticComponent implements OnInit{
  teamID: string = "9";
  seasonID: string = "21646";
  teamStats: any;
  DataToTable: any;
  constructor( private route: ActivatedRoute, private teamService: TeamService, private chartsService: ChartsService){}

  ngOnInit(): void {
    //Receiving params 
    this.route.queryParams.subscribe(params => {
      this.teamID = params['teamID'];
      this.seasonID = params['seasonID'];
      //Getting Statistic data by API
      this.teamService.getTeamStatisticByID(this.teamID, this.seasonID).subscribe(data=>{
        this.teamStats = data;
        //Work with stats data
        this.teamStats.statistics.forEach((statistic: any) => {
          // Отримуємо доступ до details для кожного об'єкта statistic
          const details = statistic.details;
          const TeamForm = this.filterDetailsByTypes(details, ['Team Wins', 'Team Lost', 'Team Draws']);
          const backgroundColors = TeamForm.map(detail => {
            if (detail.type === 'Team Wins') {
              return '#28a745'; // Зелений колір для перемог
            } else if (detail.type === 'Team Lost') {
              return '#dc3545'; // Червоний колір для поразок
            } else {
              return '#ffc107'; // Оранжевий колір для нічиїх
            }
          });
          this.chartsService.drawDonutChart('matches', TeamForm.map(detail => detail.type), TeamForm.map(detail => detail.value),"Matches", backgroundColors);
          const scoringMinutes = details.find((detail: any) => detail.type.name === 'Scoring Minutes');
          if (scoringMinutes) {
            const scoringMinutesData = Object.keys(scoringMinutes.value).map(key => ({
                type: key,
                value: scoringMinutes.value[key].count
            }));
            this.chartsService.drawLineChart("scoring-minutes", scoringMinutesData.map(data => data.type), scoringMinutesData.map(data => data.value), 'Scoring Minutes');
          }
          const shots = details.find((detail: any) => detail.type.name === 'Shots');
          if (shots) {
              const relevantTypes = ['on_target', 'off_target', 'inside_box', 'outside_box', 'blocked'];
              const shotsData = relevantTypes.map((type: string) => ({
                  type: type,
                  value: shots.value[type]
              }));
              // Виклик методу для малювання графіка
              this.chartsService.drawPolarAreaChart('shots', shotsData.map(data => data.type), shotsData.map(data => data.value), 'Shots');
          }
          this.DataToTable = this.filterDetailsByTypes(details, ['Dangerous Attacks', 'Offsides', 'Goals', 'Corners', 'Attacks', 'Ball Possession %','Fouls', 'Tackles', 'Goals Conceded']);
        });     
      })
    });
  }

    //Function for selecting data
    filterDetailsByTypes(details: any[], relevantTypes: string[]): any[] {
      return details.filter((detail: any) => relevantTypes.includes(detail.type.name)).map((detail: any) => ({
        type: detail.type.name,    
        value: detail.value.all ? detail.value.all.count : detail.value.count,
        group: detail.type.stat_group
      }));
    }
}
