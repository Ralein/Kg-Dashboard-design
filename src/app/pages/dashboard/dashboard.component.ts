import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatsCardComponent, CommonModule, FormsModule],
  template: `
    <style>
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes chartReveal {
        from { opacity: 0; transform: translateY(20px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      .fade-up     { animation: fadeUp     0.45s cubic-bezier(.22,1,.36,1) both; }
      .chart-in    { animation: chartReveal 0.5s  cubic-bezier(.22,1,.36,1) both; }

      /* chart card */
      .chart-card {
        border-radius: 20px;
        background: #fff;
        transition: box-shadow 0.22s, transform 0.22s;
        box-shadow: 0 1px 3px rgba(0,0,0,.05), 0 4px 16px rgba(30,42,90,.05);
        position: relative;
        overflow: hidden;
      }
      .chart-card:hover {
        box-shadow: 0 6px 28px rgba(30,42,90,.12);
        transform: translateY(-2px);
      }

      .chart-title {
        font-size: 13px;
        font-weight: 700;
        color: #1e2a5a;
        line-height: 1.3;
      }

      /* selectors */
      .filter-select {
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .filter-select:focus {
        outline: none;
        border-color: #1e2a5a;
        box-shadow: 0 0 0 3px rgba(30,42,90,.1);
      }

      /* view link */
      .view-link {
        transition: color 0.15s, letter-spacing 0.15s;
        text-decoration: none;
        font-size: 11px;
        color: #4318FF;
        font-weight: 600;
      }
      .view-link:hover { letter-spacing: 0.03em; text-decoration: underline; }

      /* section label */
      .section-label {
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: #b0b9cc;
      }
    </style>

    <div class="flex flex-col gap-6">

      <!-- Header -->
      <div class="fade-up flex items-center justify-between" style="animation-delay:0ms">
        <h1 class="text-2xl font-bold text-primary">Dashboard</h1>
        @if (isLoading()) {
          <div class="skeleton h-4 w-32 rounded"></div>
        } @else {
          <span class="section-label">Overview · Feb 2026</span>
        }
      </div>

      <!-- Stats Cards -->
      <div class="fade-up grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5" style="animation-delay:60ms">
        <app-stats-card title="ACTIVE CONSENTS"    count="527"   iconType="chart"       iconBgColor="bg-[#E0F7FA]" iconColor="text-[#00BCD4]" animDelay="0ms"   [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="REVOKED CONSENTS"   count="98"    iconType="alert"       iconBgColor="bg-[#FFF3E0]" iconColor="text-[#FF9800]" animDelay="60ms"  [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="EXPIRED CONSENTS"   count="30469" iconType="time"        iconBgColor="bg-[#F3E5F5]" iconColor="text-[#9C27B0]" animDelay="120ms" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="SUSPENDED CONSENTS" count="0"     iconType="pause"       iconBgColor="bg-[#E8EAF6]" iconColor="text-[#3F51B5]" animDelay="180ms" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="QUOTES GENERATED"   count="2642"  iconType="description" iconBgColor="bg-[#E1F5FE]" iconColor="text-[#03A9F4]" animDelay="240ms" [loading]="isLoading()"></app-stats-card>
      </div>

      <!-- Filters -->
      <div class="fade-up flex justify-end gap-3" style="animation-delay:100ms">
        @if (isLoading()) {
          <div class="skeleton h-10 w-24 rounded-lg"></div>
          <div class="skeleton h-10 w-32 rounded-lg"></div>
        } @else {
          <div class="flex flex-col gap-1">
            <label class="section-label">Select Year</label>
            <select class="filter-select rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary cursor-pointer">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="section-label">Select Month</label>
            <select class="filter-select rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary cursor-pointer">
              <option>February</option>
              <option>January</option>
            </select>
          </div>
        }
      </div>

      <!-- Skeleton Charts Layout -->
      @if (isLoading()) {
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div class="chart-card p-5 h-[310px] flex flex-col">
             <div class="flex justify-between mb-4">
               <div class="skeleton h-4 w-48 rounded"></div>
             </div>
             <div class="flex-1 flex items-center justify-center">
               <div class="skeleton skeleton-circle h-48 w-48"></div>
             </div>
          </div>
          <div class="chart-card p-5 h-[310px] flex flex-col">
             <div class="flex justify-between mb-4">
               <div class="skeleton h-4 w-48 rounded"></div>
             </div>
             <div class="flex-1 flex items-end justify-center gap-4 px-8 pb-4">
               <div class="skeleton h-32 w-12 rounded-t"></div>
               <div class="skeleton h-48 w-12 rounded-t"></div>
               <div class="skeleton h-24 w-12 rounded-t"></div>
             </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div class="chart-card p-5 h-[310px] flex flex-col">
            <div class="mb-4"><div class="skeleton h-4 w-40 rounded"></div></div>
            <div class="flex-1 skeleton rounded-lg"></div>
          </div>
          <div class="chart-card p-5 h-[310px] flex flex-col">
            <div class="mb-4"><div class="skeleton h-4 w-40 rounded"></div></div>
            <div class="flex-1 flex items-center justify-center">
               <div class="skeleton skeleton-circle h-40 w-40"></div>
            </div>
          </div>
          <div class="chart-card p-5 h-[310px] flex flex-col">
            <div class="mb-4"><div class="skeleton h-4 w-40 rounded"></div></div>
            <div class="flex-1 flex items-center justify-center">
               <div class="skeleton skeleton-circle h-40 w-40"></div>
            </div>
          </div>
        </div>
      } @else {
        <!-- Real Charts -->
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <!-- Consent Analysis -->
          <div class="chart-card chart-in p-5" style="height:310px; animation-delay:140ms">
            <div class="mb-3 flex items-center justify-between">
              <p class="chart-title">Consent Analysis — Overview</p>
            </div>
            <div style="height:240px" class="flex justify-center">
              <canvas #consentDonut></canvas>
            </div>
          </div>

          <!-- TPP Bar -->
          <div class="chart-card chart-in p-5" style="height:310px; animation-delay:190ms">
            <div class="mb-3 flex items-center justify-between">
              <p class="chart-title">TPP — Wise Consent Requests</p>
            </div>
            <div style="height:240px" class="flex justify-center">
              <canvas #tppBar></canvas>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <!-- Quote Bar -->
          <div class="chart-card chart-in p-5 lg:col-span-1" style="height:310px; animation-delay:240ms">
            <div class="mb-3">
              <p class="chart-title">Quote Generation vs Acceptance</p>
              <span class="section-label">Monthly</span>
            </div>
            <div style="height:230px" class="flex justify-center">
              <canvas #quoteBar></canvas>
            </div>
          </div>

          <!-- LOB Pie -->
          <div class="chart-card chart-in p-5 lg:col-span-1" style="height:310px; animation-delay:290ms">
            <div class="mb-3 flex items-center justify-between">
              <p class="chart-title">Consents Distribution by LOB</p>
              <a class="view-link cursor-pointer">View →</a>
            </div>
            <div style="height:240px" class="flex justify-center">
              <canvas #lobPie></canvas>
            </div>
          </div>

          <!-- API Pie -->
          <div class="chart-card chart-in p-5 lg:col-span-1" style="height:310px; animation-delay:340ms">
            <div class="mb-3 flex items-center justify-between">
              <p class="chart-title">API Success Rate</p>
              <a class="view-link cursor-pointer">View →</a>
            </div>
            <div style="height:240px" class="flex justify-center">
              <canvas #apiPie></canvas>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('consentDonut') consentDonutRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tppBar') tppBarRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('quoteBar') quoteBarRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lobPie') lobPieRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('apiPie') apiPieRef!: ElementRef<HTMLCanvasElement>;

  isLoading = signal(true);

  // shared tooltip style
  private readonly tooltip = {
    backgroundColor: '#1e2a5a',
    titleColor: '#fff',
    bodyColor: 'rgba(255,255,255,0.85)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    padding: 10,
    cornerRadius: 8,
    displayColors: true,
    usePointStyle: true,
  };

  private readonly legendLabels = {
    padding: 12,
    usePointStyle: true,
    pointStyle: 'rectRounded' as const,
    boxWidth: 8,
    font: { size: 10, family: 'system-ui' },
    color: '#4a5568',
  };

  ngOnInit(): void {
    // Simulate initial data loading
    setTimeout(() => {
      this.isLoading.set(false);
      // Initialize charts after loading and view update
      setTimeout(() => this.initCharts(), 50);
    }, 1800);
  }

  ngAfterViewInit(): void {
    // Initial charts init moved to ngOnInit after loading
  }

  private initCharts(): void {
    // Stagger chart creation slightly so entrance animations feel sequential
    if (!this.consentDonutRef) return; // Guard against view not ready

    setTimeout(() => this.createConsentDonut(), 100);
    setTimeout(() => this.createTppBar(), 180);
    setTimeout(() => this.createQuoteBar(), 260);
    setTimeout(() => this.createLobPie(), 340);
    setTimeout(() => this.createApiPie(), 420);
  }

  private createConsentDonut(): void {
    if (!this.consentDonutRef?.nativeElement) return;
    const ctx = this.consentDonutRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Authorized', 'Revoked', 'Suspended', 'Awaiting', 'Rejected', 'Expired'],
        datasets: [{
          data: [400, 300, 100, 200, 200, 50],
          backgroundColor: ['#05CD99', '#EE5D50', '#A0AEC0', '#4318FF', '#F56565', '#F5A623'],
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        animation: { animateRotate: true, animateScale: true, duration: 900, easing: 'easeInOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: this.legendLabels },
          tooltip: this.tooltip as any,
        },
      }
    });
  }

  private createTppBar(): void {
    if (!this.tppBarRef?.nativeElement) return;
    const ctx = this.tppBarRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['TPP Client Test', 'TPP A', 'TPP B'],
        datasets: [
          { label: 'Generated', data: [370, 50, 30], backgroundColor: '#6AD2FF', borderRadius: 6, barPercentage: 0.55, categoryPercentage: 0.75 },
          { label: 'Accepted', data: [280, 20, 10], backgroundColor: '#4318FF', borderRadius: 6, barPercentage: 0.55, categoryPercentage: 0.75 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeInOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: { ...this.legendLabels, pointStyle: 'circle' as const } },
          tooltip: this.tooltip as any,
        },
        scales: {
          y: {
            beginAtZero: true, max: 400,
            ticks: { stepSize: 100, font: { size: 10 }, color: '#b0b9cc' },
            grid: { color: '#f0f2f7', drawTicks: false },
            border: { display: false },
          },
          x: {
            ticks: { font: { size: 10 }, color: '#b0b9cc' },
            grid: { display: false },
            border: { display: false },
          }
        }
      }
    });
  }

  private createQuoteBar(): void {
    if (!this.quoteBarRef?.nativeElement) return;
    const ctx = this.quoteBarRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          { label: 'Quote Generation', data: [100, 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: '#4318FF', borderRadius: 4, barPercentage: 0.55 },
          { label: 'Quote Acceptance', data: [80, 290, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: '#6AD2FF', borderRadius: 4, barPercentage: 0.55 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeInOutQuart' },
        plugins: {
          legend: {
            position: 'top', align: 'end',
            labels: { ...this.legendLabels, pointStyle: 'circle' as const, padding: 8 },
          },
          tooltip: this.tooltip as any,
        },
        scales: {
          y: { beginAtZero: true, ticks: { display: false }, grid: { display: false }, border: { display: false } },
          x: { ticks: { font: { size: 8 }, color: '#b0b9cc' }, grid: { display: false }, border: { display: false } }
        }
      }
    });
  }

  private createLobPie(): void {
    if (!this.lobPieRef?.nativeElement) return;
    const ctx = this.lobPieRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['MOTOR', 'MEDICAL', 'TRAVEL', 'HOME'],
        datasets: [{
          data: [65, 5, 25, 5],
          backgroundColor: ['#6AD2FF', '#E0E0E0', '#05CD99', '#1e2a5a'],
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { animateRotate: true, duration: 900, easing: 'easeInOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: this.legendLabels },
          tooltip: this.tooltip as any,
        },
      }
    });
  }

  private createApiPie(): void {
    if (!this.apiPieRef?.nativeElement) return;
    const ctx = this.apiPieRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Success (94.2%)', 'Failure (5.8%)'],
        datasets: [{
          data: [94.2, 5.8],
          backgroundColor: ['#05CD99', '#EE5D50'],
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { animateRotate: true, duration: 900, easing: 'easeInOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: this.legendLabels },
          tooltip: this.tooltip as any,
        },
      }
    });
  }
}