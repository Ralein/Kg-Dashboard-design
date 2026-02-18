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
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div class="glass-card h-[340px] p-6 flex flex-col items-center justify-center col-span-1">
             <div class="w-32 h-32 rounded-full border-4 border-white/20 animate-spin border-t-accent"></div>
          </div>
          <div class="glass-card h-[340px] p-6 flex items-end justify-center gap-4 col-span-3">
             <div class="w-12 h-32 bg-white/20 rounded-t-lg animate-pulse"></div>
             <div class="w-12 h-48 bg-white/20 rounded-t-lg animate-pulse delay-75"></div>
             <div class="w-12 h-24 bg-white/20 rounded-t-lg animate-pulse delay-150"></div>
          </div>
          <div class="glass-card h-[340px] p-6 flex items-end justify-center gap-4 col-span-2">
             <div class="w-12 h-32 bg-white/20 rounded-t-lg animate-pulse"></div>
             <div class="w-12 h-48 bg-white/20 rounded-t-lg animate-pulse delay-75"></div>
          </div>
          <div class="glass-card h-[340px] p-6 flex items-center justify-center col-span-1">
             <div class="w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
          </div>
          <div class="glass-card h-[340px] p-6 flex items-center justify-center col-span-1">
             <div class="w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      } @else {
        <!-- REAL CHARTS -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
            
            <!-- 1. Consent Analysis (Donut) -->
            <div class="glass-card p-6 animate-spring flex flex-col col-span-1" style="animation-delay: 300ms">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-primary">Consent Analysis - Overview</h3>
                </div>
                <div class="relative flex-1 flex items-center justify-center">
                    <canvas #consentDonut></canvas>
                </div>
            </div>

            <!-- 2. TPP Wise Consents (Bar) -->
            <div class="glass-card p-6 animate-spring flex flex-col col-span-3" style="animation-delay: 400ms">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-primary">TPP - Wise Consent Requests</h3>
                </div>
                <div class="flex-1 w-full relative">
                    <canvas #tppBar></canvas>
                </div>
            </div>

            <!-- 3. Quote Generation (Grouped Bar) -->
            <div class="glass-card p-6 animate-spring flex flex-col col-span-2" style="animation-delay: 500ms">
                 <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-primary">Quote Generation - Quote Acceptance(Monthly)</h3>
                </div>
                <div class="flex-1 w-full h-[250px] relative">
                    <canvas #quoteBar></canvas>
                </div>
            </div>

            <!-- 4. LOB Distribution (Polar/Pie) -->
             <div class="glass-card p-6 animate-spring flex flex-col col-span-1" style="animation-delay: 600ms">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-primary">Consents Distribution by LOB</h3>
                </div>
                <div class="flex-1 flex items-center justify-center relative">
                    <canvas #lobPie></canvas>
                </div>
                 <div class="text-center mt-2">
                    <a href="javascript:void(0)" class="text-xs text-accent font-bold hover:underline">View</a>
                 </div>
            </div>

             <!-- 5. API Success Rate (Pie) -->
             <div class="glass-card p-6 animate-spring flex flex-col col-span-1" style="animation-delay: 700ms">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-primary">API Success Rate</h3>
                </div>
                <div class="flex-1 flex items-center justify-center relative">
                    <canvas #apiSuccessPie></canvas>
                </div>
                 <div class="text-center mt-2">
                    <a href="javascript:void(0)" class="text-xs text-accent font-bold hover:underline">View</a>
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
  @ViewChild('apiSuccessPie') apiSuccessPieRef!: ElementRef<HTMLCanvasElement>;

  isLoading = signal(true);

  // Custom Plugin for Glow Effects
  private readonly glowPlugin = {
    id: 'glowPlugin',
    beforeDatasetDraw: (chart: any, args: any, options: any) => {
      const ctx = chart.ctx;
      ctx.save();
      ctx.shadowColor = options.shadowColor || 'rgba(0,0,0,0)';
      ctx.shadowBlur = options.shadowBlur || 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetDraw: (chart: any) => {
      chart.ctx.restore();
    }
  };

  // Shared Chart Options
  private readonly commonOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { family: 'DM Sans', size: 12, weight: 'bold' },
          color: '#A3AED0',
          boxWidth: 8
        }
      },
      tooltip: {
        backgroundColor: 'rgba(27, 37, 75, 0.9)', // Darker, more opaque
        titleColor: '#fff',
        bodyColor: '#A3AED0',
        padding: 16,
        cornerRadius: 16,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        titleFont: { family: 'DM Sans', size: 14, weight: 'bold' },
        bodyFont: { family: 'DM Sans', size: 13 },
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        callbacks: {
          labelColor: (context: any) => {
            return {
              borderColor: 'transparent',
              backgroundColor: context.dataset.backgroundColor,
              borderWidth: 0,
              borderRadius: 2,
            };
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#A3AED0', font: { family: 'DM Sans', weight: '500', size: 11 } }
      },
      y: {
        grid: { color: 'rgba(163, 174, 208, 0.05)', borderDash: [0, 0], drawBorder: false }, // Very subtle grid
        ticks: { color: '#A3AED0', padding: 10, font: { family: 'DM Sans', weight: '500', size: 11 } }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  constructor() {
    // Register the custom plugin globally or per chart. Let's register it globally for simplicity here if we wanted, 
    // but strict typing might complain. We will add it to specific chart instances.
    Chart.register(this.glowPlugin);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
      setTimeout(() => this.initCharts(), 100);
    }, 1500);
  }

  ngAfterViewInit(): void { }

  private createGradient(ctx: CanvasRenderingContext2D, colorStart: string, colorEnd: string) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  }

  // New helper for "Equalizer" bars
  private createVerticalGradient(ctx: CanvasRenderingContext2D, stops: string[]) {
    const gradient = ctx.createLinearGradient(0, 300, 0, 0); // Bottom to Top
    stops.forEach((color, index) => {
      gradient.addColorStop(index / (stops.length - 1), color);
    });
    return gradient;
  }

  private initCharts(): void {
    if (!this.consentDonutRef) return;

    // 1. Consent Analysis (Mixed Donut)
    const consentCtx = this.consentDonutRef.nativeElement.getContext('2d');
    if (consentCtx) {
      // Vivid Neon Gradients
      const authorizedGrad = this.createGradient(consentCtx, '#01B574', '#009E83'); // Neon Green
      const revokedGrad = this.createGradient(consentCtx, '#FF5252', '#D32F2F');    // Neon Red
      const suspendedGrad = this.createGradient(consentCtx, '#8F9BBA', '#707EAE'); // Muted Blue-Grey
      const awaitingGrad = this.createGradient(consentCtx, '#3F51B5', '#303F9F'); // Indigo
      const rejectedGrad = this.createGradient(consentCtx, '#FF1744', '#C62828'); // Deep Red
      const expiredGrad = this.createGradient(consentCtx, '#FFA000', '#FF6F00'); // Amber

      new Chart(this.consentDonutRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Authorized', 'Revoked', 'Suspended', 'Awaiting', 'Rejected', 'Expired'],
          datasets: [{
            data: [450, 120, 80, 50, 100, 30],
            backgroundColor: [authorizedGrad, revokedGrad, suspendedGrad, awaitingGrad, rejectedGrad, expiredGrad],
            borderWidth: 0,
            hoverOffset: 15, // Larger expansion
            hoverBorderWidth: 0,
            // Custom plugin options
            // @ts-ignore
            glowPlugin: {
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 15
            }
          }]
        },
        options: {
          ...this.commonOptions,
          cutout: '75%', // Thinner ring
          plugins: {
            ...this.commonOptions.plugins,
            glowPlugin: { shadowColor: 'rgba(0,0,0,0.2)', shadowBlur: 10 },
            legend: { display: true, position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, padding: 20, font: { size: 11 } } }
          }
        }
      });
    }

    // 2. TPP Consents (Vertical Bar Chart) - Neon Pillars
    const tppCtx = this.tppBarRef.nativeElement.getContext('2d');
    if (tppCtx) {
      // High contrast neon gradients
      const authGrad = this.createVerticalGradient(tppCtx, ['#00E676', 'rgba(0, 230, 118, 0.1)']);
      const revGrad = this.createVerticalGradient(tppCtx, ['#FF4081', 'rgba(255, 64, 129, 0.1)']);
      const susGrad = this.createVerticalGradient(tppCtx, ['#B0BEC5', 'rgba(176, 190, 197, 0.1)']);
      const waitGrad = this.createVerticalGradient(tppCtx, ['#536DFE', 'rgba(83, 109, 254, 0.1)']);
      const rejGrad = this.createVerticalGradient(tppCtx, ['#FF5252', 'rgba(255, 82, 82, 0.1)']);
      const expGrad = this.createVerticalGradient(tppCtx, ['#FFAB40', 'rgba(255, 171, 64, 0.1)']);

      new Chart(this.tppBarRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['TPP Client Test', 'TPP Alpha', 'TPP Beta'],
          datasets: [
            { label: 'Authorized', data: [370, 200, 150], backgroundColor: authGrad, borderRadius: 6, barPercentage: 0.6, hoverBackgroundColor: '#00E676' },
            { label: 'Revoked', data: [40, 30, 20], backgroundColor: revGrad, borderRadius: 6, barPercentage: 0.6, hoverBackgroundColor: '#FF4081' },
            { label: 'Suspended', data: [10, 5, 2], backgroundColor: susGrad, borderRadius: 6, barPercentage: 0.6, hoverBackgroundColor: '#B0BEC5' },
            { label: 'Awaiting', data: [40, 20, 10], backgroundColor: waitGrad, borderRadius: 6, barPercentage: 0.6, hoverBackgroundColor: '#536DFE' },
            { label: 'Rejected', data: [340, 150, 100], backgroundColor: rejGrad, borderRadius: 6, barPercentage: 0.6, hoverBackgroundColor: '#FF5252' },
            { label: 'Expired', data: [10, 5, 5], backgroundColor: expGrad, borderRadius: 6, barPercentage: 0.6, hoverBackgroundColor: '#FFAB40' }
          ]
        },
        options: {
          ...this.commonOptions,
          scales: {
            x: { ...this.commonOptions.scales.x, grid: { display: false }, stacked: false },
            y: { ...this.commonOptions.scales.y, display: true, grid: { color: 'rgba(163, 174, 208, 0.1)', drawBorder: false }, min: 0, max: 400, ticks: { stepSize: 100 }, stacked: false }
          },
          plugins: {
            ...this.commonOptions.plugins,
            glowPlugin: { shadowColor: 'rgba(0,0,0,0.1)', shadowBlur: 8 },
            legend: { display: true, position: 'bottom' }
          }
        }
      });
    }

    // 3. Quote Generation (Grouped Bar) - Electric Blue/Teal
    const quoteCtx = this.quoteBarRef.nativeElement.getContext('2d');
    if (quoteCtx) {
      const blueGrad = this.createVerticalGradient(quoteCtx, ['#2962FF', 'rgba(41, 98, 255, 0.2)']); // Deep Electric Blue
      const tealGrad = this.createVerticalGradient(quoteCtx, ['#00BFA5', 'rgba(0, 191, 165, 0.2)']); // Teal

      new Chart(this.quoteBarRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: 'Quote Generation',
              data: [0, 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: blueGrad,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.7,
              categoryPercentage: 0.8,
              hoverBackgroundColor: '#2962FF'
            },
            {
              label: 'Quote Acceptance',
              data: [0, 290, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: tealGrad,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.7,
              categoryPercentage: 0.8,
              hoverBackgroundColor: '#00BFA5'
            }
          ]
        },
        options: {
          ...this.commonOptions,
          scales: {
            x: { ...this.commonOptions.scales.x, grid: { display: false } },
            y: { ...this.commonOptions.scales.y, display: true, grid: { color: 'rgba(163, 174, 208, 0.1)', drawBorder: false }, min: 0, max: 500, ticks: { stepSize: 100 } }
          },
          plugins: {
            ...this.commonOptions.plugins,
            glowPlugin: { shadowColor: 'rgba(41, 98, 255, 0.2)', shadowBlur: 10 },
            legend: { display: true, position: 'top', align: 'end' }
          }
        }
      });
    }

    // 4. LOB Pie (Polar Area) - Modern & Transparent
    const lobCtx = this.lobPieRef.nativeElement.getContext('2d');
    if (lobCtx) {
      new Chart(this.lobPieRef.nativeElement, {
        type: 'polarArea',
        data: {
          labels: ['MOTOR', 'MEDICAL', 'TRAVEL', 'HOME'],
          datasets: [{
            data: [65, 15, 10, 10],
            backgroundColor: [
              'rgba(89, 195, 255, 0.85)', // Cyan
              'rgba(227, 230, 238, 0.9)', // Light Grey
              'rgba(75, 230, 200, 0.85)', // Green
              'rgba(52, 71, 154, 0.85)'    // Dark Blue
            ],
            borderWidth: 0,
            hoverBorderWidth: 2,
            hoverBorderColor: '#fff',
          }]
        },
        options: {
          ...this.commonOptions,
          scales: { r: { grid: { display: false }, ticks: { display: false }, backdropColor: 'transparent' } },
          plugins: {
            ...this.commonOptions.plugins,
            glowPlugin: { shadowColor: 'rgba(0,0,0,0.2)', shadowBlur: 15 },
            legend: { position: 'bottom', labels: { boxWidth: 10, padding: 20 } }
          }
        }
      });
    }

    // 5. API Success Rate (Pie) - Radiant
    if (this.apiSuccessPieRef) {
      const apiCtx = this.apiSuccessPieRef.nativeElement.getContext('2d');
      if (apiCtx) {
        // Super bright gradients
        const successGrad = this.createGradient(apiCtx, '#00E676', '#69F0AE'); // Neon Green
        const failGrad = this.createGradient(apiCtx, '#FF1744', '#FF5252');   // Neon Red

        new Chart(this.apiSuccessPieRef.nativeElement, {
          type: 'pie',
          data: {
            labels: ['Success (94.2%)', 'Failure (5.8%)'],
            datasets: [{
              data: [94.2, 5.8],
              backgroundColor: [successGrad, failGrad],
              borderWidth: 0,
              hoverOffset: 10,
              hoverBorderWidth: 2,
              hoverBorderColor: '#fff'
            }]
          },
          options: {
            ...this.commonOptions,
            plugins: {
              ...this.commonOptions.plugins,
              glowPlugin: { shadowColor: 'rgba(0, 230, 118, 0.4)', shadowBlur: 20 },
              legend: { position: 'bottom', labels: { boxWidth: 10, padding: 20 } },
              tooltip: {
                callbacks: {
                  label: (context) => ` ${context.label}`
                }
              }
            }
          }
        });
      }
    }
  }
}