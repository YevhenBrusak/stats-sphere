import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  fixtures: any[] = [];
  hasNextPage: boolean | null = null;
  hasPreviousPage: boolean = false;
  currentPage: number = 1;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.fetchFixtures();
  }

  fetchFixtures() {
    this.homeService.getFixturesForWeek(this.currentPage).subscribe((response: any) => {
      this.fixtures = response.data;
      this.hasNextPage = response.pagination.has_more;
      this.hasPreviousPage = this.currentPage > 1;
    });
  }

  loadNextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.fetchFixtures();
    }
  }

  loadPreviousPage() {
    if (this.hasPreviousPage) {
      this.currentPage--;
      this.fetchFixtures();
    }
  }
}
