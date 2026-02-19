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
          <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">API Monitoring</h1>
          <p class="text-[#A3AED0] text-sm font-medium">Real-time API performance and usage metrics</p>
        </div>
        <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-100/50 flex items-center gap-4">
          <span class="text-xs font-bold text-[#A3AED0] uppercase tracking-wider">Select Service</span>
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

        <!-- Usage Volume — UNCHANGED -->
        <div class="chart-shell p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Usage Volume - TPM</h3>
            <lucide-icon [img]="Activity" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Average</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
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
        </div>

        <!-- Response Time — UNCHANGED -->
        <div class="chart-shell p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Response Time - Milliseconds</h3>
            <lucide-icon [img]="Clock" class="w-4 h-4 text-[#05CD99]"></lucide-icon>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Average</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">24227 MS</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Maximum</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">4668574 MS</span>
            </div>
          </div>
        </div>

        <!-- API Groups Donut — ENHANCED empty state -->
        <div class="chart-shell p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">By API Groups</h3>
            <lucide-icon [img]="PieChart" class="w-4 h-4 text-[#FF8F0C]"></lucide-icon>
          </div>
          <div class="flex-1 flex items-center justify-center relative min-h-[120px]">
            <canvas #groupsDonut></canvas>
            <!-- ENHANCED: styled empty state overlay -->
            <div class="donut-empty-overlay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5CEDF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
              </svg>
              <span class="donut-empty-label">No data available</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Grid — UNCHANGED layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        <!-- Daily Stats List — UNCHANGED -->
        <div class="chart-shell p-6 lg:col-span-1 flex flex-col gap-6">
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
        <div class="chart-shell p-6 lg:col-span-2 flex flex-col gap-6">
          <div class="flex justify-between items-center pb-2 border-b border-gray-100/50">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">API Status Chart - Monthly</h3>
            <lucide-icon [img]="BarChart3" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
          </div>
          <div class="flex-1 min-h-[300px] relative">
            <canvas #monthlyBar style="position:absolute;inset:0;width:100%;height:100%;"></canvas>
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

    .chart-shell {
      background: white;
      border-radius: 20px;
      border: 1px solid rgba(0,0,0,0.03);
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
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
  @ViewChild('groupsDonut') groupsDonutRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyBar')  monthlyBarRef!: ElementRef<HTMLCanvasElement>;

  readonly ChevronDown = ChevronDown;
  readonly Activity    = Activity;
  readonly Clock       = Clock;
  readonly PieChart    = PieChart;
  readonly BarChart3   = BarChart3;
  readonly Info        = Info;

  ngAfterViewInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
    this.buildDonut();
    this.buildMonthlyBar();
  }

  // ── Donut: styled empty ring ──────────────────────────────────────────
  private buildDonut(): void {
    new Chart(this.groupsDonutRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['No Data'],
        datasets: [{
          data: [100],
          backgroundColor: ['#F0F3FF'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '78%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend:  { display: false },
          tooltip: { enabled: false }
        },
        animation: { duration: 600, easing: 'easeOutQuart' }
      }
    });
  }

  // ── Monthly Bar: animate once bottom-to-top, then completely static ──
  private buildMonthlyBar(): void {
    const canvas = this.monthlyBarRef.nativeElement;
    const ctx    = canvas.getContext('2d')!;
    const dpr    = window.devicePixelRatio || 1;

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datasets = [
      { label: 'Total',      values: [0,1500,0,0,0,0,0,0,0,0,0,0], color: '#2B3674', gradEnd: 'rgba(43,54,116,0.25)',  glow: 'rgba(43,54,116,0.35)'  },
      { label: 'Successful', values: [0,1320,0,0,0,0,0,0,0,0,0,0], color: '#05CD99', gradEnd: 'rgba(5,205,153,0.2)',   glow: 'rgba(5,205,153,0.4)'   },
      { label: 'Failed',     values: [0, 180,0,0,0,0,0,0,0,0,0,0], color: '#FF8F0C', gradEnd: 'rgba(255,143,12,0.2)', glow: 'rgba(255,143,12,0.4)'  },
    ];
    const maxVal = 1800;
    const numDS  = datasets.length;
    const animDur = 1100;
    const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

    // All layout vars — filled on first rAF once DOM has settled
    let W = 0, H = 0;
    const padL = 48, padR = 16, padT = 32, padB = 38;
    let chartW = 0, chartH = 0, slotW = 0, groupW = 0, barW = 0, gap = 0;

    const drawFrame = (progress: number) => {
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      [0, 500, 1000, 1500].forEach(v => {
        const y = padT + chartH - (v / maxVal) * chartH;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + chartW, y);
        ctx.strokeStyle = v === 0 ? 'rgba(163,174,208,0.25)' : 'rgba(163,174,208,0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash(v === 0 ? [] : [4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        if (v > 0) {
          ctx.fillStyle = '#C5CEDF';
          ctx.font = '500 9px "DM Sans", system-ui, sans-serif';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(v >= 1000 ? (v/1000).toFixed(1)+'k' : String(v), padL - 7, y);
        }
      });

      // Bars + labels
      labels.forEach((month, col) => {
        const slotX  = padL + col * slotW;
        const groupX = slotX + (slotW - groupW) / 2;
        const hasData = datasets.some(d => d.values[col] > 0);

        datasets.forEach((ds, di) => {
          const raw  = ds.values[col];
          const barH = (raw / maxVal) * chartH * progress;
          if (barH <= 0) return;

          const bx = groupX + di * (barW + gap);
          const by = padT + chartH - barH;

          // Gradient fill
          const grad = ctx.createLinearGradient(0, by, 0, padT + chartH);
          grad.addColorStop(0, ds.color);
          grad.addColorStop(1, ds.gradEnd);
          ctx.shadowColor = ds.glow;
          ctx.shadowBlur  = 10;
          ctx.fillStyle   = grad;
          ctx.beginPath();
          (ctx as any).roundRect?.(bx, by, barW - gap, barH, [5, 5, 0, 0]) ||
            ctx.rect(bx, by, barW - gap, barH);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Shimmer cap
          const capGrad = ctx.createLinearGradient(bx, by, bx + barW - gap, by);
          capGrad.addColorStop(0,   'rgba(255,255,255,0)');
          capGrad.addColorStop(0.5, 'rgba(255,255,255,0.55)');
          capGrad.addColorStop(1,   'rgba(255,255,255,0)');
          ctx.fillStyle = capGrad;
          ctx.fillRect(bx, by, barW - gap, 2.5);

          // Value label — only at full height (final frame)
          if (progress === 1 && raw > 0) {
            ctx.fillStyle = ds.color;
            ctx.font = '700 9px "DM Sans", system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(
              raw >= 1000 ? (raw/1000).toFixed(1)+'k' : String(raw),
              bx + (barW - gap) / 2,
              by - 3
            );
          }
        });

        // Month label
        ctx.fillStyle = hasData ? '#8899C4' : '#D5DCF0';
        ctx.font = `${hasData ? '700 11px' : '500 10px'} "DM Sans", system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(month, slotX + slotW / 2, padT + chartH + 10);
      });
    };

    // Animate once — size on first frame so DOM is guaranteed laid out
    let animStart = 0;
    const animate = (now: number) => {
      // First frame: measure & size the canvas, then kick off the clock
      if (!animStart) {
        const rect = canvas.parentElement!.getBoundingClientRect();
        W = rect.width; H = rect.height;
        canvas.width  = W * dpr; canvas.height = H * dpr;
        canvas.style.width  = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        chartW = W - padL - padR; chartH = H - padT - padB;
        slotW  = chartW / labels.length;
        groupW = slotW * 0.72;
        barW   = groupW / numDS;
        gap    = barW * 0.12;
        animStart = now;
      }

      const p = Math.min(ease((now - animStart) / animDur), 1);
      drawFrame(p);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        // Final explicit pass at exactly p=1 — guarantees labels render
        drawFrame(1);
      }
    };

    requestAnimationFrame(animate);
  }
}