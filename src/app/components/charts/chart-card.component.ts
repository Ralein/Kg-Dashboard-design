import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chart-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="dark ? 'premium-glass-dark p-6 flex flex-col' : 'premium-glass p-6 flex flex-col'" 
         [class.animate-fade-in-up]="true"
         [style.height]="height"
         [style.animation-delay]="delay">
      
      <div class="flex justify-between items-center mb-4 relative z-10">
        <div>
          <h3 [class]="dark ? 'text-lg font-bold text-white' : 'text-lg font-bold text-[#2B3674]'">
            {{ title }}
          </h3>
          @if (subtitle) {
            <p [class]="dark ? 'text-xs text-white/40 mt-1' : 'text-xs text-[#A3AED0] font-medium mt-1'">
              {{ subtitle }}
            </p>
          }
        </div>
        
        <div class="flex items-center gap-2">
            <ng-content select="[header-actions]"></ng-content>
            @if (showLive) {
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 tracking-wider">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    LIVE
                </span>
            }
        </div>
      </div>

      <div class="flex-1 relative min-h-0 z-10">
        <ng-content></ng-content>
      </div>

      @if (showFooter) {
        <div class="mt-4 pt-4 border-t border-white/5 relative z-10">
            <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class ChartCardComponent {
    @Input() title = '';
    @Input() subtitle = '';
    @Input() dark = false;
    @Input() height = '340px';
    @Input() delay = '0ms';
    @Input() showLive = false;
    @Input() showFooter = false;
}
