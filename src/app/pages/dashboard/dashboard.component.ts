import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [StatsCardComponent],
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-primary">Dashboard</h1>
      </div>

      <!-- Stats Cards Row -->
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        <app-stats-card title="ACTIVE CONSENTS" count="527" iconType="chart" iconBgColor="bg-[#E0F7FA]" iconColor="text-[#00BCD4]"></app-stats-card>
        <app-stats-card title="REVOKED CONSENTS" count="98" iconType="alert" iconBgColor="bg-[#FFF3E0]" iconColor="text-[#FF9800]"></app-stats-card>
        <app-stats-card title="EXPIRED CONSENTS" count="30469" iconType="time" iconBgColor="bg-[#F3E5F5]" iconColor="text-[#9C27B0]"></app-stats-card>
        <app-stats-card title="SUSPENDED CONSENTS" count="0" iconType="pause" iconBgColor="bg-[#E8EAF6]" iconColor="text-[#3F51B5]"></app-stats-card>
        <app-stats-card title="QUOTES GENERATED" count="2642" iconType="description" iconBgColor="bg-[#E1F5FE]" iconColor="text-[#03A9F4]"></app-stats-card>
      </div>

      <!-- Selectors Row -->
      <div class="flex justify-end gap-4">
        <div class="flex flex-col">
          <label class="text-xs text-text-light mb-1 font-medium">Select Year</label>
          <select class="rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:ring-2 focus:ring-primary/20">
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-xs text-text-light mb-1 font-medium">Select Month</label>
          <select class="rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:ring-2 focus:ring-primary/20">
            <option>February</option>
            <option>January</option>
          </select>
        </div>
      </div>

      <!-- First Charts Row -->
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <!-- Consent Analysis - Overview -->
        <div class="h-[300px] w-full rounded-[20px] bg-white p-4 shadow-sm">
          <div class="mb-4 flex items-center justify-between px-2">
            <h4 class="text-lg font-bold text-primary">Consent Analysis - Overview</h4>
          </div>
          <div class="h-[220px] w-full flex justify-center">
            <canvas #consentDonut></canvas>
          </div>
        </div>

        <!-- TPP - Wise Consent Requests -->
        <div class="h-[300px] w-full rounded-[20px] bg-white p-4 shadow-sm">
          <div class="mb-4 flex items-center justify-between px-2">
            <h4 class="text-lg font-bold text-primary">TPP - Wise Consent Requests</h4>
          </div>
          <div class="h-[220px] w-full flex justify-center">
            <canvas #tppBar></canvas>
          </div>
        </div>
      </div>

      <!-- Second Charts Row -->
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <!-- Quote Generation -->
        <div class="lg:col-span-1 h-[300px] w-full rounded-[20px] bg-white p-4 shadow-sm">
          <div class="mb-4 flex items-center justify-between px-2">
            <h4 class="text-lg font-bold text-primary">Quote Generation - Quote Acceptance(Monthly)</h4>
          </div>
          <div class="h-[220px] w-full flex justify-center">
             <canvas #quoteBar></canvas>
          </div>
        </div>

        <!-- Consents Distribution by LOB -->
        <div class="lg:col-span-1 h-[300px] w-full rounded-[20px] bg-white p-4 shadow-sm">
          <div class="mb-4 flex items-center justify-between px-2">
            <h4 class="text-lg font-bold text-primary">Consents Distribution by LOB</h4>
          </div>
          <div class="h-[220px] w-full flex justify-center">
            <canvas #lobPie></canvas>
          </div>
          <div class="text-center mt-[-10px]">
            <a class="text-xs text-info underline cursor-pointer">View</a>
          </div>
        </div>

        <!-- API Success Rate -->
        <div class="lg:col-span-1 h-[300px] w-full rounded-[20px] bg-white p-4 shadow-sm">
          <div class="mb-4 flex items-center justify-between px-2">
            <h4 class="text-lg font-bold text-primary">API Success Rate</h4>
          </div>
          <div class="h-[220px] w-full flex justify-center">
            <canvas #apiPie></canvas>
          </div>
           <div class="text-center mt-[-10px]">
            <a class="text-xs text-info underline cursor-pointer">View</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('consentDonut') consentDonutRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tppBar') tppBarRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('quoteBar') quoteBarRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lobPie') lobPieRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('apiPie') apiPieRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.createConsentDonut();
    this.createTppBar();
    this.createQuoteBar();
    this.createLobPie();
    this.createApiPie();
  }

  private createConsentDonut() {
    const ctx = this.consentDonutRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Authorized', 'Revoked', 'Suspended', 'Awaiting', 'Rejected', 'Expired'],
        datasets: [{
          data: [400, 300, 100, 200, 200, 50],
          backgroundColor: ['#66CDCC', '#F56565', '#A0AEC0', '#2B3674', '#FF4D4D', '#F5A623'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 10, usePointStyle: true, pointStyle: 'rectRounded', boxWidth: 8, font: { size: 10, family: 'Inter' } }
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#1e2a5a',
            bodyColor: '#1e2a5a',
            borderColor: '#e5e9f0',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            usePointStyle: true
          }
        },
        layout: { padding: 0 }
      }
    });
  }

  private createTppBar() {
    const ctx = this.tppBarRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['TPP Client Test', 'TPP A', 'TPP B'],
        datasets: [
          { label: 'Generated', data: [370, 50, 30], backgroundColor: '#6AD2FF', borderRadius: 5, barPercentage: 0.6, categoryPercentage: 0.8 },
          { label: 'Accepted', data: [280, 20, 10], backgroundColor: '#F56565', borderRadius: 5, barPercentage: 0.6, categoryPercentage: 0.8 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 10, usePointStyle: true, pointStyle: 'circle', font: { size: 10, family: 'Inter' } } }
        },
        scales: {
          y: { beginAtZero: true, max: 380, ticks: { stepSize: 95, font: { size: 10 }, color: '#A0AEC0' }, grid: { color: '#E0E0E0', drawTicks: false } },
          x: { ticks: { font: { size: 10 }, color: '#A0AEC0' }, grid: { display: false } }
        }
      }
    });
  }

  private createQuoteBar() {
    const ctx = this.quoteBarRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          { label: 'Quote Generation', data: [100, 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: '#4318FF', borderRadius: 4, barPercentage: 0.6 },
          { label: 'Quote Acceptance', data: [80, 290, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: '#6AD2FF', borderRadius: 4, barPercentage: 0.6 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', align: 'end', labels: { usePointStyle: true, pointStyle: 'circle', font: { size: 9, family: 'Inter' } } }
        },
        scales: {
          y: { beginAtZero: true, ticks: { display: false }, grid: { display: false } },
          x: { ticks: { font: { size: 8 }, color: '#A0AEC0' }, grid: { display: false } }
        }
      }
    });
  }

  private createLobPie() {
    const ctx = this.lobPieRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['MOTOR', 'MEDICAL', 'TRAVEL', 'HOME'],
        datasets: [{
          data: [65, 5, 25, 5],
          backgroundColor: ['#6AD2FF', '#E0E0E0', '#05CD99', '#2B3674'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 10, usePointStyle: true, pointStyle: 'rectRounded', font: { size: 10, family: 'Inter' } } }
        }
      }
    });
  }

  private createApiPie() {
    const ctx = this.apiPieRef.nativeElement.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Success (94.2%)', 'Failure (5.8%)'],
        datasets: [{
          data: [94.2, 5.8],
          backgroundColor: ['#05CD99', '#EE5D50'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 10, usePointStyle: true, pointStyle: 'rectRounded', font: { size: 10, family: 'Inter' } } }
        }
      }
    });
  }
}
