import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],

  styles: [`
    :host {
      display: block;
      perspective: 1200px;
    }

    /* ─── Keyframes ─────────────────────────────────────────────── */
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(22px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes iconPop {
      0%   { transform: scale(0.5) rotate(-12deg); opacity: 0; }
      60%  { transform: scale(1.2) rotate(4deg); }
      80%  { transform: scale(0.95) rotate(-2deg); }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes skeletonMove {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes accentPillIn {
      from { transform: scaleY(0); opacity: 0; }
      to   { transform: scaleY(1); opacity: 1; }
    }
    @keyframes shimmerSweep {
      0%   { transform: translateX(-120%) rotate(25deg); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: translateX(320%) rotate(25deg); opacity: 0; }
    }
    @keyframes ringPulse {
      0%   { transform: scale(1);    opacity: 0.5; }
      100% { transform: scale(1.7);  opacity: 0; }
    }

    /* ─── Base Card ─────────────────────────────────────────────── */
    .card {
      animation: cardIn 0.65s cubic-bezier(.2,1,.2,1) both;
      position: relative;
      overflow: hidden;
      cursor: default;
      transform-style: preserve-3d;
      transform: var(--tilt-transform, rotateX(0deg) rotateY(0deg));
      transition:
        transform 0.12s ease-out,
        box-shadow 0.35s ease,
        background 0.35s ease;

      /* Rich glass */
      background:
        linear-gradient(
          158deg,
          rgba(255,255,255,0.97) 0%,
          rgba(252,253,255,0.88) 55%,
          rgba(246,249,255,0.82) 100%
        );
      backdrop-filter: blur(24px) saturate(2);
      -webkit-backdrop-filter: blur(24px) saturate(2);

      /* Layered border */
      border: 1px solid rgba(255,255,255,0.55);
      border-top: 1.5px solid rgba(255,255,255,0.92);
      border-left: 1px solid rgba(255,255,255,0.75);

      /* Layered shadows for depth */
      box-shadow:
        0 1px 0 rgba(255,255,255,0.95) inset,
        0 0 0 0.5px rgba(180,195,220,0.18),
        0 6px 16px -6px rgba(100,130,180,0.10),
        0 18px 48px -12px rgba(100,130,180,0.13),
        0 1px 3px rgba(100,130,180,0.05);
    }

    /* Subtle noise texture overlay */
    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
      opacity: 0.6;
      pointer-events: none;
      z-index: 0;
    }

    /* Hover glow */
    .card:hover {
      background:
        linear-gradient(
          158deg,
          rgba(255,255,255,1) 0%,
          rgba(255,255,255,0.96) 60%,
          rgba(250,252,255,0.92) 100%
        );
      box-shadow:
        0 1px 0 rgba(255,255,255,0.98) inset,
        0 0 0 0.5px rgba(180,195,220,0.22),
        0 12px 28px -8px rgba(var(--accent-rgb, 67,24,255), 0.12),
        0 32px 80px -16px rgba(var(--accent-rgb, 67,24,255), 0.10),
        0 60px 120px -24px rgba(100,130,180,0.12);
    }

    /* ─── Decorative: shimmer sweep on hover ────────────────────── */
    .shimmer {
      position: absolute;
      top: -60%;
      left: 0;
      width: 45%;
      height: 220%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.55) 50%,
        transparent 100%
      );
      transform: translateX(-120%) rotate(25deg);
      pointer-events: none;
      z-index: 2;
      opacity: 0;
    }

    .card:hover .shimmer {
      animation: shimmerSweep 0.75s cubic-bezier(.4,0,.2,1) forwards;
    }

    /* ─── Spotlight ─────────────────────────────────────────────── */
    .spotlight {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(
        520px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(var(--accent-rgb, 67,24,255), 0.07),
        transparent 50%
      );
      opacity: 0;
      transition: opacity 0.45s;
      pointer-events: none;
      z-index: 1;
    }
    .card:hover .spotlight { opacity: 1; }

    /* ─── Accent Pill ───────────────────────────────────────────── */
    .accent-pill {
      position: absolute;
      left: 0;
      top: 14%;
      bottom: 14%;
      width: 3.5px;
      background: linear-gradient(
        180deg,
        var(--accent-light, #a5b4fc) 0%,
        var(--accent, #4318FF) 100%
      );
      border-radius: 0 3px 3px 0;
      opacity: 0;
      transform: scaleY(0);
      transform-origin: center;
      transition:
        opacity 0.3s ease,
        transform 0.35s cubic-bezier(.34,1.56,.64,1);
      z-index: 3;
    }
    .card:hover .accent-pill {
      opacity: 1;
      transform: scaleY(1);
    }

    /* ─── Bottom accent glow bar ────────────────────────────────── */
    .accent-bar {
      position: absolute;
      bottom: 0;
      left: 20%;
      right: 20%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(var(--accent-rgb, 67,24,255), 0.35),
        transparent
      );
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.4s ease, left 0.4s ease, right 0.4s ease;
      z-index: 3;
    }
    .card:hover .accent-bar {
      opacity: 1;
      left: 10%;
      right: 10%;
    }

    /* ─── Content wrapper (3D depth) ───────────────────────────── */
    .content-wrapper {
      position: relative;
      z-index: 10;
      transform: translateZ(24px);
    }

    /* ─── Count value ───────────────────────────────────────────── */
    .count-val {
      animation: countUp 0.85s cubic-bezier(.2,1,.2,1) both;
      display: inline-block;
      color: #1B2559;
      letter-spacing: -0.04em;
      background: linear-gradient(135deg, #1B2559 0%, #2d3a8c 45%, #4318FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 1px 2px rgba(27,37,89,0.07));
      transition: filter 0.3s ease;
    }

    .card:hover .count-val {
      filter: drop-shadow(0 2px 4px rgba(var(--accent-rgb, 67,24,255), 0.15));
    }

    /* ─── Title ─────────────────────────────────────────────────── */
    .title-text {
      color: #8A98BF;
      transition: color 0.3s ease, letter-spacing 0.3s ease;
      font-weight: 700;
      letter-spacing: 0.10em;
    }
    .card:hover .title-text {
      color: var(--accent);
      letter-spacing: 0.15em;
    }

    /* ─── Icon wrap ─────────────────────────────────────────────── */
    .icon-wrap {
      animation: iconPop 0.65s cubic-bezier(.34,1.56,.64,1) both;
      position: relative;
      z-index: 10;
      border: 1px solid rgba(255,255,255,0.85);
      transition:
        transform 0.4s cubic-bezier(.34,1.56,.64,1),
        box-shadow 0.4s ease;
      /* Inner highlight */
      background-image: linear-gradient(
        145deg,
        rgba(255,255,255,0.65) 0%,
        rgba(255,255,255,0.0) 60%
      ) !important;
      background-blend-mode: overlay;
    }

    .card:hover .icon-wrap {
      transform: scale(1.13) rotate(-6deg) translateZ(8px);
    }

    /* Ring pulse behind icon on hover */
    .icon-ring {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1.5px solid rgba(var(--accent-rgb, 67,24,255), 0.3);
      opacity: 0;
      pointer-events: none;
      z-index: 9;
    }
    .card:hover .icon-ring {
      animation: ringPulse 1s ease-out infinite;
    }

    /* ─── Skeleton ──────────────────────────────────────────────── */
    .skeleton {
      background: linear-gradient(90deg, #F0F4FD 25%, #E2E9F4 50%, #F0F4FD 75%);
      background-size: 200% 100%;
      animation: skeletonMove 1.6s infinite linear;
      border-radius: 12px;
    }

    /* ─── Corner decoration ─────────────────────────────────────── */
    .corner-dot {
      position: absolute;
      top: 14px;
      right: 16px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(var(--accent-rgb, 67,24,255), 0.15);
      transition: background 0.3s, transform 0.3s;
      z-index: 3;
    }
    .card:hover .corner-dot {
      background: rgba(var(--accent-rgb, 67,24,255), 0.45);
      transform: scale(1.4);
    }
  `],

  template: `
    <div
      class="card flex min-h-[120px] items-center rounded-[28px] px-6 py-5 gap-4"
      [style.--accent]="accentColor"
      [style.--accent-light]="accentColorLight"
      [style.animation-delay]="animDelay"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave($event)"
    >
      <!-- Decorative layers -->
      <div class="accent-pill"></div>
      <div class="accent-bar"></div>
      <div class="spotlight"></div>
      <div class="shimmer"></div>
      <div class="corner-dot"></div>

      @if (loading) {
        <div class="skeleton h-14 w-14 rounded-2xl flex-shrink-0 z-10"></div>
        <div class="flex flex-col gap-2 w-full z-10">
          <div class="skeleton h-2.5 w-16 rounded-full"></div>
          <div class="skeleton h-8 w-14 rounded-lg"></div>
        </div>
      } @else {
        <!-- Icon -->
        <div class="relative flex-shrink-0 z-10">
          <div class="icon-ring"></div>
          <div
            class="icon-wrap flex h-[58px] w-[58px] items-center justify-center rounded-[18px]"
            [ngClass]="[iconBgColor, iconColor]"
            [style.box-shadow]="iconShadow"
          >
            @switch (iconType) {
              @case ('chart') {
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              }
              @case ('alert') {
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
              }
              @case ('time') {
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              }
              @case ('pause') {
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              }
              @case ('description') {
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
              }
              @default {
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              }
            }
          </div>
        </div>

        <!-- Text content -->
        <div class="flex flex-col flex-1 min-w-0 content-wrapper">
          <h4 class="title-text text-[10px] font-bold uppercase mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
            {{ title }}
          </h4>
          <div
            class="count-val font-black leading-none whitespace-nowrap"
            [style.font-size.px]="getFontSize()"
            [style.letter-spacing]="getLetterSpacing()"
          >
            {{ displayCount }}
          </div>
          @if (subtitle) {
            <p class="text-[10px] font-medium text-gray-400 mt-0.5 leading-tight truncate">{{ subtitle }}</p>
          }
        </div>
      }
    </div>
  `
})
export class StatsCardComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() count = '';
  @Input() iconType = 'chart';
  @Input() iconBgColor = 'bg-gray-100';
  @Input() iconColor = 'text-navy';
  @Input() subtitle = '';
  @Input() animDelay = '0ms';
  @Input() loading = false;

  displayCount = '';

  private readonly accentMap: Record<string, string> = {
    'bg-blue-100':    '#3b82f6',
    'bg-green-100':   '#10b981',
    'bg-emerald-100': '#10b981',
    'bg-amber-100':   '#f59e0b',
    'bg-red-100':     '#ef4444',
    'bg-purple-100':  '#8b5cf6',
    'bg-indigo-100':  '#6366f1',
    'bg-orange-100':  '#f97316',
    'bg-gray-100':    '#94a3b8',
  };

  private readonly accentLightMap: Record<string, string> = {
    'bg-blue-100':    '#93c5fd',
    'bg-green-100':   '#6ee7b7',
    'bg-emerald-100': '#6ee7b7',
    'bg-amber-100':   '#fcd34d',
    'bg-red-100':     '#fca5a5',
    'bg-purple-100':  '#c4b5fd',
    'bg-indigo-100':  '#a5b4fc',
    'bg-orange-100':  '#fdba74',
    'bg-gray-100':    '#cbd5e1',
  };

  get accentColor(): string {
    return this.accentMap[this.iconBgColor] ?? '#4318FF';
  }

  get accentColorLight(): string {
    return this.accentLightMap[this.iconBgColor] ?? '#E6EBF5';
  }

  private hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  get iconShadow(): string {
    const map: Record<string, string> = {
      'bg-blue-100':    '0 8px 20px -4px rgba(59,130,246,0.30), 0 2px 6px rgba(59,130,246,0.15)',
      'bg-green-100':   '0 8px 20px -4px rgba(16,185,129,0.30), 0 2px 6px rgba(16,185,129,0.15)',
      'bg-amber-100':   '0 8px 20px -4px rgba(245,158,11,0.30), 0 2px 6px rgba(245,158,11,0.15)',
      'bg-red-100':     '0 8px 20px -4px rgba(239,68,68,0.30),  0 2px 6px rgba(239,68,68,0.15)',
      'bg-purple-100':  '0 8px 20px -4px rgba(139,92,246,0.30), 0 2px 6px rgba(139,92,246,0.15)',
      'bg-indigo-100':  '0 8px 20px -4px rgba(99,102,241,0.30), 0 2px 6px rgba(99,102,241,0.15)',
      'bg-orange-100':  '0 8px 20px -4px rgba(249,115,22,0.30), 0 2px 6px rgba(249,115,22,0.15)',
      'bg-emerald-100': '0 8px 20px -4px rgba(16,185,129,0.30), 0 2px 6px rgba(16,185,129,0.15)',
    };
    return map[this.iconBgColor] ?? '0 8px 20px -4px rgba(30,42,90,0.12)';
  }

  ngOnInit(): void  { this.animateCount(); }
  ngOnChanges(): void { this.animateCount(); }

  getFontSize(): number {
    const len = this.displayCount.toString().length;
    if (len > 9) return 18;
    if (len > 7) return 20;
    return 24;
  }

  getLetterSpacing(): string {
    return '-0.02em';
  }

  onMouseMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateY  = ((x - centerX) / centerX) * 9;
    const rotateX  = ((centerY - y) / centerY) * 9;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--tilt-transform', `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    card.style.setProperty('--accent-rgb',   this.hexToRgb(this.accentColor));
    card.style.setProperty('--accent-alpha', `rgba(${this.hexToRgb(this.accentColor)}, 0.2)`);
  }

  onMouseLeave(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--tilt-transform', 'rotateX(0deg) rotateY(0deg)');
  }

  private animateCount(): void {
    const raw = parseInt(this.count.replace(/\D/g, ''), 10);
    if (isNaN(raw)) { this.displayCount = this.count; return; }

    const steps    = 32;
    const interval = 800 / steps;
    let current    = 0;
    const suffix   = this.count.replace(/[\d,]/g, '');

    const timer = setInterval(() => {
      current += raw / steps;
      if (current >= raw) {
        current = raw;
        clearInterval(timer);
      }
      this.displayCount = Math.floor(current).toLocaleString() + suffix;
    }, interval);
  }
}