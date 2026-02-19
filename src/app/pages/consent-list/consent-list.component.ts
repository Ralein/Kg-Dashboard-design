import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, FileCheck, ClipboardList, Filter, Download, Eye, RotateCcw, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-angular';

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
  imports: [RouterLink, CommonModule, FormsModule, NgClass, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div>
        <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">Consent Management</h1>
        <p class="text-[#A3AED0] text-sm font-medium">Manage and monitor all active and historical consents</p>
      </div>

      <!-- Main Content Card -->
      <div class="chart-shell p-0 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[600px] flex flex-col">
        
        <!-- Tabs & Filters Row -->
        <div class="p-6 pb-0 border-b border-gray-100/50">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <!-- Tabs -->
            <div class="flex border-b border-gray-100">
              <button 
                (click)="switchTab('current')"
                class="px-8 py-3 text-sm font-bold transition-all relative"
                [class.text-[#4318FF]]="activeTab === 'current'"
                [class.text-[#A3AED0]]="activeTab !== 'current'"
              >
                <span class="flex items-center gap-2">
                   <lucide-icon [img]="FileCheck" class="w-4 h-4"></lucide-icon>
                   CURRENT
                </span>
                <div *ngIf="activeTab === 'current'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full"></div>
              </button>
              <button 
                (click)="switchTab('history')"
                class="px-8 py-3 text-sm font-bold transition-all relative"
                [class.text-[#4318FF]]="activeTab === 'history'"
                [class.text-[#A3AED0]]="activeTab !== 'history'"
              >
                <span class="flex items-center gap-2">
                   <lucide-icon [img]="ClipboardList" class="w-4 h-4"></lucide-icon>
                   HISTORY
                </span>
                <div *ngIf="activeTab === 'history'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full"></div>
              </button>
            </div>

            <!-- Toolbar -->
            <div class="flex items-center gap-3 w-full md:w-auto">
              <div class="relative flex-1 md:w-64">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                <input 
                  type="text" 
                  [(ngModel)]="searchQuery"
                  placeholder="Search Consents..." 
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs"
                >
              </div>
              <div class="flex items-center gap-2 bg-gray-50/50 p-1 rounded-lg">
                <span class="text-[10px] font-bold text-[#A3AED0] px-2">Items per page:</span>
                <select [(ngModel)]="itemsPerPage" class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-4">
                  <option [value]="10">10</option>
                  <option [value]="25">25</option>
                  <option [value]="50">50</option>
                </select>
              </div>
              <button class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
                <lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon>
              </button>
              <button class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
                <lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Area -->
        <div class="flex-1 overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-50 bg-gray-50/30">
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Consent ID</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Customer Name</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">TPP Name</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Created On</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Expires On</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50/50">
              <tr *ngFor="let consent of pagedConsents; let i = index" class="hover:bg-gray-50/40 transition-colors group">
                <td class="px-6 py-4">
                  <span [routerLink]="['/consents', consent.id]" class="text-xs font-bold text-[#4318FF] hover:underline cursor-pointer">{{consent.consentId.substring(0, 12)}}...</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs font-medium text-[#2B3674]">{{consent.customerName === '-' ? '—' : consent.customerName}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs font-medium text-[#2B3674]">{{consent.tppName}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{formatDate(consent.createdOn)}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{formatDate(consent.expiresOn)}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-md" [ngClass]="getStatusClass(consent.status)">
                    {{getStatusLabel(consent.status)}}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button class="p-2 rounded-lg bg-gray-100/50 text-[#A3AED0] hover:bg-[#4318FF] hover:text-white transition-all transform group-hover:scale-110 active:scale-95 shadow-sm">
                      <lucide-icon [img]="RotateCcw" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                    <button [routerLink]="['/consents', consent.id]" class="p-2 rounded-lg bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform group-hover:scale-110 active:scale-95 shadow-sm">
                      <lucide-icon [img]="Eye" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div *ngIf="!loading && filteredConsents.length === 0" class="flex flex-col items-center justify-center py-20 opacity-40">
            <lucide-icon [img]="Search" class="w-12 h-12 mb-4"></lucide-icon>
            <p class="text-sm font-bold">No consents found for the selected criteria</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <span class="text-xs font-semibold text-[#A3AED0]">
            Showing <span class="text-[#2B3674]">1 – {{pagedConsents.length}}</span> of <span class="text-[#2B3674]">{{filteredConsents.length}}</span>
          </span>
          <div class="flex items-center gap-1">
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronsLeft" class="w-4 h-4"></lucide-icon></button>
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronLeft" class="w-4 h-4"></lucide-icon></button>
             <div class="flex items-center mx-2 overflow-hidden rounded-lg border border-gray-100">
               <button class="w-8 h-8 flex items-center justify-center text-xs font-bold bg-[#4318FF] text-white">1</button>
               <button class="w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-gray-50">2</button>
             </div>
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronRight" class="w-4 h-4"></lucide-icon></button>
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronsRight" class="w-4 h-4"></lucide-icon></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ConsentListComponent implements OnInit {

  private route = inject(ActivatedRoute);

  activeTab = 'current';
  searchQuery = '';
  itemsPerPage = 10;
  loading = false;
  hoveredRow: string | null = null;

  readonly columns = ['Consent ID', 'Customer', 'TPP', 'Created', 'Expires', 'Status', 'Action'];

  readonly Search = Search;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly RotateCcw = RotateCcw;
  readonly ChevronRight = ChevronRight;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronsRight = ChevronsRight;
  readonly ChevronsLeft = ChevronsLeft;
  readonly FileCheck = FileCheck;
  readonly ClipboardList = ClipboardList;

  readonly paginationBtns = [
    { label: 'First', p1: '11 17 6 12 11 7', p2: '18 17 13 12 18 7' },
    { label: 'Previous', p1: '15 18 9 12 15 6', p2: '' },
    { label: 'Next', p1: '9 18 15 12 9 6', p2: '' },
    { label: 'Last', p1: '13 17 18 12 13 7', p2: '6 17 11 12 6 7' },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
      }
    });
  }

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
      Authorized: 'bg-[#05CD99]/10 text-[#05CD99]',
      AwaitingAuthorization: 'bg-[#FF8F0C]/10 text-[#FF8F0C]',
      Revoked: 'bg-[#FF5252]/10 text-[#FF5252]',
      Expired: 'bg-[#A3AED0]/10 text-[#A3AED0]',
      Suspended: 'bg-gray-100 text-[#2B3674]',
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