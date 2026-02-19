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
        path: 'quotation-management/:id',
        loadComponent: () => import('./pages/quotation-management/quote-details.component').then(m => m.QuoteDetailsComponent)
    },
    {
        path: 'api-versioning',
        loadComponent: () => import('./pages/api-versioning/api-versioning.component').then(m => m.ApiVersioningComponent)
    },
    {
        path: 'api-monitoring',
        loadComponent: () => import('./pages/api-monitoring/api-monitoring.component').then(m => m.ApiMonitoringComponent)
    },
    {
        path: 'audit-logs',
        loadComponent: () => import('./pages/audit-logs/audit-logs.component').then(m => m.AuditLogsComponent)
    },
    {
        path: 'audit-logs/:id',
        loadComponent: () => import('./pages/audit-logs/audit-log-details.component').then(m => m.AuditLogDetailsComponent)
    },
    {
        path: 'reports',
        redirectTo: 'dashboard'
    },
    {
        path: 'audit',
        redirectTo: 'audit-logs'
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
