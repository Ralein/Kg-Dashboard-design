import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { Chart, registerables, ChartConfiguration } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatsCardComponent, CommonModule, FormsModule],
  template: `
    <div class="flex flex-col gap-8 pb-8">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
           <h1 class="text-3xl font-bold text-primary tracking-tight">Dashboard Overview</h1>
           <p class="text-secondary text-sm mt-1 font-medium">Welcome back, here's what's happening today.</p>
        </div>
        
        @if (isLoading()) {
          <div class="h-10 w-32 bg-white/20 rounded-xl animate-pulse"></div>
        } @else {
          <div class="glass-input px-4 py-2 flex items-center gap-2 text-primary font-bold text-sm">
             <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
             Live Updates
          </div>
        }
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <app-stats-card title="Active Consents"    count="527"   iconType="chart"       iconBgColor="bg-cyan-100" iconColor="text-cyan-600" animDelay="0ms"   [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Revoked Consents"   count="98"    iconType="alert"       iconBgColor="bg-orange-100" iconColor="text-orange-500" animDelay="100ms"  [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Expired Consents"   count="30,469" iconType="time"        iconBgColor="bg-purple-100" iconColor="text-purple-600" animDelay="200ms" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Suspended Consents" count="0"     iconType="pause"       iconBgColor="bg-blue-100" iconColor="text-blue-600" animDelay="300ms" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Quotes Generated"   count="2,642"  iconType="description" iconBgColor="bg-info" iconColor="text-info" animDelay="400ms" [loading]="isLoading()"></app-stats-card>
      </div>

      <!-- Filters Row -->
      <div class="flex justify-end gap-4 animate-spring" style="animation-delay: 200ms">
        @if (isLoading()) {
          <div class="h-10 w-24 bg-white/30 rounded-xl animate-pulse"></div>
          <div class="h-10 w-32 bg-white/30 rounded-xl animate-pulse"></div>
        } @else {
          <div class="relative group">
            <select class="glass-input appearance-none pl-4 pr-10 py-2.5 text-sm font-bold text-primary cursor-pointer hover:bg-white/60">
              <option>2026</option>
              <option>2025</option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </div>
          <div class="relative group">
            <select class="glass-input appearance-none pl-4 pr-10 py-2.5 text-sm font-bold text-primary cursor-pointer hover:bg-white/60">
              <option>February</option>
              <option>January</option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </div>
        }
      </div>

      <!-- Main Charts Layout -->
      @if (isLoading()) {
        <!-- SKELETON LAYOUT -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="glass-card h-[340px] p-6 flex flex-col items-center justify-center">
             <div class="w-32 h-32 rounded-full border-4 border-white/20 animate-spin border-t-accent"></div>
          </div>
          <div class="glass-card h-[340px] p-6 flex items-end justify-center gap-4">
             <div class="w-12 h-32 bg-white/20 rounded-t-lg animate-pulse"></div>
             <div class="w-12 h-48 bg-white/20 rounded-t-lg animate-pulse delay-75"></div>
             <div class="w-12 h-24 bg-white/20 rounded-t-lg animate-pulse delay-150"></div>
          </div>
        </div>
      } @else {
        <!-- REAL CHARTS -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            <!-- 1. Consent Analysis (Donut) -->
            <div class="glass-card p-6 animate-spring flex flex-col" style="animation-delay: 300ms">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-primary">Consent Analysis</h3>
                    <button class="p-1.5 rounded-lg hover:bg-bg-app text-secondary hover:text-accent transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                </div>
                <div class="relative flex-1 flex items-center justify-center">
                    <canvas #consentDonut></canvas>
                    <!-- Inner Text Overlay -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span class="text-3xl font-bold text-primary">1,277</span>
                        <span class="text-xs font-bold text-secondary uppercase tracking-widest">Total</span>
                    </div>
                </div>
            </div>

            <!-- 2. TPP Consents (Bar) -->
            <div class="glass-card p-6 animate-spring flex flex-col lg:col-span-2" style="animation-delay: 400ms">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-primary">TPP Request Volume</h3>
                     <span class="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md">+12.5% vs last month</span>
                </div>
                <div class="flex-1">
                    <canvas #tppBar></canvas>
                </div>
            </div>

            <!-- 3. Quote Generation (Line/Bar) -->
            <div class="glass-card p-6 animate-spring flex flex-col lg:col-span-2" style="animation-delay: 500ms">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-lg font-bold text-primary">Quote Traffic</h3>
                        <p class="text-xs text-secondary mt-0.5">Generation vs Acceptance rate</p>
                    </div>
                     <div class="flex gap-2">
                        <span class="w-3 h-3 rounded-full bg-accent"></span>
                        <span class="w-3 h-3 rounded-full bg-accent-light"></span>
                     </div>
                </div>
                <div class="flex-1 w-full h-[250px]">
                    <canvas #quoteBar></canvas>
                </div>
            </div>

            <!-- 4. LOB Distribution (Polar) -->
             <div class="glass-card p-6 animate-spring flex flex-col" style="animation-delay: 600ms">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-primary">Line of Business</h3>
                </div>
                <div class="flex-1 flex items-center justify-center">
                    <canvas #lobPie></canvas>
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

  isLoading = signal(true);

  // Shared Chart Options
  private readonly commonOptions: any = {
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { usePointStyle: true, pointStyle: 'circle', padding: 20, font: { family: 'DM Sans', size: 11, weight: 'bold' }, color: '#A3AED0' }
      },
      tooltip: {
        backgroundColor: '#1B254B',
        titleColor: '#fff',
        bodyColor: '#A3AED0',
        padding: 14,
        cornerRadius: 12,
        displayColors: { boxWidth: 8 },
        titleFont: { family: 'DM Sans', size: 13, weight: 'bold' },
        bodyFont: { family: 'DM Sans', size: 12 },
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      x: { grid: { display: false, drawBorder: false }, ticks: { color: '#A3AED0', font: { family: 'DM Sans', weight: '500' } } },
      y: { grid: { color: 'rgba(163, 174, 208, 0.1)', borderDash: [5, 5], drawBorder: false }, ticks: { color: '#A3AED0', padding: 10, font: { family: 'DM Sans', weight: '500' } } }
    }
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
      setTimeout(() => this.initCharts(), 100);
    }, 1500);
  }

  ngAfterViewInit(): void { }

  private initCharts(): void {
    if (!this.consentDonutRef) return;

    // 1. Consent Donut
    new Chart(this.consentDonutRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Authorized', 'Revoked', 'Suspended', 'Awaiting'],
        datasets: [{
          data: [45, 20, 10, 25],
          backgroundColor: ['#4318FF', '#EE5D50', '#A3AED0', '#FFB547'], // Accent, Danger, Secondary, Warning
          borderWidth: 0,
          hoverOffset: 15,
        }]
      },
      options: {
        ...this.commonOptions,
        cutout: '75%',
        plugins: { ...this.commonOptions.plugins, legend: { display: false } }, // Hide legend for cleaner look
        scales: { x: { display: false }, y: { display: false } }
      }
    });

    // 2. TPP Bar
    new Chart(this.tppBarRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Client Test', 'TPP Alpha', 'TPP Beta', 'TPP Gamma'],
        datasets: [
          {
            label: 'Conversations',
            data: [320, 210, 180, 120],
            backgroundColor: '#4318FF',
            borderRadius: 12,
            barThickness: 28
          }
        ]
      },
      options: {
        ...this.commonOptions,
        maintainAspectRatio: false,
      }
    });

    // 3. Quote Bar (Grouped)
    new Chart(this.quoteBarRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          { label: 'Generated', data: [120, 190, 300, 500, 200, 300], backgroundColor: '#4318FF', borderRadius: 8, barPercentage: 0.6 },
          { label: 'Accepted', data: [100, 150, 250, 420, 180, 250], backgroundColor: '#6AD2FF', borderRadius: 8, barPercentage: 0.6 }
        ]
      },
      options: {
        ...this.commonOptions,
        maintainAspectRatio: false,
        scales: {
          ...this.commonOptions.scales,
          y: { ...this.commonOptions.scales.y, display: false } // Hide Y axis for this one
        }
      }
    });

    // 4. LOB Pie (Polar Area for variety)
    new Chart(this.lobPieRef.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ['Motor', 'Medical', 'Travel', 'Home'],
        datasets: [{
          data: [150, 80, 45, 30],
          backgroundColor: ['rgba(67, 24, 255, 0.7)', 'rgba(5, 205, 153, 0.7)', 'rgba(255, 181, 71, 0.7)', 'rgba(238, 93, 80, 0.7)'],
          borderWidth: 0
        }]
      },
      options: {
        ...this.commonOptions,
        scales: { r: { grid: { display: false }, ticks: { display: false } } }, // Remove polar grid
        plugins: { ...this.commonOptions.plugins, legend: { position: 'right' } }
      }
    });
  }
}