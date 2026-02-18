import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <style>
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

      .card {
        animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
        position: relative;
        overflow: hidden;
        transition: transform 0.2s cubic-bezier(.22,1,.36,1),
                    box-shadow 0.2s ease;
      }
      .card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(
          135deg,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,0.55) 50%,
          rgba(255,255,255,0) 100%
        );
        background-size: 200% 100%;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
      }
      .card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 28px rgba(30,42,90,0.13), 0 2px 8px rgba(30,42,90,0.07);
      }
      .card:hover::before {
        opacity: 1;
        animation: shimmer 0.65s ease forwards;
      }
      .card:active { transform: translateY(-1px) scale(0.99); }

      .count-val {
        animation: countUp 0.45s cubic-bezier(.22,1,.36,1) 0.1s both;
        display: inline-block;
      }

      .icon-wrap {
        animation: iconPop 0.45s cubic-bezier(.22,1,.36,1) 0.15s both;
        transition: transform 0.2s cubic-bezier(.22,1,.36,1);
        flex-shrink: 0;
      }
      .card:hover .icon-wrap { transform: scale(1.1) rotate(-4deg); }

      .title-text {
        transition: color 0.2s;
      }
      .card:hover .title-text { color: #6b7280; }


    </style>

    <div
      class="card flex h-[100px] items-center justify-between rounded-[20px] bg-white px-6 py-4 shadow-sm"
      [style.animation-delay]="animDelay"
    >
      <!-- Left: title + count -->
      <div class="flex flex-col min-w-0">
        <h4 class="title-text text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 truncate">
          {{ title }}
        </h4>
        <div class="count-val text-2xl font-bold text-navy tabular-nums">
          {{ displayCount }}
        </div>
        @if (subtitle) {
          <p class="text-[11px] text-gray-400 mt-0.5 truncate">{{ subtitle }}</p>
        }
      </div>

      <!-- Right: icon -->
      <div
        class="icon-wrap flex h-12 w-12 items-center justify-center rounded-2xl"
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
  `
})
export class StatsCardComponent implements OnInit, OnChanges {
  @Input() title      = '';
  @Input() count      = '';
  @Input() iconType   = 'chart';
  @Input() iconBgColor = 'bg-gray-100';
  @Input() iconColor   = 'text-navy';
  @Input() subtitle    = '';
  /** Stagger entrance: pass '100ms', '200ms', etc. */
  @Input() animDelay   = '0ms';

  displayCount = '';

  /** Derive a subtle icon-matched shadow from the bg colour class */
  get iconShadow(): string {
    const map: Record<string, string> = {
      'bg-blue-100':   '0 4px 14px rgba(59,130,246,0.25)',
      'bg-green-100':  '0 4px 14px rgba(16,185,129,0.25)',
      'bg-amber-100':  '0 4px 14px rgba(245,158,11,0.25)',
      'bg-red-100':    '0 4px 14px rgba(239,68,68,0.25)',
      'bg-purple-100': '0 4px 14px rgba(139,92,246,0.25)',
      'bg-indigo-100': '0 4px 14px rgba(99,102,241,0.25)',
      'bg-orange-100': '0 4px 14px rgba(249,115,22,0.25)',
      'bg-emerald-100':'0 4px 14px rgba(16,185,129,0.25)',
    };
    return map[this.iconBgColor] ?? '0 4px 14px rgba(30,42,90,0.12)';
  }

  ngOnInit(): void {
    this.animateCount();
  }

  ngOnChanges(): void {
    this.animateCount();
  }

  private animateCount(): void {
    const raw = parseInt(this.count.replace(/\D/g, ''), 10);
    if (isNaN(raw)) { this.displayCount = this.count; return; }

    const duration = 900;
    const steps    = 40;
    const interval = duration / steps;
    let   current  = 0;

    const suffix = this.count.replace(/[\d,]/g, '');
    const timer  = setInterval(() => {
      current += raw / steps;
      if (current >= raw) {
        current = raw;
        clearInterval(timer);
      }
      this.displayCount = Math.floor(current).toLocaleString() + suffix;
    }, interval);
  }
}