import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],

  // ─── ALL CSS HERE — never inside template`` when using @keyframes ───
  // @keyframes inside a template literal confuses the TS decorator parser
  // and produces "Type has no call signatures" errors.
  styles: [`
    :host { display: block; }

    @keyframes cardIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes iconPop {
      0%   { transform: scale(0.7); opacity: 0; }
      70%  { transform: scale(1.12); }
      100% { transform: scale(1);   opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes skeletonMove {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    .card {
      animation: cardIn 0.5s cubic-bezier(.2,1,.2,1) both;
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(.2,1,.2,1);
      
      /* Glossy Glass Background */
      background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      
      /* Glass Borders / Highlights */
      border: 1px solid rgba(255,255,255,0.4);
      border-top: 1px solid rgba(255,255,255,0.95);
      border-bottom: 1px solid rgba(255,255,255,0.3);
      
      box-shadow: 
        0 10px 30px -10px rgba(112, 144, 176, 0.12),
        0 4px 6px -4px rgba(112, 144, 176, 0.05);
    }

    /* Accent Pill */
    .card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 32px;
      background: var(--accent);
      border-radius: 0 4px 4px 0;
      box-shadow: 2px 0 8px var(--accent); /* Glow from the pill */
      z-index: 5;
      opacity: 0.8;
      transition: all 0.3s;
    }

    /* Spotlight gradient */
    .card::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: inherit;
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
        rgba(255, 255, 255, 0.5), 
        transparent 40%
      );
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
      z-index: 0;
    }

    .card:hover {
      transform: translateY(-5px);
      background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%);
      box-shadow: 
        0 20px 40px -12px rgba(112, 144, 176, 0.22),
        0 0 0 1px rgba(255, 255, 255, 0.8) inset;
    }
    
    .card:hover::before {
      height: 48px; /* Pill grows on hover */
      opacity: 1;
      width: 5px;
    }
    
    .card:hover::after { opacity: 1; }

    .content-wrapper {
      position: relative;
      z-index: 10;
    }

    .count-val {
      animation: countUp 0.8s cubic-bezier(.2,1,.2,1) 0.1s both;
      display: inline-block;
      color: #1B2559;
      letter-spacing: -0.04em;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05)); /* Subtle depth for text */
    }

    .icon-wrap {
      animation: iconPop 0.6s cubic-bezier(.34,1.56,.64,1) 0.2s both;
      transition: all 0.3s cubic-bezier(.2,1,.2,1);
      position: relative;
      z-index: 10;
      /* Icon Pop Border */
      border: 3px solid rgba(255,255,255,0.6);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    
    .card:hover .icon-wrap { 
      transform: scale(1.15) rotate(8deg);
      border-color: rgba(255,255,255,1);
      box-shadow: 0 12px 20px -8px var(--accent) !important; /* Glows with accent color */
    }

    .title-text { 
      transition: color 0.3s; 
      letter-spacing: 0.1em;
    }
    .card:hover .title-text { color: #4318FF; }

    .skeleton {
      background: linear-gradient(90deg, rgba(244,247,254,0.4) 25%, rgba(244,247,254,0.8) 50%, rgba(244,247,254,0.4) 75%);
      background-size: 200% 100%;
      animation: skeletonMove 1.5s infinite linear;
      border-radius: 12px;
    }
  `],

  template: `
    <div
      class="card flex min-h-[110px] items-center rounded-[30px] px-6 py-5 gap-5"
      [style.--accent]="accentColor"
      [style.animation-delay]="animDelay"
      (mousemove)="onMouseMove($event)"
      #cardRef
    >
      @if (loading) {
        <div class="skeleton h-14 w-14 rounded-2xl flex-shrink-0 z-10"></div>
        <div class="flex flex-col gap-3 w-full z-10">
          <div class="skeleton h-3 w-24 rounded-full"></div>
          <div class="skeleton h-10 w-20 rounded-lg"></div>
        </div>
      } @else {
        <div
          class="icon-wrap flex h-[60px] w-[60px] items-center justify-center rounded-[18px]"
          [ngClass]="[iconBgColor, iconColor]"
          [style.box-shadow]="iconShadow"
        >
          @switch (iconType) {
            @case ('chart') {
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            }
            @case ('alert') {
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
            }
            @case ('time') {
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            }
            @case ('pause') {
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            }
            @case ('description') {
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            }
            @default {
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            }
          }
        </div>

        <div class="flex flex-col flex-1 min-w-0 content-wrapper">
          <h4 class="title-text text-[11px] font-bold text-[#A3AED0] uppercase mb-1">
            {{ title }}
          </h4>
          <div 
            class="count-val font-black leading-none"
            [style.font-size.px]="getFontSize()"
            [style.letter-spacing]="getLetterSpacing()"
          >
            {{ displayCount }}
          </div>
          @if (subtitle) {
            <p class="text-[11px] font-medium text-gray-400 mt-1 leading-tight">{{ subtitle }}</p>
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
    'bg-blue-100': '#3b82f6',
    'bg-green-100': '#10b981',
    'bg-emerald-100': '#10b981',
    'bg-amber-100': '#f59e0b',
    'bg-red-100': '#ef4444',
    'bg-purple-100': '#8b5cf6',
    'bg-indigo-100': '#6366f1',
    'bg-orange-100': '#f97316',
    'bg-gray-100': '#d1d5db',
  };

  get accentColor(): string {
    return this.accentMap[this.iconBgColor] ?? '#e5e7eb';
  }

  get iconShadow(): string {
    const map: Record<string, string> = {
      'bg-blue-100': '0 4px 14px rgba(59,130,246,0.25)',
      'bg-green-100': '0 4px 14px rgba(16,185,129,0.25)',
      'bg-amber-100': '0 4px 14px rgba(245,158,11,0.25)',
      'bg-red-100': '0 4px 14px rgba(239,68,68,0.25)',
      'bg-purple-100': '0 4px 14px rgba(139,92,246,0.25)',
      'bg-indigo-100': '0 4px 14px rgba(99,102,241,0.25)',
      'bg-orange-100': '0 4px 14px rgba(249,115,22,0.25)',
      'bg-emerald-100': '0 4px 14px rgba(16,185,129,0.25)',
    };
    return map[this.iconBgColor] ?? '0 4px 14px rgba(30,42,90,0.12)';
  }

  ngOnInit(): void { this.animateCount(); }
  ngOnChanges(): void { this.animateCount(); }

  getFontSize(): number {
    const len = this.displayCount.toString().length;
    if (len > 7) return 18;
    if (len > 6) return 20;
    if (len > 5) return 22;
    if (len > 4) return 26;
    return 32;
  }

  getLetterSpacing(): string {
    const len = this.displayCount.toString().length;
    return len > 4 ? '-0.02em' : '-0.03em';
  }

  onMouseMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }

  private animateCount(): void {
    const raw = parseInt(this.count.replace(/\D/g, ''), 10);
    if (isNaN(raw)) { this.displayCount = this.count; return; }

    const steps = 40;
    const interval = 900 / steps;
    let current = 0;
    const suffix = this.count.replace(/[\d,]/g, '');

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