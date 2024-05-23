import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'league/:id', loadComponent: () => import('./modules/league/league.component').then(m => m.LeagueComponent),
        children: [
            { path: 'standings', loadComponent: () => import('./modules/league/components/standings-table/standings-table.component')
            .then(m => m.StandingsTableComponent) },
            { path: 'topscorers', loadComponent: () => import('./modules/league/components/topscorers/topscorers.component')
            .then(m => m.TopscorersComponent) },
            { path: 'schedule', loadComponent: () => import('./modules/league/components/schedule/schedule.component')
            .then(m => m.ScheduleComponent) },
        ]
    },
    {
        path: 'team/:teamID/:seasonID', loadComponent: () => import('./modules/team/team.component').then(m => m.TeamComponent),
        children: [
            { path: 'team-statistic', loadComponent: () => import('./modules/team/components/team-statistic/team-statistic.component')
            .then(m => m.TeamStatisticComponent) },
            { path: 'team-squad', loadComponent: () => import('./modules/team/components/squad/squad.component')
            .then(m => m.SquadComponent) },
            { path: 'team-schedule', loadComponent: () => import('./modules/team/components/schedule/schedule.component')
            .then(m => m.ScheduleComponent) },
        ]
    },
    { path: 'home', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
    { path: '', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
];
