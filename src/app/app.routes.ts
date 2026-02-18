import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'consents',
        loadComponent: () => import('./pages/consent-list/consent-list.component').then(m => m.ConsentListComponent)
    },
    {
        path: 'consents/:id',
        loadComponent: () => import('./pages/consent-detail/consent-detail.component').then(m => m.ConsentDetailComponent)
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
