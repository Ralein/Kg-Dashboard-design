import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// ─── Custom Plugin: Neon Glow Shadow ───────────────────────────────────────
const neonGlowPlugin = {
  id: 'neonGlow',
  beforeDraw(chart: any) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
};

// ─── Custom Plugin: Donut Center Text ─────────────────────────────────────
const donutCenterTextPlugin = {
  id: 'donutCenterText',
  afterDraw(chart: any, _args: any, options: any) {
    if (!options?.text) return;
    const { ctx, chartArea: { top, bottom, left, right } } = chart;
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 28px "DM Sans", sans-serif`;
    ctx.fillStyle = '#2B3674';
    ctx.fillText(options.text, cx, cy - 10);
    ctx.font = `500 11px "DM Sans", sans-serif`;
    ctx.fillStyle = '#A3AED0';
    ctx.fillText(options.sub || '', cx, cy + 14);
    ctx.restore();
  }
};

Chart.register(neonGlowPlugin, donutCenterTextPlugin);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatsCardComponent, CommonModule, FormsModule],
  styles: [`
    :host {
      --primary: #4318FF;
      --accent: #05CD99;
      --warning: #FF8F0C;
      --danger: #FF5252;
      --navy: #2B3674;
      --muted: #A3AED0;
    }

    /* ── Chart Wrappers ───────────────────────────────── */
    .chart-shell {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.6);
      box-shadow: 0 4px 24px rgba(67,24,255,0.06), 0 1px 0 rgba(255,255,255,0.8) inset;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    .chart-shell:hover {
      box-shadow: 0 8px 40px rgba(67,24,255,0.12), 0 1px 0 rgba(255,255,255,0.8) inset;
      transform: translateY(-2px);
    }
    .chart-shell::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary), transparent);
      opacity: 0.6; z-index: 1;
    }
    .chart-shell.accent-green::before  { background: linear-gradient(90deg, transparent, var(--accent), transparent); }
    .chart-shell.accent-orange::before { background: linear-gradient(90deg, transparent, var(--warning), transparent); }
    .chart-shell.accent-navy::before   { background: linear-gradient(90deg, transparent, var(--navy), transparent); }

    /* ── Live Badge ───────────────────────────────────── */
    .live-badge {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
      background: rgba(5,205,153,0.1); color: #05CD99;
    }
    .live-badge::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: #05CD99; box-shadow: 0 0 0 3px rgba(5,205,153,0.2);
      animation: pulse-dot 1.5s infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { box-shadow: 0 0 0 3px rgba(5,205,153,0.2); }
      50%       { box-shadow: 0 0 0 6px rgba(5,205,153,0.05); }
    }

    /* ── Legend Pills ─────────────────────────────────── */
    .legend-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
      color: #2B3674; background: rgba(67,24,255,0.05); cursor: default;
    }
    .legend-pill .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

    /* ── TPP ──────────────────────────────────────────── */
    .tpp-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
      text-transform: uppercase; color: #A3AED0;
    }

    /* ── FIX 1: LOB horizontal bars ──────────────────── */
    .lob-bar-track {
      height: 9px; border-radius: 5px; background: #F4F7FE; overflow: hidden; flex: 1;
    }
    .lob-bar-fill {
      height: 100%; border-radius: 5px;
      transition: width 1.1s cubic-bezier(0.34, 1.4, 0.64, 1);
    }

    /* ── FIX 2: Quote "no data" months ───────────────── */
    .no-data-label {
      font-size: 9px; color: #D0D5E8; font-weight: 500; letter-spacing: 0.04em;
    }

    /* ── API pulse dot ────────────────────────────────── */
    .api-pulse-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #42CD7E;
      display: inline-block; animation: api-blink 1.8s ease-in-out infinite;
    }
    @keyframes api-blink {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(66,205,126,0.5); }
      50%       { opacity: 0.5; box-shadow: 0 0 0 5px rgba(66,205,126,0); }
    }

    /* ── Animate in ───────────────────────────────────── */
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .chart-shell { animation: fadeSlideUp 0.5s ease both; }
    .chart-shell:nth-child(2) { animation-delay: 0.08s; }
    .chart-shell:nth-child(3) { animation-delay: 0.16s; }
    .chart-shell:nth-child(4) { animation-delay: 0.24s; }
    .chart-shell:nth-child(5) { animation-delay: 0.32s; }
  `],
  template: `
    <div class="flex flex-col gap-5">

      <!-- Header & Filters -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">Dashboard</h1>
          <p class="text-[#A3AED0] text-sm font-medium">Overview of your system performance</p>
        </div>
        <div class="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm">
          <div class="relative group">
            <select class="glass-input pl-3 pr-8 py-1.5 cursor-pointer hover:bg-gray-50">
              <option>2026</option><option>2025</option>
            </select>
            <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </div>
          <div class="w-px h-6 bg-gray-200"></div>
          <div class="relative group">
            <select class="glass-input pl-3 pr-8 py-1.5 cursor-pointer hover:bg-gray-50">
              <option>February</option><option>January</option>
            </select>
            <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        <app-stats-card title="Active Consents" count="527" iconType="chart" iconBgColor="bg-[#F4F7FE]" iconColor="text-[#4318FF]" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Revoked Consents" count="98" iconType="alert" iconBgColor="bg-[#FFF8F1]" iconColor="text-[#FF8F0C]" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Expired Consents" count="30,469" iconType="time" iconBgColor="bg-[#F3E8FF]" iconColor="text-[#A020F0]" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Suspended Consents" count="0" iconType="pause" iconBgColor="bg-[#F1F5F9]" iconColor="text-[#64748B]" [loading]="isLoading()"></app-stats-card>
        <app-stats-card title="Quotes Generated" count="2,642" iconType="description" iconBgColor="bg-[#E6FFFA]" iconColor="text-[#05CD99]" [loading]="isLoading()"></app-stats-card>
      </div>

      <!-- Main Charts Grid -->
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">

        <!-- 1. Consent Analysis — unchanged -->
        <div class="chart-shell p-5 col-span-1 lg:col-span-2 flex flex-col h-[360px]">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-base font-bold text-[#2B3674] leading-tight">Consent Analysis</h3>
              <p class="text-xs text-[#A3AED0] font-medium mt-0.5">Breakdown by current status</p>
            </div>
            <span class="live-badge">Live</span>
          </div>
          <div class="flex-1 relative flex items-center">
            <div class="relative flex-shrink-0" style="width:200px; height:200px;">
              <canvas #consentDonut></canvas>
            </div>
            <div class="flex flex-col gap-2 ml-6 flex-1">
              <ng-container *ngFor="let item of consentLegend">
                <div class="flex items-center justify-between cursor-default">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" [style.background]="item.color"></span>
                    <span class="text-xs font-semibold text-[#2B3674]">{{item.label}}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-[#2B3674]">{{item.value}}</span>
                    <div class="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-700" [style.width]="item.pct + '%'" [style.background]="item.color"></div>
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </div>

        <!-- ─── FIX 3: TPP — multiple client rows, fills the card ─── -->
        <div class="chart-shell accent-navy p-5 col-span-1 lg:col-span-2 flex flex-col h-[360px]">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-base font-bold text-[#2B3674] leading-tight">TPP Wise Consent Requests</h3>
              <p class="text-xs text-[#A3AED0] font-medium mt-0.5">Stacked by status · all clients</p>
            </div>
            <div class="w-8 h-8 rounded-lg bg-[#F4F7FE] flex items-center justify-center text-[#4318FF]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
          </div>
          <!-- Each TPP row evenly shares vertical space -->
          <div class="flex-1 flex flex-col justify-evenly gap-2">
            <ng-container *ngFor="let group of tppGroups">
              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <div class="flex items-center gap-2">
                    <span class="tpp-label">{{group.label}}</span>
                    <!-- Status badge -->
                    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      [style.background]="group.active ? 'rgba(5,205,153,0.1)' : 'rgba(163,174,208,0.15)'"
                      [style.color]="group.active ? '#05CD99' : '#A3AED0'">
                      {{group.active ? 'ACTIVE' : 'INACTIVE'}}
                    </span>
                  </div>
                  <span class="text-xs font-bold text-[#2B3674]">{{group.total}}</span>
                </div>
                <div class="flex h-6 rounded-lg overflow-hidden gap-px">
                  <ng-container *ngFor="let seg of group.segments">
                    <div class="h-full hover:brightness-110 cursor-pointer transition-all duration-200"
                      [style.width]="seg.pct + '%'"
                      [style.background]="seg.color"
                      [title]="seg.label + ': ' + seg.value">
                    </div>
                  </ng-container>
                </div>
              </div>
            </ng-container>
            <!-- Shared legend at bottom -->
            <div class="flex flex-wrap gap-x-3 gap-y-1 pt-1 border-t border-gray-100">
              <ng-container *ngFor="let seg of tppGroups[0].segments">
                <div class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-sm flex-shrink-0" [style.background]="seg.color"></span>
                  <span class="text-[10px] text-[#A3AED0]">{{seg.label}}</span>
                </div>
              </ng-container>
            </div>
          </div>
        </div>

        <!-- ─── FIX 2: Quote Traffic — clipped x-axis + future-month fade ─── -->
        <div class="chart-shell accent-green p-5 col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col h-[360px]">
          <div class="flex justify-between items-center mb-1">
            <div>
              <h3 class="text-base font-bold text-[#2B3674] leading-tight">Quote Traffic</h3>
              <p class="text-xs text-[#A3AED0] font-medium mt-0.5">Generation vs Acceptance · Feb 2026</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="legend-pill"><span class="dot" style="background:#4318FF"></span>Gen</span>
              <span class="legend-pill"><span class="dot" style="background:#05CD99"></span>Acc</span>
            </div>
          </div>
          <!-- Chart: Jan–May only, future months shown as ghost labels -->
          <div class="flex-1 relative w-full min-h-0">
            <canvas #quoteLine></canvas>
          </div>
          <!-- Future months ghost row -->
          <div class="flex justify-end items-center gap-1 mt-1 pr-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D0D5E8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="no-data-label">MAR – DEC: no data yet</span>
          </div>
        </div>

        <!-- ─── FIX 1: LOB Distribution — horizontal bar chart ─── -->
        <div class="chart-shell accent-orange p-5 col-span-1 xl:col-span-1 flex flex-col h-[360px]">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-base font-bold text-[#2B3674] leading-tight">LOB Distribution</h3>
              <p class="text-xs text-[#A3AED0] font-medium mt-0.5">By line of business</p>
            </div>
            <span class="text-[10px] font-bold text-[#A3AED0] bg-[#F4F7FE] px-2 py-1 rounded-lg">100%</span>
          </div>

          <!-- Horizontal bars — one per LOB, fills all vertical space -->
          <div class="flex-1 flex flex-col justify-evenly">
            <ng-container *ngFor="let item of lobLegend">
              <div>
                <!-- Label row -->
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" [style.background]="item.color"></span>
                    <span class="text-xs font-bold text-[#2B3674]">{{item.label}}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-[#2B3674]">{{item.value}}%</span>
                    <span class="text-[10px] text-[#A3AED0]">({{item.count}} policies)</span>
                  </div>
                </div>
                <!-- Bar track -->
                <div class="flex items-center gap-2">
                  <div class="lob-bar-track">
                    <div class="lob-bar-fill" [style.width]="item.value + '%'" [style.background]="item.gradient"></div>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Mini total footer -->
            <div class="flex justify-between items-center pt-3 border-t border-gray-100 mt-1">
              <span class="text-[11px] text-[#A3AED0] font-semibold">Total Policies</span>
              <span class="text-sm font-extrabold text-[#2B3674]">4,820</span>
            </div>
          </div>
        </div>

        <!-- 5. API Success — unchanged arc gauge -->
        <div class="chart-shell p-5 col-span-1 xl:col-span-1 flex flex-col h-[360px]" style="background:linear-gradient(160deg,#0F1232 0%,#1A1D3A 100%);">
          <div class="flex justify-between items-center mb-2">
            <div>
              <h3 class="text-base font-bold text-white leading-tight">API Success</h3>
              <p class="text-[11px] font-medium mt-0.5" style="color:rgba(255,255,255,0.4)">Real-time · SLA 99.9%</p>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style="background:rgba(66,205,126,0.12); border:1px solid rgba(66,205,126,0.25);">
              <span class="api-pulse-dot"></span>
              <span class="text-[10px] font-bold tracking-wider" style="color:#42CD7E">HEALTHY</span>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center relative">
            <canvas #apiSuccessGauge width="220" height="220" style="position:absolute;"></canvas>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div class="rounded-xl p-2.5 text-center" style="background:rgba(66,205,126,0.08);border:1px solid rgba(66,205,126,0.18);">
              <div class="text-base font-bold" style="color:#42CD7E">94.2%</div>
              <div class="text-[10px] font-bold tracking-wide" style="color:rgba(255,255,255,0.4)">SUCCESS</div>
            </div>
            <div class="rounded-xl p-2.5 text-center" style="background:rgba(238,93,80,0.08);border:1px solid rgba(238,93,80,0.18);">
              <div class="text-base font-bold" style="color:#EE5D50">5.8%</div>
              <div class="text-[10px] font-bold tracking-wide" style="color:rgba(255,255,255,0.4)">FAILURE</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('consentDonut')    consentDonutRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('quoteLine')       quoteLineRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('apiSuccessGauge') apiSuccessGaugeRef!: ElementRef<HTMLCanvasElement>;

  isLoading = signal(true);

  // ── Consent legend ────────────────────────────────────────────────────
  consentLegend = [
    { label: 'Authorized', value: 350, color: '#4318FF', pct: 51 },
    { label: 'Revoked',    value: 120, color: '#FF5252', pct: 18 },
    { label: 'Suspended',  value: 80,  color: '#A3AED0', pct: 12 },
    { label: 'Awaiting',   value: 50,  color: '#2B3674', pct: 7  },
    { label: 'Rejected',   value: 60,  color: '#FF8F0C', pct: 9  },
    { label: 'Expired',    value: 40,  color: '#FFCA28', pct: 6  },
  ];

  // ── FIX 1: LOB — horizontal bar data with gradient + count ───────────
  lobLegend = [
    { label: 'MOTOR',   value: 65, count: '3,133', color: '#4318FF', gradient: 'linear-gradient(90deg, #4318FF, #6AD2FF)' },
    { label: 'TRAVEL',  value: 20, count: '964',   color: '#05CD99', gradient: 'linear-gradient(90deg, #05CD99, #00E5B4)' },
    { label: 'MEDICAL', value: 10, count: '482',   color: '#FF8F0C', gradient: 'linear-gradient(90deg, #FF8F0C, #FFCA28)' },
    { label: 'HOME',    value: 10, count: '241',   color: '#2B3674', gradient: 'linear-gradient(90deg, #2B3674, #4318FF)' },
  ];

  // ── FIX 3: TPP — 4 client rows, fills card, shared legend at bottom ──
  tppGroups = [
    {
      label: 'TPP Client Test', total: 510, active: true,
      segments: [
        { label: 'Authorized', value: 360, color: 'linear-gradient(90deg,#4318FF,#6AD2FF)', pct: (360/510)*100 },
        { label: 'Revoked',    value: 50,  color: '#FA9E93',  pct: (50/510)*100  },
        { label: 'Rejected',   value: 40,  color: '#EE5D50',  pct: (40/510)*100  },
        { label: 'Awaiting',   value: 30,  color: '#2B3674',  pct: (30/510)*100  },
        { label: 'Expired',    value: 20,  color: '#FFCA28',  pct: (20/510)*100  },
        { label: 'Suspended',  value: 10,  color: '#E2E8F0',  pct: (10/510)*100  },
      ]
    },
    {
      label: 'Open Finance Corp', total: 318, active: true,
      segments: [
        { label: 'Authorized', value: 210, color: 'linear-gradient(90deg,#4318FF,#6AD2FF)', pct: (210/318)*100 },
        { label: 'Revoked',    value: 30,  color: '#FA9E93',  pct: (30/318)*100  },
        { label: 'Rejected',   value: 28,  color: '#EE5D50',  pct: (28/318)*100  },
        { label: 'Awaiting',   value: 25,  color: '#2B3674',  pct: (25/318)*100  },
        { label: 'Expired',    value: 15,  color: '#FFCA28',  pct: (15/318)*100  },
        { label: 'Suspended',  value: 10,  color: '#E2E8F0',  pct: (10/318)*100  },
      ]
    },
    {
      label: 'FinBridge API', total: 195, active: true,
      segments: [
        { label: 'Authorized', value: 120, color: 'linear-gradient(90deg,#4318FF,#6AD2FF)', pct: (120/195)*100 },
        { label: 'Revoked',    value: 22,  color: '#FA9E93',  pct: (22/195)*100  },
        { label: 'Rejected',   value: 18,  color: '#EE5D50',  pct: (18/195)*100  },
        { label: 'Awaiting',   value: 20,  color: '#2B3674',  pct: (20/195)*100  },
        { label: 'Expired',    value: 10,  color: '#FFCA28',  pct: (10/195)*100  },
        { label: 'Suspended',  value: 5,   color: '#E2E8F0',  pct: (5/195)*100   },
      ]
    },
    {
      label: 'DataShare Ltd', total: 87, active: false,
      segments: [
        { label: 'Authorized', value: 40, color: 'linear-gradient(90deg,#4318FF,#6AD2FF)', pct: (40/87)*100 },
        { label: 'Revoked',    value: 15, color: '#FA9E93',  pct: (15/87)*100  },
        { label: 'Rejected',   value: 12, color: '#EE5D50',  pct: (12/87)*100  },
        { label: 'Awaiting',   value: 10, color: '#2B3674',  pct: (10/87)*100  },
        { label: 'Expired',    value: 7,  color: '#FFCA28',  pct: (7/87)*100   },
        { label: 'Suspended',  value: 3,  color: '#E2E8F0',  pct: (3/87)*100   },
      ]
    },
  ];

  private readonly baseTooltip: any = {
    enabled: true,
    backgroundColor: '#1A1D3A',
    titleColor: '#ffffff',
    bodyColor: 'rgba(255,255,255,0.7)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    padding: 12,
    cornerRadius: 10,
    displayColors: true,
    usePointStyle: true,
    titleFont: { family: 'DM Sans', size: 13, weight: 700 },
    bodyFont:  { family: 'DM Sans', size: 12, weight: 500 },
    boxPadding: 4
  };

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
      setTimeout(() => this.initCharts(), 120);
    }, 1000);
  }

  ngAfterViewInit(): void {}

  private initCharts(): void {
    if (!this.consentDonutRef) return;
    this.buildConsentDonut();
    this.buildQuoteLine();
    this.buildApiGauge();
  }

  // ── 1. Consent Donut (unchanged) ────────────────────────────────────────
  private buildConsentDonut(): void {
    new Chart(this.consentDonutRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.consentLegend.map(l => l.label),
        datasets: [{
          data: this.consentLegend.map(l => l.value),
          backgroundColor: this.consentLegend.map(l => l.color),
          borderColor: '#fff',
          borderWidth: 3,
          hoverBorderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            ...this.baseTooltip,
            callbacks: { label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed} consents` }
          },
          // @ts-ignore
          donutCenterText: { text: '700', sub: 'total' }
        },
        animation: { duration: 900, easing: 'easeOutQuart' }
      }
    });
  }

  // ── FIX 2: Quote Traffic — Jan–May only, future months stripped ─────────
  private buildQuoteLine(): void {
    new Chart(this.quoteLineRef.nativeElement, {
      type: 'bar',
      data: {
        // Only 5 months shown — no empty 10-month stretch
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
        datasets: [
          {
            label: 'Quote Generation',
            data: [0, 480, 0, 0, 0],
            backgroundColor: (ctx2: any) => {
              const { chart } = ctx2;
              const { chartArea } = chart;
              if (!chartArea) return '#4318FF';
              const g = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              g.addColorStop(0, '#4318FF');
              g.addColorStop(1, 'rgba(67,24,255,0.35)');
              return g;
            },
            borderRadius: { topLeft: 7, topRight: 7 },
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.65,
          },
          {
            label: 'Quote Acceptance',
            data: [0, 290, 0, 0, 0],
            backgroundColor: (ctx2: any) => {
              const { chart } = ctx2;
              const { chartArea } = chart;
              if (!chartArea) return '#05CD99';
              const g = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              g.addColorStop(0, '#05CD99');
              g.addColorStop(1, 'rgba(5,205,153,0.35)');
              return g;
            },
            borderRadius: { topLeft: 7, topRight: 7 },
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.65,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            ...this.baseTooltip,
            callbacks: { label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y}` }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: (ctx: any) => {
                // FEB (index 1) gets full color, others are muted to signal "no data"
                return ctx.index === 1 ? '#2B3674' : '#D0D5E8';
              },
              font: { family: 'DM Sans', size: 11, weight: 600 }
            }
          },
          y: {
            max: 550,
            beginAtZero: true,
            border: { display: false },
            grid: { color: 'rgba(163,174,208,0.1)' },
            ticks: {
              color: '#A3AED0',
              padding: 10,
              font: { family: 'DM Sans', size: 10, weight: 500 }
            }
          }
        },
        animation: { duration: 1000, easing: 'easeOutQuart' }
      }
    });
  }

  // ── 5. API Success — Animated Arc Gauge (pure canvas, unchanged) ────────
  private buildApiGauge(): void {
    const canvas = this.apiSuccessGaugeRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const size = 220;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2, r = 80, trackW = 14;
    const startAngle = Math.PI * 0.75, fullSweep = Math.PI * 1.5;
    const targetPct = 0.942, failPct = 1 - targetPct;
    const duration = 1400, startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const ticks = [0, 0.25, 0.5, 0.75, 1];

    const draw = (now: number) => {
      const progress = Math.min(ease((now - startTime) / duration), 1);
      const sp = progress * targetPct;
      ctx.clearRect(0, 0, size, size);

      // Glow ring
      const glowGrad = ctx.createRadialGradient(cx, cy, r - 20, cx, cy, r + 20);
      glowGrad.addColorStop(0, 'rgba(66,205,126,0.0)');
      glowGrad.addColorStop(0.5, 'rgba(66,205,126,0.06)');
      glowGrad.addColorStop(1, 'rgba(66,205,126,0.0)');
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = glowGrad; ctx.lineWidth = 30; ctx.stroke();

      // Track
      ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, startAngle + fullSweep);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

      // Failure arc
      const failEnd = startAngle + fullSweep;
      ctx.beginPath(); ctx.arc(cx, cy, r, failEnd - failPct * fullSweep, failEnd);
      ctx.strokeStyle = 'rgba(238,93,80,0.55)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

      // Success arc + glow
      const successEnd = startAngle + sp * fullSweep;
      const ag = ctx.createLinearGradient(
        cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle),
        cx + r * Math.cos(successEnd),  cy + r * Math.sin(successEnd)
      );
      ag.addColorStop(0, '#4318FF'); ag.addColorStop(0.5, '#42CD7E'); ag.addColorStop(1, '#00F5A0');
      ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, successEnd);
      ctx.strokeStyle = ag; ctx.lineWidth = trackW; ctx.lineCap = 'round';
      ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 18; ctx.stroke(); ctx.shadowBlur = 0;

      // Tip dot
      ctx.beginPath();
      ctx.arc(cx + r * Math.cos(successEnd), cy + r * Math.sin(successEnd), 6, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 16;
      ctx.fill(); ctx.shadowBlur = 0;

      // Tick marks
      ticks.forEach(t => {
        const a = startAngle + t * fullSweep;
        ctx.beginPath();
        ctx.moveTo(cx + (r - trackW/2 - 6) * Math.cos(a), cy + (r - trackW/2 - 6) * Math.sin(a));
        ctx.lineTo(cx + (r + trackW/2 + 6) * Math.cos(a), cy + (r + trackW/2 + 6) * Math.sin(a));
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.lineCap = 'butt'; ctx.stroke();
      });

      // Center text
      const tg = ctx.createLinearGradient(cx - 40, cy - 20, cx + 40, cy + 20);
      tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, '#42CD7E');
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `800 36px "DM Sans", sans-serif`;
      ctx.fillStyle = tg;
      ctx.fillText((Math.round(sp * 942) / 10).toFixed(1) + '%', cx, cy - 8);
      ctx.font = `500 11px "DM Sans", sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText('SUCCESS RATE', cx, cy + 16);

      if (progress < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }
}