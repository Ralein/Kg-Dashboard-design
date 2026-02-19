import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { ChartCardComponent } from '../../components/charts/chart-card.component';
import { ConsentAnalysisChartComponent } from '../../components/charts/consent-analysis-chart.component';
import { TppRequestsChartComponent } from '../../components/charts/tpp-requests-chart.component';
import { QuoteTrafficChartComponent } from '../../components/charts/quote-traffic-chart.component';
import { QuoteStatusChartComponent } from '../../components/charts/quote-status-chart.component';
import { QuoteLobChartComponent } from '../../components/charts/quote-lob-chart.component';
import { ApiSuccessChartComponent } from '../../components/charts/api-success-chart.component';
import { LobDistributionChartComponent } from '../../components/charts/lob-distribution-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatsCardComponent,
    ChartCardComponent,
    ConsentAnalysisChartComponent,
    TppRequestsChartComponent,
    QuoteTrafficChartComponent,
    QuoteStatusChartComponent,
    QuoteLobChartComponent,
    ApiSuccessChartComponent,
    LobDistributionChartComponent
  ],
  styles: [`
    :host { 
        display: block;
        --primary: #4318FF; 
        --accent: #05CD99; 
        --warning: #FF8F0C; 
        --navy: #2B3674; 
    }
  `],
  template: `
    <div class="flex flex-col gap-6 p-4">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
        <div>
          <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">System Oversight</h1>
          <p class="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Operational Dynamics & Metrics</p>
        </div>
        <div class="flex items-center gap-2 premium-glass p-2 rounded-2xl shadow-sm">
          <select class="glass-input border-none bg-transparent hover:bg-slate-50 cursor-pointer">
            <option>FY 2026</option><option>FY 2025</option>
          </select>
          <div class="w-px h-8 bg-slate-200/60"></div>
          <select class="glass-input border-none bg-transparent hover:bg-slate-50 cursor-pointer">
            <option>February</option><option>January</option>
          </select>
          <button 
            (click)="refresh()" 
            class="btn-primary ml-2 py-2 min-w-[100px] flex items-center justify-center gap-2 transition-all duration-300"
            [class.opacity-75]="isRefreshing()"
            [disabled]="isRefreshing()">
            @if (isRefreshing()) {
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>...</span>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>REFRESH</span>
            }
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <app-stats-card title="Active Consents"    count="527"    iconType="chart"       iconBgColor="bg-indigo-100" iconColor="text-indigo-600" [loading]="isLoading()" animDelay="0ms"></app-stats-card>
        <app-stats-card title="Revoked"           count="98"     iconType="alert"       iconBgColor="bg-orange-100" iconColor="text-orange-600" [loading]="isLoading()" animDelay="50ms"></app-stats-card>
        <app-stats-card title="Expired"           count="30469"  iconType="time"        iconBgColor="bg-purple-100" iconColor="text-purple-600" [loading]="isLoading()" animDelay="100ms"></app-stats-card>
        <app-stats-card title="Suspended"         count="0"      iconType="pause"       iconBgColor="bg-gray-100"   iconColor="text-gray-600"   [loading]="isLoading()" animDelay="150ms"></app-stats-card>
        <app-stats-card title="Quotes"            count="2642"   iconType="description" iconBgColor="bg-emerald-100" iconColor="text-emerald-600" [loading]="isLoading()" animDelay="200ms"></app-stats-card>
      </div>

      <!-- Row 1: Consent & TPP -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <app-chart-card title="Consent Analysis" subtitle="Radial breakdown by authorization status" [dark]="true" [showLive]="true" delay="100ms">
            @if (isLoading()) {
                <div class="animate-pulse flex space-x-4 h-full items-center justify-center">
                    <div class="rounded-full bg-slate-700 h-40 w-40"></div>
                </div>
            } @else {
                <app-consent-analysis-chart [data]="consentData"></app-consent-analysis-chart>
            }
        </app-chart-card>

        <app-chart-card title="TPP Wise Consent Requests" subtitle="Lollipop distribution by client platform" [dark]="true" delay="200ms">
             @if (isLoading()) {
                <div class="animate-pulse space-y-4 p-4">
                    <div class="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div class="h-4 bg-slate-700 rounded w-1/2"></div>
                    <div class="h-4 bg-slate-700 rounded w-5/6"></div>
                </div>
            } @else {
                <app-tpp-requests-chart [data]="tppData"></app-tpp-requests-chart>
            }
        </app-chart-card>
      </div>

      <!-- Row 2: Quotes Deep-dive -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <app-chart-card title="Quote Traffic" subtitle="Monthly Generation vs Acceptance trends" [dark]="true" delay="300ms">
            <div header-actions class="flex items-center gap-4 mr-2">
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#7C5CFF]"></span><span class="text-[10px] text-white/50 font-bold">GEN</span></div>
                <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#05CD99]"></span><span class="text-[10px] text-white/50 font-bold">ACC</span></div>
            </div>
            <app-quote-traffic-chart></app-quote-traffic-chart>
        </app-chart-card>

        <app-chart-card title="Quote Status" subtitle="Distribution of quotes across states" [dark]="true" delay="400ms" [showFooter]="true">
            <app-quote-status-chart [data]="quoteStatusData"></app-quote-status-chart>
            <div footer class="flex justify-center gap-4">
                @for (item of quoteStatusData; track item.label) {
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full" [style.background]="item.color" [style.box-shadow]="'0 0 6px '+item.color"></span>
                        <span class="text-[10px] text-white/40 font-bold uppercase">{{ item.label }}</span>
                        <span class="text-xs text-white font-black">{{ item.value }}</span>
                    </div>
                }
            </div>
        </app-chart-card>

        <app-chart-card title="Quote LOB" subtitle="Volume breakdown by Business Line" [dark]="true" delay="500ms">
            <app-quote-lob-chart [data]="quoteLobData"></app-quote-lob-chart>
        </app-chart-card>
      </div>

      <!-- Row 3: LOB & API -->
      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <app-chart-card title="LOB Distribution" subtitle="Portfolio weight by Line of Business" delay="600ms" height="360px">
            <app-lob-distribution-chart [data]="lobLegend"></app-lob-distribution-chart>
        </app-chart-card>

        <app-chart-card title="API Success Rate" subtitle="Real-time healthy check · SLA 99.9%" [dark]="true" delay="700ms" height="360px">
            <div header-actions class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mr-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[10px] font-black text-emerald-500 tracking-widest">HEALTHY</span>
            </div>
            <app-api-success-chart></app-api-success-chart>
            <div footer class="grid grid-cols-2 gap-4">
                <div class="rounded-2xl p-4 bg-emerald-500/5 border border-emerald-500/10 text-center">
                    <div class="text-2xl font-black text-emerald-400">94.2%</div>
                    <div class="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">SUCCESS</div>
                </div>
                <div class="rounded-2xl p-4 bg-red-500/5 border border-red-500/10 text-center">
                    <div class="text-2xl font-black text-red-400">5.8%</div>
                    <div class="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">FAILURE</div>
                </div>
            </div>
        </app-chart-card>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  isLoading = signal(true);
  isRefreshing = signal(false);

  refresh() {
    this.isRefreshing.set(true);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.isRefreshing.set(false);
    }, 1500);
  }

  consentData = [
    { label: 'Authorized', value: 350, total: 700, color: '#7C5CFF' },
    { label: 'Revoked', value: 120, total: 700, color: '#FF5252' },
    { label: 'Suspended', value: 80, total: 700, color: '#A3AED0' },
    { label: 'Awaiting', value: 50, total: 700, color: '#6AD2FF' },
    { label: 'Rejected', value: 60, total: 700, color: '#FF8F0C' },
    { label: 'Expired', value: 40, total: 700, color: '#FFCA28' },
  ];

  tppData = [
    { label: 'TPP Client Test', authorized: 360, revoked: 50, rejected: 40, total: 510, color: '#7C5CFF', active: true },
    { label: 'Open Finance Corp', authorized: 210, revoked: 30, rejected: 28, total: 318, color: '#05CD99', active: true },
    { label: 'FinBridge API', authorized: 120, revoked: 22, rejected: 18, total: 195, color: '#6AD2FF', active: true },
    { label: 'DataShare Ltd', authorized: 40, revoked: 15, rejected: 12, total: 87, color: '#FF8F0C', active: false },
  ];

  quoteStatusData = [
    { label: 'Pending', value: 286, color: '#6AD2FF' },
    { label: 'Available', value: 139, color: '#A3AED0' },
    { label: 'Expired', value: 75, color: '#05CD99' },
  ];

  quoteLobData = [
    { label: 'Health', value: 185, max: 200, color: '#05CD99' },
    { label: 'Home', value: 96, max: 200, color: '#A3AED0' },
    { label: 'Motor', value: 185, max: 200, color: '#6AD2FF' },
    { label: 'Travel', value: 73, max: 200, color: '#7C5CFF' },
  ];

  lobLegend = [
    { label: 'MOTOR', value: 65, count: '3,133', color: '#4318FF', gradient: 'linear-gradient(90deg,#4318FF,#6AD2FF)' },
    { label: 'TRAVEL', value: 20, count: '964', color: '#05CD99', gradient: 'linear-gradient(90deg,#05CD99,#00E5B4)' },
    { label: 'MEDICAL', value: 10, count: '482', color: '#FF8F0C', gradient: 'linear-gradient(90deg,#FF8F0C,#FFCA28)' },
    { label: 'HOME', value: 10, count: '241', color: '#2B3674', gradient: 'linear-gradient(90deg,#2B3674,#4318FF)' },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 800);
  }
}