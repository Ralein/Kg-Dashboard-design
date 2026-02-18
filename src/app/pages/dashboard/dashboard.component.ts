import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    imports: [StatsCardComponent],
    template: `
    <div class="space-y-6">
      <!-- Page Title -->
      <h1 class="text-2xl font-bold text-primary">Dashboard</h1>

      <!-- Stats Cards Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <app-stats-card label="ACTIVE CONSENTS" value="527" iconType="chart" iconColor="#2e7d32" iconBg="#e8f5e9" />
        <app-stats-card label="REVOKED CONSENTS" value="98" iconType="alert" iconColor="#1565c0" iconBg="#e3f2fd" />
        <app-stats-card label="EXPIRED CONSENTS" value="30469" iconType="bar" iconColor="#c62828" iconBg="#fce4ec" />
        <app-stats-card label="SUSPENDED CONSENTS" value="0" iconType="bar" iconColor="#e65100" iconBg="#fff3e0" />
        <app-stats-card label="QUOTES GENERATED" value="2642" iconType="message" iconColor="#2e7d32" iconBg="#e8f5e9" />
      </div>

      <!-- Filter Row -->
      <div class="flex justify-end gap-4">
        <div class="flex flex-col">
          <label class="text-xs text-text-light mb-1 font-medium">Select Year</label>
          <select class="border border-border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[140px]">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-xs text-text-light mb-1 font-medium">Select Month</label>
          <select class="border border-border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[140px]">
            <option>February</option>
            <option>January</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-card rounded-xl border border-border p-6">
          <h3 class="text-base font-semibold text-text mb-4">Consent Analysis - Overview</h3>
          <div class="flex justify-center" style="max-height: 350px;">
            <canvas #consentDonut></canvas>
          </div>
        </div>
        <div class="bg-card rounded-xl border border-border p-6">
          <h3 class="text-base font-semibold text-text mb-4">TPP - Wise Consent Requests</h3>
          <div style="max-height: 350px;">
            <canvas #tppBar></canvas>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="bg-card rounded-xl border border-border p-6">
          <h3 class="text-base font-semibold text-text mb-4">Quote Generation - Quote Acceptance(Monthly)</h3>
          <div style="max-height: 300px;">
            <canvas #quoteBar></canvas>
          </div>
        </div>
        <div class="bg-card rounded-xl border border-border p-6">
          <h3 class="text-base font-semibold text-text mb-4">Consents Distribution by LOB</h3>
          <div class="flex justify-center" style="max-height: 280px;">
            <canvas #lobPie></canvas>
          </div>
          <div class="text-center mt-3">
            <a class="text-info text-sm hover:underline cursor-pointer">View</a>
          </div>
        </div>
        <div class="bg-card rounded-xl border border-border p-6">
          <h3 class="text-base font-semibold text-text mb-4">API Success Rate</h3>
          <div class="flex justify-center" style="max-height: 280px;">
            <canvas #apiPie></canvas>
          </div>
          <div class="text-center mt-3">
            <a class="text-info text-sm hover:underline cursor-pointer">View</a>
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
                    data: [527, 98, 0, 50, 30, 30469],
                    backgroundColor: ['#4ecdc4', '#e8868a', '#c5c5c5', '#2c3e6b', '#e74c3c', '#f0b86e'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '55%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 16, usePointStyle: true, pointStyle: 'rect', font: { size: 11, family: 'Inter' } }
                    }
                }
            }
        });
    }

    private createTppBar() {
        const ctx = this.tppBarRef.nativeElement.getContext('2d');
        if (!ctx) return;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['TPP Client Test'],
                datasets: [
                    { label: 'Authorized', data: [350], backgroundColor: '#4ecdc4' },
                    { label: 'Revoked', data: [98], backgroundColor: '#e74c3c' },
                    { label: 'Suspended', data: [0], backgroundColor: '#c5c5c5' },
                    { label: 'Awaiting', data: [50], backgroundColor: '#2c3e6b' },
                    { label: 'Rejected', data: [30], backgroundColor: '#e8868a' },
                    { label: 'Expired', data: [310], backgroundColor: '#f0b86e' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 12, usePointStyle: true, pointStyle: 'rect', font: { size: 11, family: 'Inter' } }
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 400, ticks: { stepSize: 50, font: { size: 11 } }, grid: { color: '#f0f0f0' } },
                    x: { ticks: { font: { size: 11 } }, grid: { display: false } }
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
                    { label: 'Quote Generation', data: [0, 468, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: '#1e3a8a' },
                    { label: 'Quote Acceptance', data: [0, 280, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: '#4ecdc4' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { padding: 16, usePointStyle: true, pointStyle: 'rect', font: { size: 11, family: 'Inter' } }
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 500, ticks: { stepSize: 50, font: { size: 10 } }, grid: { color: '#f0f0f0' } },
                    x: { ticks: { font: { size: 10 } }, grid: { display: false } }
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
                    data: [85, 5, 8, 2],
                    backgroundColor: ['#87ceeb', '#e0e0e0', '#4ecdc4', '#2c3e6b'],
                    borderWidth: 2, borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 12, usePointStyle: true, pointStyle: 'rect', font: { size: 11, family: 'Inter' } }
                    }
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
                    backgroundColor: ['#28a745', '#e74c3c'],
                    borderWidth: 2, borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 12, usePointStyle: true, pointStyle: 'rect', font: { size: 11, family: 'Inter' } }
                    }
                }
            }
        });
    }
}
