import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeagueService } from '../../core/services/league/league.service';
import { Subscription } from 'rxjs';

interface LeagueInfo {
  image_path: string;
  name: string;
  country: {
    name: string;
  };
  currentseason: {
    id: number;
  };
}

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './league.component.html',
  styleUrl: './league.component.css'
})
export class LeagueComponent implements OnInit {
  leagueID!: string;
  leagueInfo!: LeagueInfo;
  private routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.leagueID = params['id'];
      this.leagueService.getLeagueById(this.leagueID).subscribe(data => {
        this.leagueInfo = {
          image_path: data.image_path,
          name: data.name,
          country: {
            name: data.country.name
          },
          currentseason: {
            id: data.currentseason.id
          }
        };
      });
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
