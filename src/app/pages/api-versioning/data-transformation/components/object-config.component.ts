import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Database, Trash2, Save } from 'lucide-angular';

@Component({
  selector: 'app-object-config',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="animate-in slide-in-from-bottom-4 fade-in duration-500">
      <!-- Initial View -->
      <div *ngIf="!showTable()" class="premium-glass p-12 flex items-center justify-between overflow-hidden relative">
        <div class="relative z-10 max-w-lg">
          <h3 class="text-2xl font-black text-[#2B3674] tracking-tight mb-4">Click the button below to view configured objects</h3>
          <p class="text-[#A3AED0] font-medium leading-relaxed mb-8">
            Review and manage the domain objects linked to this API transformation process. 
            Ensure all schema definitions align with the latest Finance Standards.
          </p>
          <button (click)="showTable.set(true)" class="bg-[#2B3674] hover:bg-[#1B2559] text-white px-8 py-4 rounded-2xl font-black text-sm tracking-tight transition-all shadow-xl shadow-[#2B3674]/20 flex items-center gap-3 group">
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

      <!-- Table View -->
      <div *ngIf="showTable()" class="premium-glass p-0 overflow-hidden bg-white shadow-xl border border-gray-100/50">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#F8FAFF] border-b border-indigo-50">
                <th class="px-8 py-5 text-[11px] font-black text-[#2B3674] uppercase tracking-[0.2em]">
                  <div class="flex items-center gap-2">
                    <lucide-icon [img]="Database" class="w-3.5 h-3.5 text-indigo-400"></lucide-icon>
                    Object Name
                  </div>
                </th>
                <th class="px-8 py-5 text-[11px] font-black text-[#2B3674] uppercase tracking-[0.2em]">JSON Content</th>
                <th class="px-8 py-5 text-[11px] font-black text-[#2B3674] uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr *ngFor="let obj of configuredObjects()" class="hover:bg-indigo-50/30 transition-all group">
                <td class="px-8 py-6 align-top">
                  <span class="text-xs font-black text-[#4318FF] tracking-tight group-hover:scale-105 transition-transform inline-block">{{ obj.name }}</span>
                </td>
                <td class="px-8 py-6">
                  <div class="bg-gray-50/50 rounded-xl p-4 border border-gray-100 max-h-[300px] overflow-auto custom-scrollbar shadow-inner">
                    <pre class="font-mono text-[11px] text-[#A3AED0] leading-relaxed whitespace-pre-wrap">{{ obj.json }}</pre>
                  </div>
                </td>
                <td class="px-8 py-6 text-right align-top">
                  <button (click)="deleteObject(obj.name)" class="px-4 py-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ml-auto">
                    <lucide-icon [img]="Trash2" class="w-3.5 h-3.5"></lucide-icon>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="p-6 bg-gray-50/30 flex justify-end border-t border-gray-100">
          <button (click)="saveObjects()" class="px-8 py-3 rounded-2xl bg-[#05CD99] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-[#05CD99]/20 hover:bg-[#04B484] transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95">
            <lucide-icon [img]="Save" class="w-4 h-4"></lucide-icon>
            <span>Save Objects</span>
          </button>
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
export class ObjectConfigComponent {
  readonly Database = Database;
  readonly Trash2 = Trash2;
  readonly Save = Save;

  showTable = signal(false);

  configuredObjects = signal([
    {
      name: 'InsurancePolicyId',
      json: `{
  "type": "string",
  "minLength": 1,
  "maxLength": 128,
  "format": "uuid",
  "description": "Unique identifier for a given insurance policy"
}`
    },
    {
      name: 'PolicyHolder',
      json: `{
  "type": "object",
  "required": [
    "FirstName",
    "LastName",
    "Gender",
    "DateOfBirth"
  ],
  "properties": {
    "FirstName": { "type": "string" },
    "LastName": { "type": "string" },
    "Gender": { "type": "string", "enum": ["Male", "Female", "Other"] },
    "DateOfBirth": { "type": "string", "format": "date" }
  }
}`
    },
    {
      name: 'Identity',
      json: `{
  "oneOf": [
    {
      "type": "object",
      "required": [
        "EmiratesId"
      ]
    }
  ],
  "properties": {
    "EmiratesId": { "type": "string" },
    "VisaNumber": { "type": "string" },
    "VisaType": { "type": "string", "enum": ["Employment", "Residence"] }
  }
}`
    },
    {
      name: 'Product',
      json: `{
  "type": "object",
  "required": [
    "Policy",
    "PropertyDetails"
  ],
  "properties": {
    "CoverType": {
      "type": "string",
      "description": "Type of cover as defined in company systems."
    },
    "Description": { "type": "string" }
  }
}`
    },
    {
      name: 'Claims',
      json: `{
  "type": "object",
  "required": [
    "Summary",
    "NoClaimsDiscountAvailable"
  ],
  "properties": {
    "Summary": { "type": "string" },
    "NoClaimsDiscountAvailable": { "type": "boolean" }
  }
}`
    },
    {
      name: 'Premium',
      json: `{
  "type": "object",
  "required": [
    "TotalPremiumAmount",
    "PaymentFrequency"
  ],
  "properties": {
    "TotalPremiumAmount": { "type": "number" },
    "PaymentFrequency": { "type": "string" }
  }
}`
    }
  ]);

  deleteObject(name: string) {
    this.configuredObjects.update(obs => obs.filter(o => o.name !== name));
  }

  saveObjects() {
    console.log('Saving objects...', this.configuredObjects());
  }
}
