import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-consent-list',
    imports: [RouterLink],
    template: `
    <div class="space-y-6">
      <!-- Page Title -->
      <h1 class="text-2xl font-bold text-primary">Consent Management</h1>

      <!-- Card Container -->
      <div class="bg-card rounded-xl border border-border">
        <!-- Tabs -->
        <div class="border-b border-border px-6 pt-4">
          <div class="flex gap-8">
            <button
              (click)="activeTab = 'current'"
              class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer"
              [class.border-primary]="activeTab === 'current'"
              [class.text-primary]="activeTab === 'current'"
              [class.border-transparent]="activeTab !== 'current'"
              [class.text-text-light]="activeTab !== 'current'"
            >
              <span class="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>
                CURRENT
              </span>
            </button>
            <button
              (click)="activeTab = 'history'"
              class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer"
              [class.border-primary]="activeTab === 'history'"
              [class.text-primary]="activeTab === 'history'"
              [class.border-transparent]="activeTab !== 'history'"
              [class.text-text-light]="activeTab !== 'history'"
            >
              <span class="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                HISTORY
              </span>
            </button>
          </div>
        </div>

        <!-- Search & Pagination Controls -->
        <div class="px-6 py-4 flex items-center justify-between">
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search"
              class="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>

          <!-- Pagination controls -->
          <div class="flex items-center gap-4 text-sm text-text-light">
            <div class="flex items-center gap-2">
              <span>Items per page</span>
              <select class="border border-border rounded px-2 py-1 text-sm bg-white">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <span>1 - 10 of 584</span>
            <div class="flex items-center gap-1">
              <button class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 text-text-light cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
              </button>
              <button class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 text-text-light cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 text-text-light cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
              <button class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 text-text-light cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-primary text-white">
                <th class="text-left px-6 py-3 font-semibold">Consent ID</th>
                <th class="text-left px-6 py-3 font-semibold">Customer Name</th>
                <th class="text-left px-6 py-3 font-semibold">TPP Name</th>
                <th class="text-left px-6 py-3 font-semibold">Created On</th>
                <th class="text-left px-6 py-3 font-semibold">Expires On</th>
                <th class="text-left px-6 py-3 font-semibold">Status</th>
                <th class="text-left px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              @for (consent of consents; track consent.id) {
                <tr class="border-b border-border hover:bg-gray-50/50 transition-colors">
                  <td class="px-6 py-3">
                    <a [routerLink]="['/consents', consent.id]" class="text-info hover:underline cursor-pointer">
                      {{ consent.consentId }}
                    </a>
                  </td>
                  <td class="px-6 py-3 text-text">{{ consent.customerName }}</td>
                  <td class="px-6 py-3 text-text">{{ consent.tppName }}</td>
                  <td class="px-6 py-3 text-text-light">{{ consent.createdOn }}</td>
                  <td class="px-6 py-3 text-text-light">{{ consent.expiresOn }}</td>
                  <td class="px-6 py-3">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      [class]="getStatusClass(consent.status)"
                    >
                      {{ consent.status }}
                    </span>
                  </td>
                  <td class="px-6 py-3">
                    <button class="text-primary hover:text-primary-dark cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class ConsentListComponent {
    activeTab = 'current';

    consents = [
        {
            id: '1',
            consentId: 'b127XXXXXXXXX8b04',
            customerName: '-',
            tppName: 'TPP Client Test',
            createdOn: '2026-02-18T06:53:01.901',
            expiresOn: '2026-12-29T23:00:00',
            status: 'AwaitingAuthorization'
        },
        {
            id: '2',
            consentId: '7b64XXXXXXXX1277',
            customerName: 'AZIZ ELGOUZOULI',
            tppName: 'TPP Client Test',
            createdOn: '2026-02-18T06:22:05.23',
            expiresOn: '2026-12-29T23:00:00',
            status: 'Authorized'
        },
        {
            id: '3',
            consentId: 's99cXXXXXXXXa351',
            customerName: '-',
            tppName: 'TPP Client Test',
            createdOn: '2026-02-18T06:48:49.781',
            expiresOn: '2026-12-28T23:00:00',
            status: 'AwaitingAuthorization'
        },
        {
            id: '4',
            consentId: '9fe8XXXXXXXX4291',
            customerName: 'MAJED SAIF MAJED RAS...',
            tppName: 'TPP Client Test',
            createdOn: '2026-02-18T06:45:02.181',
            expiresOn: '2026-12-28T23:00:00',
            status: 'AwaitingAuthorization'
        },
        {
            id: '5',
            consentId: 'c16eXXXXXXXX8b31',
            customerName: 'Martino Giovanni Picotti',
            tppName: 'TPP Client Test',
            createdOn: '2026-02-18T06:17:09.971',
            expiresOn: '2026-12-28T23:00:00',
            status: 'Authorized'
        },
        {
            id: '6',
            consentId: '6797XXXXXXXXa01e',
            customerName: 'Martino Giovanni Picotti',
            tppName: 'TPP Client Test',
            createdOn: '2026-02-18T06:15:45.672',
            expiresOn: '2026-12-28T23:00:00',
            status: 'Authorized'
        }
    ];

    getStatusClass(status: string): string {
        switch (status) {
            case 'Authorized':
                return 'bg-green-100 text-green-800';
            case 'AwaitingAuthorization':
                return 'bg-amber-100 text-amber-800';
            case 'Revoked':
                return 'bg-red-100 text-red-800';
            case 'Expired':
                return 'bg-orange-100 text-orange-800';
            case 'Suspended':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    }
}
