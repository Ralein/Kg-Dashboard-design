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
        path: 'user-creation',
        loadComponent: () => import('./pages/user-creation/user-creation.component').then(m => m.UserCreationComponent)
    },
    {
        path: 'consent-management',
        loadComponent: () => import('./pages/consent-list/consent-list.component').then(m => m.ConsentListComponent)
    },
    {
        path: 'quotation-management',
        loadComponent: () => import('./pages/quotation-management/quotation-management.component').then(m => m.QuotationManagementComponent)
    },
    {
        path: 'api-monitoring',
        loadComponent: () => import('./pages/api-monitoring/api-monitoring.component').then(m => m.ApiMonitoringComponent)
    },
    {
        path: 'consents',
        redirectTo: 'consent-management'
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
