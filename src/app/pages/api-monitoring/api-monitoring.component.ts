import { Component, OnInit, ViewChild, ElementRef, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Activity, Clock, PieChart, BarChart3, ChevronDown, Info } from 'lucide-angular';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-api-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">

      <!-- Header & Selector Row — UNCHANGED -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">API Monitoring</h1>
          <p class="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Real-time API performance and usage metrics</p>
        </div>
        <div class="bg-white/40 p-3 rounded-2xl shadow-sm border border-white/20 flex items-center gap-4">
          <span class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-widest">Select Service</span>
          <div class="relative min-w-[200px]">
            <select class="glass-input pl-3 pr-10 py-2 w-full appearance-none cursor-pointer font-bold text-[#2B3674]">
              <option>Adnic service</option>
              <option>Client Service</option>
              <option>Data Sharing Service</option>
              <option>Ozone Service</option>
            </select>
            <lucide-icon [img]="ChevronDown" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
          </div>
        </div>
      </div>

      <!-- Top Stats Grid — UNCHANGED layout, graphs enhanced -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- Usage Volume — ENHANCED with Sparkline -->
        <div class="premium-glass p-6 flex flex-col gap-4 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div class="flex justify-between items-center relative z-10">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Usage Volume - TPM</h3>
            <lucide-icon [img]="Activity" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
          </div>
          <div class="grid grid-cols-2 gap-4 relative z-10">
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Average</span>
                <span class="text-[8px] font-bold bg-[#4318FF]/10 text-[#4318FF] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">2 TPM</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Maximum</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">22 TPM</span>
            </div>
          </div>
          <!-- Mini Sparkline Background -->
          <div class="absolute inset-x-0 bottom-0 h-16 opacity-40 group-hover:opacity-60 transition-opacity">
            <canvas #usageSparkline class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- Response Time — ENHANCED with Sparkline -->
        <div class="premium-glass p-6 flex flex-col gap-4 relative overflow-hidden group hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
          <div class="flex justify-between items-center relative z-10">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Response Time - MS</h3>
            <lucide-icon [img]="Clock" class="w-4 h-4 text-[#05CD99]"></lucide-icon>
          </div>
          <div class="grid grid-cols-2 gap-4 relative z-10">
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Average</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">24,227</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Maximum</span>
                <span class="text-[8px] font-bold bg-[#FF5252]/10 text-[#FF5252] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">4.6M</span>
            </div>
          </div>
          <!-- Mini Sparkline Background -->
          <div class="absolute inset-x-0 bottom-0 h-16 opacity-40 group-hover:opacity-60 transition-opacity">
            <canvas #responseSparkline class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- API Groups Donut — ENHANCED rich mockup -->
        <div class="premium-glass p-6 flex flex-col gap-4 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">By API Groups</h3>
            <lucide-icon [img]="PieChart" class="w-4 h-4 text-[#FF8F0C]"></lucide-icon>
          </div>
          <div class="flex-1 flex items-center justify-center relative min-h-[140px]">
            <canvas #groupsDonut></canvas>
          </div>
        </div>

      </div>

      <!-- Bottom Grid — UNCHANGED layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        <!-- Daily Stats List — UNCHANGED -->
        <div class="premium-glass p-6 lg:col-span-1 flex flex-col gap-6">
          <div class="flex justify-between items-center pb-2 border-b border-gray-50">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Daily Stats</h3>
            <lucide-icon [img]="Info" class="w-4 h-4 text-[#A3AED0]"></lucide-icon>
          </div>
          <div class="flex flex-col gap-5">
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#FF5252] mb-0.5">Average response time</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">In Milliseconds</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">21691</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#FF8F0C] mb-0.5">Total API Calls</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">Total number of API Calls including 2xx, 4xx and 5xx</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">36</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#05CD99] mb-0.5">Successful API Calls</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">total number of 2xx API Calls</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">31</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#FF5252] mb-0.5">Client Error</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">total number of 4xx API Calls</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">0</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#4318FF] mb-0.5">System Error</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">total number of 5xx API Calls</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">5</span>
            </div>
          </div>
        </div>

        <!-- Monthly History Bar — ENHANCED pure canvas -->
        <div class="premium-glass p-6 lg:col-span-2 flex flex-col gap-6">
          <div class="flex justify-between items-center pb-2 border-b border-gray-100/50">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">API Status Chart - Monthly</h3>
            <lucide-icon [img]="BarChart3" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
          </div>
          <div class="flex-1 min-h-[300px]">
            <canvas #monthlyBar></canvas>
          </div>
          <!-- Legend — UNCHANGED -->
          <div class="flex flex-wrap justify-center gap-6 pt-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-sm bg-[#2B3674]"></span>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Total API Calls</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-sm bg-[#05CD99]"></span>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Successful API Calls</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-sm bg-[#FF8F0C]"></span>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Failed API Calls</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .premium-glass {
      /* Handled by global styles, but adding specific padding/flex if needed */
    }

    /* ── Donut empty state ─────────────────────────── */
    .donut-empty-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      pointer-events: none;
    }
    .donut-empty-label {
      font-size: 10px;
      font-weight: 700;
      color: #C5CEDF;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  `]
})
export class ApiMonitoringComponent implements AfterViewInit {
  @ViewChild('usageSparkline') usageSparklineRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('responseSparkline') responseSparklineRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('groupsDonut') groupsDonutRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyBar') monthlyBarRef!: ElementRef<HTMLCanvasElement>;

  readonly ChevronDown = ChevronDown;
  readonly Activity = Activity;
  readonly Clock = Clock;
  readonly PieChart = PieChart;
  readonly BarChart3 = BarChart3;
  readonly Info = Info;

  ngAfterViewInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
    this.buildSparkline(this.usageSparklineRef.nativeElement, '#4318FF', [12, 15, 18, 14, 22, 19, 21]);
    this.buildSparkline(this.responseSparklineRef.nativeElement, '#05CD99', [24000, 26000, 22000, 25000, 28000, 23000, 24227]);
    this.buildDonut();
    this.buildMonthlyBar();
  }

  private buildSparkline(canvas: HTMLCanvasElement, color: string, data: number[]): void {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data: data,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return undefined;
            const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, `${color}20`);
            gradient.addColorStop(1, `${color}00`);
            return gradient;
          },
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        interaction: { intersect: false }
      }
    });
  }

  // ── By API Groups: Premium Polar Area Chart ─────────────────────────────────
  private buildDonut(): void {
    new Chart(this.groupsDonutRef.nativeElement, {
      type: 'polarArea', // Changed for "change graph"
      data: {
        labels: ['Search', 'Auth', 'Payments', 'Users', 'Orders', 'Analytics'],
        datasets: [{
          data: [35, 20, 15, 12, 10, 8],
          backgroundColor: [
            'rgba(67, 24, 255, 0.7)', // Primary
            'rgba(5, 205, 153, 0.7)', // Success
            'rgba(255, 143, 12, 0.7)', // Warning
            'rgba(238, 93, 80, 0.7)', // Danger
            'rgba(124, 92, 255, 0.7)', // Purple
            'rgba(163, 174, 208, 0.7)'  // Gray
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            grid: { color: 'rgba(163, 174, 208, 0.1)' },
            ticks: { display: false },
            angleLines: { color: 'rgba(163, 174, 208, 0.1)' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#2B3674',
            bodyColor: '#2B3674',
            borderColor: '#E2E8F0',
            borderWidth: 1,
            usePointStyle: true,
            bodyFont: { weight: 'bold' }
          }
        },
        animation: { duration: 1500, easing: 'easeOutElastic' }
      }
    });
  }

  // ── Monthly History: Stacked Area Chart using Chart.js ──
  private buildMonthlyBar(): void {
    const ctx = this.monthlyBarRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Gradient generators
    const createGradient = (color: string) => {
      const grad = ctx.createLinearGradient(0, 0, 0, 300);
      grad.addColorStop(0, `${color}40`);
      grad.addColorStop(1, `${color}00`);
      return grad;
    };

    new Chart(this.monthlyBarRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Total API Calls',
            data: [1100, 1500, 1200, 1350, 1600, 1400, 1450, 1300, 1550, 1400, 1650, 1500],
            borderColor: '#2B3674',
            backgroundColor: createGradient('#2B3674'),
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#2B3674',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Successful API Calls',
            data: [950, 1320, 1050, 1200, 1450, 1200, 1300, 1150, 1400, 1250, 1500, 1350],
            borderColor: '#05CD99',
            backgroundColor: createGradient('#05CD99'),
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#05CD99',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Failed API Calls',
            data: [150, 180, 150, 150, 150, 200, 150, 150, 150, 150, 150, 150],
            borderColor: '#FF8F0C',
            backgroundColor: createGradient('#FF8F0C'),
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#FF8F0C',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#2B3674',
            bodyColor: '#2B3674',
            borderColor: '#E2E8F0',
            borderWidth: 1,
            padding: 12,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            usePointStyle: true
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#A3AED0', font: { size: 11, weight: 'bold' } }
          },
          y: {
            grid: { color: 'rgba(163, 174, 208, 0.1)' },
            ticks: {
              color: '#A3AED0',
              font: { size: 11, weight: 'bold' },
              callback: (val) => Number(val) >= 1000 ? (Number(val) / 1000).toFixed(1) + 'k' : val
            },
            beginAtZero: true
          }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false }
      }
    });
  }
}