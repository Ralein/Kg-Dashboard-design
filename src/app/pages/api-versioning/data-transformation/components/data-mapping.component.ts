import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

@Component({
    selector: 'app-data-mapping',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div class="col-span-12 lg:col-span-3">
         <div class="premium-glass p-0 overflow-hidden min-h-[500px]">
            <div class="p-5 border-b border-gray-100 bg-gray-50/50">
              <h4 class="text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Entity Names</h4>
            </div>
            <div class="py-2">
               <button 
                 *ngFor="let entity of entities"
                 (click)="activeEntity.set(entity)"
                 class="w-full flex items-center justify-between px-5 py-3.5 text-xs font-bold transition-all border-l-4"
                 [class.bg-[#4318FF]/5]="activeEntity() === entity"
                 [class.text-[#4318FF]]="activeEntity() === entity"
                 [class.border-[#4318FF]]="activeEntity() === entity"
                 [class.hover:bg-gray-50]="activeEntity() !== entity"
                 [class.text-[#2B3674]]="activeEntity() !== entity"
                 [class.border-transparent]="activeEntity() !== entity"
               >
                 {{ entity }}
                 <lucide-icon *ngIf="activeEntity() === entity" [img]="ArrowRight" class="w-3.5 h-3.5"></lucide-icon>
               </button>
            </div>
         </div>
      </div>
      <div class="col-span-12 lg:col-span-9">
         <div class="premium-glass p-0 overflow-hidden shadow-xl">
            <table class="w-full text-left">
               <thead>
                  <tr class="bg-[#fafbff] border-b border-gray-100">
                     <th class="px-6 py-4 text-[11px] font-black text-[#A3AED0] uppercase tracking-widest">Open Finance Standard</th>
                     <th class="px-6 py-4 text-[11px] font-black text-[#A3AED0] uppercase tracking-widest">Reference Mapping Data</th>
                     <th class="px-6 py-4 text-[11px] font-black text-[#A3AED0] uppercase tracking-widest text-center">Is Default</th>
                  </tr>
               </thead>
               <tbody class="divide-y divide-gray-100">
                  <tr *ngFor="let row of mappingData[activeEntity()] || []" class="hover:bg-[#4318FF]/[0.02] transition-colors">
                     <td class="px-6 py-4 text-sm font-bold text-[#2B3674]">{{ row.standard }}</td>
                     <td class="px-6 py-4">
                       <input type="text" [value]="row.ref" class="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-xs font-bold text-[#2B3674] focus:border-[#4318FF] focus:ring-0 transition-all">
                     </td>
                     <td class="px-6 py-4 text-center">
                        <input type="checkbox" [checked]="row.isDefault" class="w-4 h-4 rounded border-gray-300 text-[#4318FF] focus:ring-[#4318FF]">
                     </td>
                  </tr>
               </tbody>
            </table>
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
export class DataMappingComponent {
    @Input() entities: string[] = [];
    @Input() mappingData: Record<string, any[]> = {};
    @Input() activeEntity!: WritableSignal<string>;
    readonly ArrowRight = ArrowRight;
}
