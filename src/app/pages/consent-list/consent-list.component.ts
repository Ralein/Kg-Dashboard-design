import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ConsentStatus = 'Authorized' | 'AwaitingAuthorization' | 'Revoked' | 'Expired' | 'Suspended';

interface Consent {
  id: string;
  consentId: string;
  customerName: string;
  tppName: string;
  createdOn: string;
  expiresOn: string;
  status: ConsentStatus;
}

@Component({
  selector: 'app-consent-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgClass],
  template: `
    <div class="space-y-8 pb-10">

      <!-- Page Title -->
      <div>
         <h1 class="text-3xl font-bold text-primary tracking-tight">Consent Management</h1>
         <p class="text-secondary text-sm mt-1 font-medium">Manage and monitor all active and historical consents.</p>
      </div>

      <!-- Main Glass Card -->
      <div class="glass-card overflow-hidden animate-spring" style="animation-delay: 100ms">

        <!-- Tabs & Controls Toolbar -->
        <div class="px-6 py-5 border-b border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <!-- Modern Tabs -->
          <div class="flex p-1 bg-bg-app/50 backdrop-blur rounded-xl gap-1 relative shadow-inner">
            <button
              (click)="switchTab('current')"
              class="relative z-10 px-6 py-2 text-sm font-bold rounded-lg transition-all duration-300"
              [class.text-white]="activeTab === 'current'"
              [class.shadow-lg]="activeTab === 'current'"
              [class.shadow-accent/30]="activeTab === 'current'"
              [class.text-secondary]="activeTab !== 'current'"
              [class.bg-accent]="activeTab === 'current'"
              [class.hover:text-primary]="activeTab !== 'current'"
            >
              Current
            </button>
            <button
              (click)="switchTab('history')"
              class="relative z-10 px-6 py-2 text-sm font-bold rounded-lg transition-all duration-300"
              [class.text-white]="activeTab === 'history'"
              [class.shadow-lg]="activeTab === 'history'"
              [class.shadow-accent/30]="activeTab === 'history'"
              [class.text-secondary]="activeTab !== 'history'"
              [class.bg-accent]="activeTab === 'history'"
              [class.hover:text-primary]="activeTab !== 'history'"
            >
              History
            </button>
          </div>

          <!-- Search & Filter -->
          <div class="flex items-center gap-3">
             <div class="relative group">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Search consents..."
                  class="glass-input pl-10 pr-4 py-2 text-sm w-64 text-primary bg-white/40 focus:bg-white/70"
                />
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <circle cx="11" cy="11" r="8"/>
                   <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
             </div>
             
             <!-- Pagination Select -->
             <div class="relative group">
                <select 
                    [(ngModel)]="itemsPerPage"
                    class="glass-input appearance-none pl-3 pr-8 py-2 text-sm font-bold text-primary cursor-pointer hover:bg-white/60 bg-white/40 focus:bg-white/70"
                >
                    <option [value]="10">10</option>
                    <option [value]="25">25</option>
                    <option [value]="50">50</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                </div>
             </div>
          </div>

        </div>

        <!-- Glass Grid Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left border-b border-white/20">
                @for (col of columns; track col) {
                  <th class="px-6 py-4 font-bold text-xs uppercase tracking-wider text-secondary">
                    {{ col }}
                  </th>
                }
              </tr>
            </thead>
            <tbody class="divide-y divide-white/20">

              <!-- Loading Skeleton -->
              @if (loading) {
                 @for (i of [1,2,3,4,5]; track i) {
                   <tr class="animate-pulse">
                     <td class="px-6 py-4"><div class="h-4 w-24 bg-gray-200/50 rounded"></div></td>
                     <td class="px-6 py-4"><div class="h-4 w-32 bg-gray-200/50 rounded"></div></td>
                     <td class="px-6 py-4"><div class="h-4 w-20 bg-gray-200/50 rounded"></div></td>
                     <td class="px-6 py-4"><div class="h-4 w-24 bg-gray-200/50 rounded"></div></td>
                     <td class="px-6 py-4"><div class="h-4 w-24 bg-gray-200/50 rounded"></div></td>
                     <td class="px-6 py-4"><div class="h-6 w-20 bg-gray-200/50 rounded-full"></div></td>
                     <td class="px-6 py-4"><div class="h-8 w-8 bg-gray-200/50 rounded-lg"></div></td>
                   </tr>
                 }
              }

              <!-- Data Rows -->
              @if (!loading) {
                @for (consent of pagedConsents; track consent.id; let i = $index) {
                  <tr
                    class="group transition-colors hover:bg-white/30 animate-spring"
                    [style.animation-delay]="(i * 50) + 'ms'"
                  >
                    <!-- Consent ID -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                         <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                         </div>
                         <a [routerLink]="['/consents', consent.id]" class="font-mono font-semibold text-primary group-hover:text-accent transition-colors">
                            {{ consent.consentId.substring(0, 8) }}...
                         </a>
                      </div>
                    </td>

                    <!-- Customer -->
                    <td class="px-6 py-4 font-semibold text-primary">
                        {{ consent.customerName === '-' ? '—' : consent.customerName }}
                    </td>

                    <!-- TPP -->
                    <td class="px-6 py-4 text-secondary font-medium">
                        {{ consent.tppName }}
                    </td>

                    <!-- Dates -->
                    <td class="px-6 py-4 text-secondary font-mono text-xs">
                       {{ formatDate(consent.createdOn) }}
                    </td>
                     <td class="px-6 py-4 text-secondary font-mono text-xs">
                       {{ formatDate(consent.expiresOn) }}
                    </td>

                    <!-- Status -->
                    <td class="px-6 py-4">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm" [ngClass]="getStatusClass(consent.status)">
                           <span class="w-1.5 h-1.5 rounded-full" [ngClass]="getStatusDot(consent.status)"></span>
                           {{ getStatusLabel(consent.status) }}
                        </span>
                    </td>

                    <!-- Action -->
                    <td class="px-6 py-4">
                       <a [routerLink]="['/consents', consent.id]" class="inline-flex py-1.5 px-3 rounded-lg bg-white/50 text-accent font-bold text-xs hover:bg-accent hover:text-white transition-all shadow-sm hover:shadow-glow">
                          View
                       </a>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>

          <!-- Empty State -->
          @if (!loading && filteredConsents.length === 0) {
            <div class="flex flex-col items-center justify-center py-16 text-center animate-spring">
               <div class="w-16 h-16 bg-bg-app rounded-full flex items-center justify-center mb-4 text-secondary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
               </div>
               <h3 class="text-lg font-bold text-primary">No consents found</h3>
               <p class="text-secondary text-sm mt-1">Try adjusting your search filters.</p>
               <button (click)="searchQuery = ''" class="mt-4 text-accent font-bold text-sm hover:underline">Clear Search</button>
            </div>
          }
        </div>
        
         <!-- Footer / Pagination Info -->
         <div class="px-6 py-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-secondary bg-white/20">
            <span>Showing {{ pagedConsents.length }} of {{ filteredConsents.length }} results</span>
            <div class="flex gap-2">
                @for (btn of paginationBtns; track btn.label) {
                    <button class="w-8 h-8 rounded-lg flex items-center justify-center bg-white/40 hover:bg-white hover:text-accent disabled:opacity-50 transition-all shadow-sm">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <polyline [attr.points]="btn.p1"/>
                           @if(btn.p2) { <polyline [attr.points]="btn.p2"/> }
                        </svg>
                    </button>
                }
            </div>
         </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ConsentListComponent {

  activeTab = 'current';
  searchQuery = '';
  itemsPerPage = 10;
  loading = false;
  hoveredRow: string | null = null;

  readonly columns = ['Consent ID', 'Customer', 'TPP', 'Created', 'Expires', 'Status', 'Action'];

  readonly paginationBtns = [
    { label: 'First', p1: '11 17 6 12 11 7', p2: '18 17 13 12 18 7' },
    { label: 'Previous', p1: '15 18 9 12 15 6', p2: '' },
    { label: 'Next', p1: '9 18 15 12 9 6', p2: '' },
    { label: 'Last', p1: '13 17 18 12 13 7', p2: '6 17 11 12 6 7' },
  ];

  consents: Consent[] = [
    { id: '1', consentId: 'b127-8842-9912-8b04', customerName: '-', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:53:01.901', expiresOn: '2026-12-29T23:00:00', status: 'AwaitingAuthorization' },
    { id: '2', consentId: '7b64-1234-5678-1277', customerName: 'AZIZ ELGOUZOULI', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:22:05.23', expiresOn: '2026-12-29T23:00:00', status: 'Authorized' },
    { id: '3', consentId: 's99c-2231-4412-a351', customerName: '-', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:48:49.781', expiresOn: '2026-12-28T23:00:00', status: 'AwaitingAuthorization' },
    { id: '4', consentId: '9fe8-9912-1123-4291', customerName: 'MAJED SAIF MAJED RAS...', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:45:02.181', expiresOn: '2026-12-28T23:00:00', status: 'AwaitingAuthorization' },
    { id: '5', consentId: 'c16e-5512-3312-8b31', customerName: 'Martino Giovanni Picotti', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:17:09.971', expiresOn: '2026-12-28T23:00:00', status: 'Authorized' },
    { id: '6', consentId: '6797-1241-1123-a01e', customerName: 'Martino Giovanni Picotti', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:15:45.672', expiresOn: '2026-12-28T23:00:00', status: 'Authorized' },
    { id: '7', consentId: '3f12-8812-7712-cc91', customerName: 'JOHN DOE', tppName: 'TPP Client Test', createdOn: '2026-02-17T14:30:00.000', expiresOn: '2026-11-30T23:00:00', status: 'Revoked' },
    { id: '8', consentId: '8a44-1123-5512-dd02', customerName: 'SARA ALI', tppName: 'TPP Client Test', createdOn: '2026-02-17T11:00:00.000', expiresOn: '2026-10-15T23:00:00', status: 'Expired' },
  ];

  get filteredConsents(): Consent[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.consents;
    return this.consents.filter(c =>
      c.consentId.toLowerCase().includes(q) ||
      c.customerName.toLowerCase().includes(q) ||
      c.tppName.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  }

  get pagedConsents(): Consent[] {
    return this.filteredConsents.slice(0, this.itemsPerPage);
  }

  switchTab(tab: string): void {
    if (tab === this.activeTab) return;
    this.loading = true;
    this.activeTab = tab;
    setTimeout(() => { this.loading = false; }, 500);
  }

  formatDate(iso: string): string {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return iso; }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Authorized: 'bg-success/10 text-success ring-1 ring-success/20',
      AwaitingAuthorization: 'bg-warning/10 text-warning ring-1 ring-warning/20',
      Revoked: 'bg-danger/10 text-danger ring-1 ring-danger/20',
      Expired: 'bg-orange-100 text-orange-600 ring-1 ring-orange-200',
      Suspended: 'bg-secondary/10 text-secondary ring-1 ring-secondary/20',
    };
    return map[status] ?? 'bg-secondary/10 text-secondary ring-1 ring-secondary/20';
  }

  getStatusDot(status: string): string {
    const map: Record<string, string> = {
      Authorized: 'bg-success',
      AwaitingAuthorization: 'bg-warning',
      Revoked: 'bg-danger',
      Expired: 'bg-orange-500',
      Suspended: 'bg-secondary',
    };
    return map[status] ?? 'bg-secondary';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      Authorized: 'Authorized',
      AwaitingAuthorization: 'Awaiting Auth',
      Revoked: 'Revoked',
      Expired: 'Expired',
      Suspended: 'Suspended',
    };
    return map[status] ?? status;
  }
}