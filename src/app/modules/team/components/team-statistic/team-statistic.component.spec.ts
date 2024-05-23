import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStatisticComponent } from './team-statistic.component';

describe('TeamStatisticComponent', () => {
  let component: TeamStatisticComponent;
  let fixture: ComponentFixture<TeamStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
