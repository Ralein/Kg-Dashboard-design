import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <style>
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes rowIn {
        from { opacity: 0; transform: translateX(-8px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes skeletonPulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.4; }
      }
      @keyframes dotPing {
        0%   { transform: scale(1); opacity: 1; }
        75%  { transform: scale(2.4); opacity: 0; }
        100% { transform: scale(2.4); opacity: 0; }
      }

      .fade-up  { animation: fadeUp 0.4s cubic-bezier(.22,1,.36,1) both; }
      .row-in   { animation: rowIn  0.32s cubic-bezier(.22,1,.36,1) both; }
      .skeleton { animation: skeletonPulse 1.4s ease-in-out infinite; }

      .tab-indicator {
        position: absolute;
        bottom: -1px;
        height: 2px;
        border-radius: 99px;
        background: var(--color-primary, #1e2a5a);
        transition: left 0.3s cubic-bezier(.22,1,.36,1), width 0.3s cubic-bezier(.22,1,.36,1);
        pointer-events: none;
      }

      .tab-btn { position: relative; transition: color 0.2s; }
      .tab-btn::after {
        content: '';
        position: absolute;
        inset: 2px -4px;
        border-radius: 6px;
        background: rgba(30,42,90,0.05);
        opacity: 0;
        transition: opacity 0.18s;
      }
      .tab-btn:hover::after { opacity: 1; }

      .consent-id-link {
        position: relative;
        display: inline-block;
        transition: color 0.15s;
      }
      .consent-id-link::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0;
        width: 0; height: 1px;
        background: currentColor;
        transition: width 0.2s ease;
      }
      .consent-id-link:hover::after { width: 100%; }

      .search-input { transition: border-color 0.2s, box-shadow 0.2s; }
      .search-input:focus {
        outline: none;
        border-color: #1e2a5a;
        box-shadow: 0 0 0 3px rgba(30,42,90,0.1);
      }

      .page-btn { transition: background 0.15s, color 0.15s, transform 0.15s; }
      .page-btn:hover { background: #f0f4ff; color: #1e2a5a; transform: scale(1.1); }

      .view-btn { transition: background 0.15s, transform 0.15s, box-shadow 0.15s; }
      .view-btn:hover {
        transform: scale(1.14);
        box-shadow: 0 0 0 3px rgba(16,185,129,0.28);
      }

      tr.data-row { transition: background 0.15s; }
      .dot-ping { animation: dotPing 1.8s cubic-bezier(0,0,.2,1) infinite; }
    </style>

    <div class="space-y-6">

      <!-- Page Title -->
      <h1 class="fade-up text-2xl font-bold text-primary" style="animation-delay:0ms">
        Consent Management
      </h1>

      <!-- Card -->
      <div
        class="fade-up bg-card rounded-xl border border-border overflow-hidden"
        style="animation-delay:60ms; box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 18px rgba(30,42,90,.05)"
      >

        <!-- Tabs -->
        <div class="border-b border-border px-6 pt-4">
          <div class="relative flex gap-0">
            <div
              class="tab-indicator"
              [style.left]="activeTab === 'current' ? '0px' : '130px'"
              [style.width]="activeTab === 'current' ? '122px' : '118px'"
            ></div>

            <button
              (click)="switchTab('current')"
              class="tab-btn pb-3 pr-10 text-sm font-semibold cursor-pointer flex items-center gap-2"
              [class.text-primary]="activeTab === 'current'"
              [class.text-text-light]="activeTab !== 'current'"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                class="transition-transform duration-200"
                [style.transform]="activeTab === 'current' ? 'rotate(0deg)' : 'rotate(-8deg)'">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              CURRENT
            </button>

            <button
              (click)="switchTab('history')"
              class="tab-btn pb-3 pr-10 text-sm font-semibold cursor-pointer flex items-center gap-2"
              [class.text-primary]="activeTab === 'history'"
              [class.text-text-light]="activeTab !== 'history'"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                class="transition-transform duration-200"
                [style.transform]="activeTab === 'history' ? 'rotate(0deg)' : 'rotate(8deg)'">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              HISTORY
            </button>
          </div>
        </div>

        <!-- Controls -->
        <div class="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search consents…"
              class="search-input pl-9 pr-8 py-2 border border-border rounded-lg text-sm w-64 bg-gray-50/60"
            />
            @if (searchQuery) {
              <button
                (click)="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text text-xs transition-colors"
              >✕</button>
            }
          </div>

          <!-- Pagination -->
          <div class="flex items-center gap-4 text-sm text-text-light">
            <div class="flex items-center gap-2">
              <span>Items per page</span>
              <select
                [(ngModel)]="itemsPerPage"
                class="border border-border rounded-md px-2 py-1 text-sm bg-white cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              >
                <option [value]="10">10</option>
                <option [value]="25">25</option>
                <option [value]="50">50</option>
              </select>
            </div>

            <span class="tabular-nums">
              1 – {{ filteredConsents.length > itemsPerPage ? itemsPerPage : filteredConsents.length }}
              of {{ consents.length }}
            </span>

            <div class="flex items-center gap-1">
              @for (btn of paginationBtns; track btn.label) {
                <button
                  class="page-btn w-7 h-7 rounded-md border border-border flex items-center justify-center cursor-pointer"
                  [attr.aria-label]="btn.label"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline [attr.points]="btn.p1"/>
                    @if (btn.p2) { <polyline [attr.points]="btn.p2"/> }
                  </svg>
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-primary text-white">
                @for (col of columns; track col) {
                  <th class="text-left px-6 py-3.5 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                    {{ col }}
                  </th>
                }
              </tr>
            </thead>
            <tbody>

              <!-- Skeleton -->
              @if (loading) {
                @for (s of [1,2,3,4,5,6]; track s) {
                  <tr class="border-b border-border">
                    @for (w of skeletonWidths; track w) {
                      <td class="px-6 py-3.5">
                        <div class="h-3 rounded-full bg-gray-100 skeleton"
                          [style.width.px]="w"
                          [style.animation-delay]="(s * 80) + 'ms'">
                        </div>
                      </td>
                    }
                  </tr>
                }
              }

              <!-- Data rows -->
              @if (!loading) {
                @for (consent of pagedConsents; track consent.id; let i = $index) {
                  <tr
                    class="data-row border-b border-border row-in"
                    [style.animation-delay]="(i * 50) + 'ms'"
                    [style.background]="hoveredRow === consent.id ? '#f8faff' : 'transparent'"
                    (mouseenter)="hoveredRow = consent.id"
                    (mouseleave)="hoveredRow = null"
                  >
                    <td class="px-6 py-3.5">
                      <a
                        [routerLink]="['/consents', consent.id]"
                        class="consent-id-link text-info font-mono text-xs font-semibold tracking-wide"
                      >{{ consent.consentId }}</a>
                    </td>

                    <td class="px-6 py-3.5 font-medium"
                      [class.text-text]="consent.customerName !== '-'"
                      [class.text-gray-300]="consent.customerName === '-'"
                    >{{ consent.customerName === '-' ? '—' : consent.customerName }}</td>

                    <td class="px-6 py-3.5 text-text-light">{{ consent.tppName }}</td>

                    <td class="px-6 py-3.5 text-text-light font-mono text-xs whitespace-nowrap">
                      {{ formatDate(consent.createdOn) }}
                    </td>

                    <td class="px-6 py-3.5 text-text-light font-mono text-xs whitespace-nowrap">
                      {{ formatDate(consent.expiresOn) }}
                    </td>

                    <td class="px-6 py-3.5 whitespace-nowrap">
                      <span
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1"
                        [ngClass]="getStatusClass(consent.status)"
                      >
                        <span class="relative flex h-1.5 w-1.5">
                          @if (consent.status === 'Authorized') {
                            <span class="dot-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
                          }
                          <span class="relative inline-flex h-1.5 w-1.5 rounded-full" [ngClass]="getStatusDot(consent.status)"></span>
                        </span>
                        {{ getStatusLabel(consent.status) }}
                      </span>
                    </td>

                    <td class="px-6 py-3.5">
                      <a [routerLink]="['/consents', consent.id]">
                        <button
                          class="view-btn flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500 text-white cursor-pointer"
                          aria-label="View"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                      </a>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>

          <!-- Empty state -->
          @if (!loading && filteredConsents.length === 0) {
            <div class="fade-up flex flex-col items-center gap-3 py-16 text-text-muted">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="opacity-25">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p class="text-sm font-medium">No consents match your search</p>
              <button (click)="searchQuery = ''" class="text-xs text-info hover:underline">Clear search</button>
            </div>
          }
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ConsentListComponent {

  activeTab    = 'current';
  searchQuery  = '';
  itemsPerPage = 10;
  loading      = false;
  hoveredRow: string | null = null;

  readonly columns = ['Consent ID', 'Customer Name', 'TPP Name', 'Created On', 'Expires On', 'Status', 'Action'];
  readonly skeletonWidths = [130, 155, 115, 145, 145, 90, 50];

  readonly paginationBtns = [
    { label: 'First',    p1: '11 17 6 12 11 7',  p2: '18 17 13 12 18 7' },
    { label: 'Previous', p1: '15 18 9 12 15 6',   p2: '' },
    { label: 'Next',     p1: '9 18 15 12 9 6',    p2: '' },
    { label: 'Last',     p1: '13 17 18 12 13 7',  p2: '6 17 11 12 6 7' },
  ];

  consents: Consent[] = [
    { id: '1', consentId: 'b127XXXXXXXXX8b04', customerName: '-',                        tppName: 'TPP Client Test', createdOn: '2026-02-18T06:53:01.901', expiresOn: '2026-12-29T23:00:00', status: 'AwaitingAuthorization' },
    { id: '2', consentId: '7b64XXXXXXXX1277',  customerName: 'AZIZ ELGOUZOULI',          tppName: 'TPP Client Test', createdOn: '2026-02-18T06:22:05.23',  expiresOn: '2026-12-29T23:00:00', status: 'Authorized'           },
    { id: '3', consentId: 's99cXXXXXXXXa351',  customerName: '-',                        tppName: 'TPP Client Test', createdOn: '2026-02-18T06:48:49.781', expiresOn: '2026-12-28T23:00:00', status: 'AwaitingAuthorization' },
    { id: '4', consentId: '9fe8XXXXXXXX4291',  customerName: 'MAJED SAIF MAJED RAS...',  tppName: 'TPP Client Test', createdOn: '2026-02-18T06:45:02.181', expiresOn: '2026-12-28T23:00:00', status: 'AwaitingAuthorization' },
    { id: '5', consentId: 'c16eXXXXXXXX8b31',  customerName: 'Martino Giovanni Picotti', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:17:09.971', expiresOn: '2026-12-28T23:00:00', status: 'Authorized'           },
    { id: '6', consentId: '6797XXXXXXXXa01e',  customerName: 'Martino Giovanni Picotti', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:15:45.672', expiresOn: '2026-12-28T23:00:00', status: 'Authorized'           },
    { id: '7', consentId: '3f12XXXXXXXXcc91',  customerName: 'JOHN DOE',                 tppName: 'TPP Client Test', createdOn: '2026-02-17T14:30:00.000', expiresOn: '2026-11-30T23:00:00', status: 'Revoked'              },
    { id: '8', consentId: '8a44XXXXXXXXdd02',  customerName: 'SARA ALI',                 tppName: 'TPP Client Test', createdOn: '2026-02-17T11:00:00.000', expiresOn: '2026-10-15T23:00:00', status: 'Expired'              },
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
      return new Date(iso).toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch { return iso; }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Authorized:            'bg-emerald-50 text-emerald-700 ring-emerald-200',
      AwaitingAuthorization: 'bg-amber-50   text-amber-700  ring-amber-200',
      Revoked:               'bg-red-50     text-red-700    ring-red-200',
      Expired:               'bg-orange-50  text-orange-700 ring-orange-200',
      Suspended:             'bg-gray-100   text-gray-600   ring-gray-300',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600 ring-gray-300';
  }

  getStatusDot(status: string): string {
    const map: Record<string, string> = {
      Authorized:            'bg-emerald-500',
      AwaitingAuthorization: 'bg-amber-400',
      Revoked:               'bg-red-500',
      Expired:               'bg-orange-400',
      Suspended:             'bg-gray-400',
    };
    return map[status] ?? 'bg-gray-400';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      Authorized:            'Authorized',
      AwaitingAuthorization: 'Awaiting Auth.',
      Revoked:               'Revoked',
      Expired:               'Expired',
      Suspended:             'Suspended',
    };
    return map[status] ?? status;
  }
}