import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lob-distribution-chart',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="flex flex-col h-full justify-between py-2">
      <div class="space-y-6">
        @for (item of data; track item.label) {
          <div class="group cursor-default">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full shadow-lg" [style.background]="item.color" [style.box-shadow]="'0 0 8px ' + item.color"></div>
                <span class="text-sm font-bold text-[#2B3674] tracking-tight">{{ item.label }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm font-extrabold text-[#2B3674]">{{ item.value }}%</span>
                <span class="text-[10px] text-[#A3AED0] font-bold">({{ item.count }} policies)</span>
              </div>
            </div>
            <div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
              <div 
                class="h-full rounded-full transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)"
                [style.width.%]="item.value"
                [style.background]="item.gradient"
              >
                <div class="absolute inset-0 bg-white/20 animate-shimmer" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); background-size: 200% 100%;"></div>
              </div>
            </div>
          </div>
        }
      </div>
      
      <div class="flex justify-between items-center pt-5 mt-2 border-t border-slate-100">
        <div class="flex flex-col">
          <span class="text-xs text-[#A3AED0] font-bold uppercase tracking-wider">Total Policies</span>
          <span class="text-xl font-black text-[#2B3674]">4,820</span>
        </div>
        <div class="px-4 py-2 bg-blue-50 rounded-xl">
          <span class="text-[10px] font-black text-[#4318FF] tracking-widest">SUMMARY 2026</span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite linear;
    }
  `]
})
export class LobDistributionChartComponent {
    @Input() data: any[] = [];
}
