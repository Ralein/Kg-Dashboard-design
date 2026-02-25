import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, UploadCloud, FileJson, CheckCircle2 } from 'lucide-angular';

@Component({
   selector: 'app-api-config',
   standalone: true,
   imports: [CommonModule, LucideAngularModule],
   template: `
    <div class="grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div class="col-span-12 lg:col-span-4">
         <div (click)="fileInput.click()" 
              (dragover)="$event.preventDefault()" 
              (drop)="onFileDropped($event)"
              class="premium-glass p-8 h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-indigo-100 hover:border-[#4318FF]/40 transition-all cursor-pointer group">
            <div class="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <lucide-icon [img]="UploadCloud" class="w-10 h-10 text-[#4318FF]"></lucide-icon>
            </div>
            <h4 class="text-lg font-black text-[#2B3674] tracking-tight mb-2">Drag & drop JSON file here</h4>
            <p class="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mb-8">Supported format: .json, .txt</p>
            
            <input #fileInput type="file" (change)="onFileSelected($event)" accept=".json,.txt" class="hidden">
            <button class="px-8 py-3 rounded-xl border-2 border-[#4318FF]/20 text-[#4318FF] text-xs font-black uppercase tracking-widest hover:bg-[#4318FF] hover:text-white transition-all">Browse Files</button>
         </div>
      </div>
      <div class="col-span-12 lg:col-span-8">
         <div class="premium-glass p-0 overflow-hidden shadow-2xl">
            <div class="p-4 bg-[#2B3674] flex items-center justify-between">
               <div class="flex items-center gap-2">
                  <lucide-icon [img]="FileJson" class="w-4 h-4 text-emerald-400"></lucide-icon>
                  <span class="text-xs font-black text-white uppercase tracking-widest">JSON Content Preview</span>
               </div>
               <button class="text-white/40 hover:text-white transition-colors" title="Apply Changes"><lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon></button>
            </div>
            <div class="bg-[#0C0E1A] p-6 h-[400px] overflow-auto custom-scrollbar">
               <pre class="font-mono text-[13px] text-indigo-200 leading-relaxed">{{ jsonContent }}</pre>
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
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E0; }
  `]
})
export class ApiConfigComponent {
   @Input() jsonContent: string = '';
   @Output() contentChange = new EventEmitter<string>();

   readonly UploadCloud = UploadCloud;
   readonly FileJson = FileJson;
   readonly CheckCircle2 = CheckCircle2;

   onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
         this.readFile(file);
      }
   }

   onFileDropped(event: DragEvent): void {
      event.preventDefault();
      const file = event.dataTransfer?.files[0];
      if (file) {
         this.readFile(file);
      }
   }

   private readFile(file: File): void {
      const reader = new FileReader();
      reader.onload = (e: any) => {
         const content = e.target.result;
         this.contentChange.emit(content);
      };
      reader.readAsText(file);
   }
}
