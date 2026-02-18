import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  template: `
    <div class="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
      <div>
        <p class="text-xs font-semibold text-text-light uppercase tracking-wider mb-2">{{ label }}</p>
        <p class="text-3xl font-bold text-text">{{ value }}</p>
      </div>
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center"
        [style.background-color]="iconBg"
      >
        <!-- Icon based on type -->
        @switch (iconType) {
          @case ('chart') {
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect>
            </svg>
          }
          @case ('alert') {
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          }
          @case ('bar') {
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          }
          @case ('message') {
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          }
          @default {
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          }
        }
      </div>
    </div>
  `
})
export class StatsCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() iconType = 'bar';
  @Input() iconColor = '#333';
  @Input() iconBg = '#e8f4fd';
}
