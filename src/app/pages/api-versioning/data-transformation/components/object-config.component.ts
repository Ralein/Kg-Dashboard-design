import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Database } from 'lucide-angular';

@Component({
    selector: 'app-object-config',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div class="premium-glass p-12 flex items-center justify-between overflow-hidden relative">
        <div class="relative z-10 max-w-lg">
          <h3 class="text-2xl font-black text-[#2B3674] tracking-tight mb-4">Click the button below to view configured objects</h3>
          <p class="text-[#A3AED0] font-medium leading-relaxed mb-8">
            Review and manage the domain objects linked to this API transformation process. 
            Ensure all schema definitions align with the latest Finance Standards.
          </p>
          <button class="bg-[#2B3674] hover:bg-[#1B2559] text-white px-8 py-4 rounded-2xl font-black text-sm tracking-tight transition-all shadow-xl shadow-[#2B3674]/20 flex items-center gap-3 group">
             <lucide-icon [img]="Database" class="w-5 h-5 group-hover:scale-110 transition-transform"></lucide-icon>
             <span>View Configured Objects</span>
          </button>
        </div>
        <div class="relative scale-110 translate-x-12">
          <div class="w-[400px] h-[300px] flex items-center justify-center">
             <div class="relative">
                <div class="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
                <img src="https://img.freepik.com/free-vector/robotic-arm-concept-illustration_114360-8451.jpg" alt="3D Process" class="w-full h-full object-contain relative z-10 opacity-90 drop-shadow-2xl">
             </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .premium-glass {
      background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(163,174,208,0.2);
      border-radius: 32px; box-shadow: 0 10px 40px rgba(112,144,176,0.1);
      backdrop-filter: blur(10px);
    }
  `]
})
export class ObjectConfigComponent {
    readonly Database = Database;
}
