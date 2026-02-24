import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
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

      <!-- Header & Selector Row -->
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

      <!-- TOP STAT CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- ── Usage Volume - TPM ─────────────────────────── -->
        <div class="stat-card stat-card--blue">

          <!-- Top row -->
          <div class="flex justify-between items-start relative z-10">
            <div>
              <span class="stat-card__eyebrow">Usage Volume</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="stat-card__period-dot" style="background:#4318FF"></span>
                <span class="text-[10px] font-semibold text-[#A3AED0]">Last 7 Days</span>
              </div>
            </div>
            <div class="stat-card__icon-ring" style="--ring-color: rgba(67,24,255,0.15); --icon-color: #4318FF">
              <lucide-icon [img]="Activity" class="w-[18px] h-[18px] text-[#4318FF]"></lucide-icon>
            </div>
          </div>

          <!-- Hero number -->
          <div class="relative z-10 mt-3">
            <div class="flex items-baseline gap-1.5">
              <span class="stat-card__hero" style="color:#2B3674">2</span>
              <span class="stat-card__hero-unit" style="color:#4318FF">TPM</span>
            </div>
            <span class="stat-card__label">Average</span>
          </div>

          <!-- Ratio bar -->
          <div class="relative z-10 mt-4">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Max Peak</span>
              <span class="stat-card__peak" style="color:#4318FF">22 TPM</span>
            </div>
            <div class="stat-card__track">
              <div class="stat-card__fill" style="width: 9.1%; background: linear-gradient(90deg, #4318FF88, #4318FF);"></div>
              <div class="stat-card__fill-glow" style="left: 9.1%; background: #4318FF;"></div>
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-[9px] text-[#A3AED0]">0</span>
              <span class="text-[9px] text-[#A3AED0]">Avg is 9% of peak</span>
            </div>
          </div>

          <!-- Sparkline -->
          <div class="absolute inset-x-0 bottom-0 h-12 opacity-25 z-0 pointer-events-none">
            <canvas #usageSparkline class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- ── Response Time - MS ─────────────────────────── -->
        <div class="stat-card stat-card--green">

          <!-- Top row -->
          <div class="flex justify-between items-start relative z-10">
            <div>
              <span class="stat-card__eyebrow">Response Time</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="stat-card__period-dot" style="background:#05CD99"></span>
                <span class="text-[10px] font-semibold text-[#A3AED0]">Last 7 Days</span>
              </div>
            </div>
            <div class="stat-card__icon-ring" style="--ring-color: rgba(5,205,153,0.15); --icon-color: #05CD99">
              <lucide-icon [img]="Clock" class="w-[18px] h-[18px] text-[#05CD99]"></lucide-icon>
            </div>
          </div>

          <!-- Hero number -->
          <div class="relative z-10 mt-3">
            <div class="flex items-baseline gap-1.5">
              <span class="stat-card__hero" style="color:#2B3674">24,227</span>
              <span class="stat-card__hero-unit" style="color:#05CD99">ms</span>
            </div>
            <span class="stat-card__label">Average</span>
          </div>

          <!-- Max callout — split layout with warning pill -->
          <div class="relative z-10 mt-4 flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider block mb-1">Peak Maximum</span>
              <div class="flex items-baseline gap-1">
                <span class="text-[22px] font-black leading-none" style="color:#FF5252; letter-spacing:-0.03em">4.6M</span>
                <span class="text-[11px] font-bold text-[#FF5252]/60">ms</span>
              </div>
            </div>
            <!-- Spike indicator -->
            <div class="flex flex-col items-center gap-1">
              <div class="spike-pill">
                <span class="spike-dot"></span>
                <span>×190 avg</span>
              </div>
              <span class="text-[9px] text-[#A3AED0] text-center leading-tight">peak spike<br>detected</span>
            </div>
          </div>

          <!-- Ratio bar — avg vs max -->
          <div class="relative z-10 mt-3">
            <div class="stat-card__track">
              <div class="stat-card__fill" style="width: 0.53%; background: linear-gradient(90deg, #05CD9966, #05CD99);"></div>
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-[9px] text-[#A3AED0]">avg 24k</span>
              <span class="text-[9px] text-[#FF5252]/70 font-semibold">max 4.6M ms</span>
            </div>
          </div>

          <!-- Sparkline -->
          <div class="absolute inset-x-0 bottom-0 h-12 opacity-25 z-0 pointer-events-none">
            <canvas #responseSparkline class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- API Groups -->
        <div class="stat-card" style="padding: 22px;">
          <div class="flex justify-between items-start relative z-10 mb-3">
            <div>
              <span class="stat-card__eyebrow">By API Groups</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="stat-card__period-dot" style="background:#FF8F0C"></span>
                <span class="text-[10px] font-semibold text-[#A3AED0]">Last 7 Days</span>
              </div>
            </div>
            <div class="stat-card__icon-ring" style="--ring-color: rgba(255,143,12,0.15);">
              <lucide-icon [img]="PieChart" class="w-[18px] h-[18px] text-[#FF8F0C]"></lucide-icon>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center relative min-h-[140px] z-10">
            <canvas #groupsDonut></canvas>
          </div>
        </div>

      </div>

      <!-- Bottom Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        <!-- Daily Stats -->
        <div class="stat-card lg:col-span-1" style="padding: 22px;">
          <div class="flex justify-between items-start relative z-10 mb-4 pb-3 border-b border-white/40">
            <div>
              <span class="stat-card__eyebrow">Daily Stats</span>
            </div>
            <div class="stat-card__icon-ring" style="--ring-color: rgba(163,174,208,0.12);">
              <lucide-icon [img]="Info" class="w-[18px] h-[18px] text-[#A3AED0]"></lucide-icon>
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#FF5252] mb-0.5">Average response time</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">In Milliseconds</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">21,691</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#FF8F0C] mb-0.5">Total API Calls</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">Including 2xx, 4xx and 5xx</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">36</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#05CD99] mb-0.5">Successful API Calls</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">Total 2xx API Calls</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">31</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#FF5252] mb-0.5">Client Error</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">Total 4xx API Calls</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">0</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <h4 class="text-xs font-bold text-[#4318FF] mb-0.5">System Error</h4>
                <p class="text-[10px] text-[#A3AED0] font-medium">Total 5xx API Calls</p>
              </div>
              <span class="text-sm font-extrabold text-[#2B3674]">5</span>
            </div>
          </div>
        </div>

        <!-- RADIAL CLOCK CHART -->
        <div class="stat-card lg:col-span-2" style="padding: 22px;">
          <div class="flex justify-between items-start relative z-10 mb-4 pb-3 border-b border-white/40">
            <div>
              <span class="stat-card__eyebrow">API Status Chart — Monthly</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="stat-card__period-dot" style="background:#4318FF"></span>
                <span class="text-[10px] font-semibold text-[#A3AED0]">Radial clock · hover a month to inspect</span>
              </div>
            </div>
            <div class="stat-card__icon-ring" style="--ring-color: rgba(67,24,255,0.12);">
              <lucide-icon [img]="BarChart3" class="w-[18px] h-[18px] text-[#4318FF]"></lucide-icon>
            </div>
          </div>

          <div class="relative flex-1 min-h-[320px]">
            <canvas
              #monthlyCanvas
              class="w-full h-full cursor-pointer"
              (mousemove)="onRadialHover($event)"
              (mouseleave)="onRadialLeave()"
            ></canvas>

            <div class="monthly-tooltip" [class.visible]="tooltipVisible"
                 [style.left.px]="tooltipX" [style.top.px]="tooltipY">
              <div class="tooltip-month">{{ tooltipData.month }}</div>
              <div class="tooltip-row">
                <span class="dot" style="background:#2B3674"></span>
                <span class="label">Total</span>
                <span class="val">{{ tooltipData.total | number }}</span>
              </div>
              <div class="tooltip-row">
                <span class="dot" style="background:#05CD99"></span>
                <span class="label">Success</span>
                <span class="val">{{ tooltipData.success | number }}</span>
              </div>
              <div class="tooltip-row">
                <span class="dot" style="background:#FF8F0C"></span>
                <span class="label">Failed</span>
                <span class="val">{{ tooltipData.failed | number }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-6 pt-1 relative z-10">
            <div class="flex items-center gap-2">
              <span class="legend-swatch" style="background:#2B3674"></span>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Total API Calls</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="legend-swatch" style="background:#05CD99"></span>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Successful</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="legend-swatch" style="background:#FF8F0C"></span>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Failed</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    /* ── Stat Cards ─────────────────────────────────── */
    .stat-card {
      position: relative;
      overflow: hidden;
      border-radius: 24px;
      padding: 22px 22px 52px;
      display: flex;
      flex-direction: column;
      min-height: 210px;

      background: linear-gradient(145deg,
        rgba(255,255,255,0.92) 0%,
        rgba(255,255,255,0.72) 60%,
        rgba(240,245,255,0.68) 100%
      );
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.55);
      border-top: 1.5px solid rgba(255,255,255,0.98);
      box-shadow:
        0 2px 0 rgba(255,255,255,0.9) inset,
        0 14px 40px -10px rgba(112,144,176,0.15),
        0 4px 12px -4px rgba(112,144,176,0.08);
    }

    /* Icon ring */
    .stat-card__icon-ring {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px; height: 38px;
      border-radius: 14px;
      background: var(--ring-color, rgba(163,174,208,0.1));
      border: 1.5px solid rgba(255,255,255,0.8);
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      flex-shrink: 0;
      position: relative;
      z-index: 10;
    }

    /* Eyebrow label */
    .stat-card__eyebrow {
      font-size: 11px;
      font-weight: 800;
      color: #A3AED0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Period dot */
    .stat-card__period-dot {
      display: inline-block;
      width: 5px; height: 5px;
      border-radius: 50%;
      opacity: 0.7;
    }

    /* Hero number */
    .stat-card__hero {
      font-size: 36px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.04em;
    }
    .stat-card__hero-unit {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.01em;
      opacity: 0.75;
      margin-bottom: 2px;
    }
    .stat-card__label {
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #A3AED0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 2px;
    }
    .stat-card__peak {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    /* Progress track */
    .stat-card__track {
      position: relative;
      height: 5px;
      background: rgba(163,174,208,0.15);
      border-radius: 99px;
      overflow: visible;
    }
    .stat-card__fill {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      border-radius: 99px;
      transition: width 1s cubic-bezier(.2,1,.2,1);
    }
    .stat-card__fill-glow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 8px; height: 8px;
      border-radius: 50%;
      margin-left: -4px;
      box-shadow: 0 0 8px 2px currentColor;
      opacity: 0.8;
    }

    /* Spike warning pill */
    .spike-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,82,82,0.08);
      border: 1px solid rgba(255,82,82,0.2);
      border-radius: 99px;
      padding: 3px 8px;
      font-size: 9px;
      font-weight: 800;
      color: #FF5252;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .spike-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #FF5252;
      animation: spikePulse 1.4s ease-in-out infinite;
    }
    @keyframes spikePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }

    .monthly-tooltip {
      position: absolute;
      pointer-events: none;
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(200,210,240,0.5);
      border-radius: 14px;
      padding: 10px 14px;
      box-shadow: 0 16px 40px rgba(43,54,116,0.16);
      opacity: 0;
      transform: translateY(8px) scale(0.94);
      transition: opacity 0.2s, transform 0.2s;
      min-width: 148px;
      z-index: 50;
    }
    .monthly-tooltip.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .tooltip-month {
      font-size: 11px; font-weight: 800;
      color: #2B3674; letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 7px; padding-bottom: 6px;
      border-bottom: 1px solid #f0f3ff;
    }
    .tooltip-row {
      display: flex; align-items: center;
      gap: 6px; margin-bottom: 4px; font-size: 11px;
    }
    .tooltip-row .dot  { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
    .tooltip-row .label{ color:#A3AED0; font-weight:600; flex:1; }
    .tooltip-row .val  { font-weight:800; color:#2B3674; }

    .legend-swatch {
      display: inline-block; width: 18px; height: 6px; border-radius: 3px;
    }
  `]
})
export class ApiMonitoringComponent implements AfterViewInit, OnDestroy {
  @ViewChild('usageSparkline')    usageSparklineRef!:    ElementRef<HTMLCanvasElement>;
  @ViewChild('responseSparkline') responseSparklineRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('groupsDonut')       groupsDonutRef!:       ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyCanvas')     monthlyCanvasRef!:     ElementRef<HTMLCanvasElement>;

  readonly ChevronDown = ChevronDown;
  readonly Activity    = Activity;
  readonly Clock       = Clock;
  readonly PieChart    = PieChart;
  readonly BarChart3   = BarChart3;
  readonly Info        = Info;

  tooltipVisible = false;
  tooltipX = 0; tooltipY = 0;
  tooltipData = { month: '', total: 0, success: 0, failed: 0 };

  private readonly months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  private readonly total   = [1100,1500,1200,1350,1600,1400,1450,1300,1550,1400,1650,1500];
  private readonly success = [ 950,1320,1050,1200,1450,1200,1300,1150,1400,1250,1500,1350];
  private readonly failed  = [ 150, 180, 150, 150, 150, 200, 150, 150, 150, 150, 150, 150];

  private animFrame: number | null = null;
  private animProgress = 0;
  private pulseT = 0;
  private hoveredSlice = -1;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.buildSparkline(this.usageSparklineRef.nativeElement, '#4318FF', [12,15,18,14,22,19,21]);
    this.buildSparkline(this.responseSparklineRef.nativeElement, '#05CD99', [24000,26000,22000,25000,28000,23000,24227]);
    this.buildDonut();
    this.initRadialCanvas();
  }

  ngOnDestroy(): void {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  // ─────────────────────────────────────────────────────────────────
  //  RADIAL CLOCK CHART — Pure canvas, no Chart.js
  // ─────────────────────────────────────────────────────────────────

  private initRadialCanvas(): void {
    const canvas = this.monthlyCanvasRef.nativeElement;
    const setSize = () => {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width  = rect.width  + 'px';
      canvas.style.height = rect.height + 'px';
      canvas.getContext('2d')!.scale(dpr, dpr);
    };
    setSize();
    this.resizeObserver = new ResizeObserver(() => { setSize(); this.animProgress = 0; });
    this.resizeObserver.observe(canvas.parentElement!);

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.drawRadial(canvas);
        this.animFrame = requestAnimationFrame(loop);
      };
      this.animFrame = requestAnimationFrame(loop);
    });
  }

  private drawRadial(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')!;
    const W = parseFloat(canvas.style.width  || '600');
    const H = parseFloat(canvas.style.height || '320');
    ctx.clearRect(0, 0, W, H);

    if (this.animProgress < 1) this.animProgress = Math.min(1, this.animProgress + 0.016);
    this.pulseT += 0.025;
    const ease = this.easeOutExpo(this.animProgress);

    const cx = W / 2;
    const cy = H / 2;
    const maxR  = Math.min(W, H) / 2 - 26;
    const holeR = maxR * 0.28;
    const ringW = (maxR - holeR - 12) / 3;
    const gap   = 4;

    const rings = [
      { data: this.total,   color: '#2B3674', glow: 'rgba(43,54,116,0.5)',  innerR: holeR,              outerR: holeR + ringW - gap },
      { data: this.success, color: '#05CD99', glow: 'rgba(5,205,153,0.5)',  innerR: holeR + ringW,      outerR: holeR + ringW * 2 - gap },
      { data: this.failed,  color: '#FF8F0C', glow: 'rgba(255,143,12,0.5)', innerR: holeR + ringW * 2,  outerR: holeR + ringW * 3 - gap },
    ];

    const n = 12;
    const sliceAngle = (Math.PI * 2) / n;
    const startOffset = -Math.PI / 2;
    const sliceGap = 0.05;

    // ── Ghost ring tracks ──────────────────────────────
    for (const ring of rings) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, ring.outerR, 0, Math.PI * 2);
      ctx.arc(cx, cy, ring.innerR, 0, Math.PI * 2, true);
      ctx.fillStyle = 'rgba(163,174,208,0.05)';
      ctx.fill();
      ctx.restore();

      // Ring label at 12 o'clock, just outside ring
      const labelAngle = startOffset - 0.01;
      const labelR = (ring.innerR + ring.outerR) / 2;
      ctx.save();
      ctx.translate(cx + Math.cos(labelAngle) * labelR, cy + Math.sin(labelAngle) * labelR - 9);
      ctx.textAlign = 'center';
      ctx.fillStyle = ring.color + '88';
      ctx.font = '500 8px system-ui';
      ctx.fillText(
        ring === rings[0] ? 'TOTAL' : ring === rings[1] ? 'OK' : 'ERR',
        0, 0
      );
      ctx.restore();
    }

    // ── Radial separator lines ─────────────────────────
    for (let i = 0; i < n; i++) {
      const angle = startOffset + sliceAngle * i;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * (holeR - 2), cy + Math.sin(angle) * (holeR - 2));
      ctx.lineTo(cx + Math.cos(angle) * (maxR + 2),  cy + Math.sin(angle) * (maxR + 2));
      ctx.strokeStyle = 'rgba(163,174,208,0.1)';
      ctx.lineWidth   = 1;
      ctx.stroke();
      ctx.restore();
    }

    // ── Draw bars per ring per month ───────────────────
    for (const ring of rings) {
      const maxVal = Math.max(...ring.data);

      for (let i = 0; i < n; i++) {
        const ratio  = (ring.data[i] / maxVal) * ease;
        const isHov  = this.hoveredSlice === i;
        const a0 = startOffset + sliceAngle * i + sliceGap / 2;
        const a1 = startOffset + sliceAngle * (i + 1) - sliceGap / 2;

        // Background track segment
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, ring.outerR, a0, a1);
        ctx.arc(cx, cy, ring.innerR, a1, a0, true);
        ctx.closePath();
        ctx.fillStyle = isHov ? 'rgba(163,174,208,0.12)' : 'rgba(163,174,208,0.06)';
        ctx.fill();
        ctx.restore();

        // Value bar
        const barOut = ring.innerR + (ring.outerR - ring.innerR) * ratio;
        if (barOut <= ring.innerR + 0.5) continue;

        const midAngle = (a0 + a1) / 2;
        const gx0 = cx + Math.cos(midAngle) * ring.innerR;
        const gy0 = cy + Math.sin(midAngle) * ring.innerR;
        const gx1 = cx + Math.cos(midAngle) * barOut;
        const gy1 = cy + Math.sin(midAngle) * barOut;

        const grad = ctx.createLinearGradient(gx0, gy0, gx1, gy1);
        grad.addColorStop(0,   ring.color + '66');
        grad.addColorStop(0.5, ring.color + 'bb');
        grad.addColorStop(1,   ring.color + (isHov ? 'ff' : 'dd'));

        ctx.save();
        if (isHov) { ctx.shadowColor = ring.glow; ctx.shadowBlur = 16; }
        ctx.beginPath();
        ctx.arc(cx, cy, barOut,      a0, a1);
        ctx.arc(cx, cy, ring.innerR, a1, a0, true);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright outer edge
        ctx.beginPath();
        ctx.arc(cx, cy, barOut - 0.5, a0 + 0.015, a1 - 0.015);
        ctx.strokeStyle = ring.color + (isHov ? 'ff' : '88');
        ctx.lineWidth   = isHov ? 2 : 1.2;
        ctx.stroke();
        ctx.restore();
      }
    }

    // ── Hovered slice full highlight ───────────────────
    if (this.hoveredSlice >= 0) {
      const i  = this.hoveredSlice;
      const a0 = startOffset + sliceAngle * i + sliceGap / 2;
      const a1 = startOffset + sliceAngle * (i + 1) - sliceGap / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, maxR + 6, a0, a1);
      ctx.arc(cx, cy, holeR - 2, a1, a0, true);
      ctx.closePath();
      ctx.fillStyle   = 'rgba(67,24,255,0.035)';
      ctx.strokeStyle = 'rgba(67,24,255,0.18)';
      ctx.lineWidth   = 1.5;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // ── Center circle ──────────────────────────────────
    const pulse = 1 + Math.sin(this.pulseT) * 0.025;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, holeR * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(67,24,255,0.07)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    const cGrad = ctx.createRadialGradient(cx - 4, cy - 6, 0, cx, cy, holeR - 2);
    cGrad.addColorStop(0, 'rgba(255,255,255,0.98)');
    cGrad.addColorStop(1, 'rgba(238,242,255,0.90)');
    ctx.beginPath();
    ctx.arc(cx, cy, holeR - 2, 0, Math.PI * 2);
    ctx.fillStyle   = cGrad;
    ctx.shadowColor = 'rgba(67,24,255,0.12)';
    ctx.shadowBlur  = 20;
    ctx.fill();
    ctx.restore();

    // Center text
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (this.hoveredSlice >= 0) {
      const i = this.hoveredSlice;
      ctx.fillStyle = '#4318FF';
      ctx.font      = '800 12px system-ui';
      ctx.fillText(this.months[i], cx, cy - 13);
      ctx.fillStyle = '#2B3674';
      ctx.font      = '900 17px system-ui';
      ctx.fillText(this.total[i].toLocaleString(), cx, cy + 4);
      ctx.fillStyle = '#A3AED0';
      ctx.font      = '600 8px system-ui';
      ctx.fillText('TOTAL CALLS', cx, cy + 19);
    } else {
      ctx.fillStyle = '#A3AED0';
      ctx.font      = '700 9px system-ui';
      ctx.fillText('12 MONTHS', cx, cy - 8);
      ctx.fillStyle = '#2B3674';
      ctx.font      = '900 19px system-ui';
      ctx.fillText('2024', cx, cy + 9);
    }
    ctx.restore();

    // ── Month labels ────────────────────────────────────
    for (let i = 0; i < n; i++) {
      const mid    = startOffset + sliceAngle * i + sliceAngle / 2;
      const labelR = maxR + 15;
      const lx = cx + Math.cos(mid) * labelR;
      const ly = cy + Math.sin(mid) * labelR;
      const isHov = this.hoveredSlice === i;

      ctx.save();
      ctx.translate(lx, ly);
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isHov ? '#4318FF' : 'rgba(163,174,208,0.85)';
      ctx.font      = `${isHov ? 800 : 600} 10px system-ui`;
      ctx.fillText(this.months[i], 0, 0);
      ctx.restore();
    }
  }

  private easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  onRadialHover(e: MouseEvent): void {
    const canvas = this.monthlyCanvasRef.nativeElement;
    const rect   = canvas.getBoundingClientRect();
    const W = parseFloat(canvas.style.width  || '600');
    const H = parseFloat(canvas.style.height || '320');
    const cx = W / 2, cy = H / 2;
    const mx = e.clientX - rect.left - cx;
    const my = e.clientY - rect.top  - cy;
    const dist = Math.sqrt(mx * mx + my * my);
    const maxR  = Math.min(W, H) / 2 - 26;
    const holeR = maxR * 0.28;

    if (dist < holeR || dist > maxR + 8) { this.onRadialLeave(); return; }

    let angle = Math.atan2(my, mx) - (-Math.PI / 2);
    if (angle < 0) angle += Math.PI * 2;
    const i = Math.max(0, Math.min(11, Math.floor(angle / (Math.PI * 2 / 12))));
    this.hoveredSlice = i;

    this.ngZone.run(() => {
      this.tooltipData = {
        month: this.months[i], total: this.total[i],
        success: this.success[i], failed: this.failed[i],
      };
      this.tooltipX = Math.min(e.clientX - rect.left + 16, W - 160);
      this.tooltipY = Math.max(e.clientY - rect.top  - 80, 8);
      this.tooltipVisible = true;
    });
  }

  onRadialLeave(): void {
    this.hoveredSlice = -1;
    this.ngZone.run(() => { this.tooltipVisible = false; });
  }

  // ── Sparklines ────────────────────────────────────
  private buildSparkline(canvas: HTMLCanvasElement, color: string, data: number[]): void {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          backgroundColor: (ctx) => {
            const { ctx: c, chartArea } = ctx.chart;
            if (!chartArea) return undefined;
            const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            g.addColorStop(0, color + '25');
            g.addColorStop(1, color + '00');
            return g;
          },
          tension: 0.4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        interaction: { intersect: false }
      }
    });
  }

  // ── Donut ─────────────────────────────────────────
  private buildDonut(): void {
    new Chart(this.groupsDonutRef.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ['Search','Auth','Payments','Users','Orders','Analytics'],
        datasets: [{
          data: [35,20,15,12,10,8],
          backgroundColor: [
            'rgba(67,24,255,0.7)', 'rgba(5,205,153,0.7)',
            'rgba(255,143,12,0.7)', 'rgba(238,93,80,0.7)',
            'rgba(124,92,255,0.7)', 'rgba(163,174,208,0.7)',
          ],
          borderColor: '#fff', borderWidth: 2
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: {
          r: {
            grid: { color: 'rgba(163,174,208,0.1)' },
            ticks: { display: false },
            angleLines: { color: 'rgba(163,174,208,0.1)' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#2B3674', bodyColor: '#2B3674',
            borderColor: '#E2E8F0', borderWidth: 1,
            usePointStyle: true, bodyFont: { weight: 'bold' }
          }
        },
        animation: { duration: 1500, easing: 'easeOutElastic' }
      }
    });
  }
}