import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../../core/services/league/league.service';
import { CommonModule, DatePipe } from '@angular/common';

interface Round {
  name: string;
  fixtures: Fixture[];
}

interface Fixture {
  id: number;
  name: string;
  starting_at: string;
  participants: Participant[];
  homeGoals: any; 
  awayGoals: any; 
}

interface Participant {
  name: string;
  image_path: string;
}

interface RoundData {
  rounds: Round[];
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {

  seasonID!: string;
  scheduleInfo: RoundData | undefined;
  currentPage: number = 1;
  roundsPerPage: number = 5;

  constructor(private leagueService: LeagueService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.seasonID = params['seasonId'];
      this.leagueService.getScheduleById(this.seasonID).subscribe(data => {
        this.scheduleInfo = {
          rounds: data[0].rounds.map((round: any) => ({
            name: round.name,
            fixtures: round.fixtures.map((fixture: any) => ({
              id: fixture.id,
              name: fixture.name,
              starting_at: fixture.starting_at,
              participants: fixture.participants.map((participant: any) => ({
                name: participant.name,
                image_path: participant.image_path
              })),
              homeGoals: fixture.scores[0],
              awayGoals: fixture.scores[1],
            }))
          }))
        }
    });
  })
  }

  getCurrentPageRounds(): Round[] {
    const startIndex = (this.currentPage - 1) * this.roundsPerPage;
    const endIndex = Math.min(startIndex + this.roundsPerPage, this.scheduleInfo?.rounds.length ?? 0);
    return this.scheduleInfo?.rounds.slice(startIndex, endIndex) ?? [];
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil((this.scheduleInfo?.rounds.length ?? 0) / this.roundsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

}
