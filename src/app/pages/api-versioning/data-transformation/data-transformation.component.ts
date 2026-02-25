import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  LucideAngularModule, ChevronLeft, ChevronDown, CheckCircle2,
  Settings2, Database, Layout, Share2, UploadCloud, FileJson,
  Search, Filter, ArrowRight
} from 'lucide-angular';

@Component({
  selector: 'app-data-transformation',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-0 animate-page-in">
      
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- PREMIUM HERO BANNER                                            -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="hero-banner relative overflow-hidden mb-8">
        <div class="hero-bg absolute inset-0"></div>
        <div class="hero-grid absolute inset-0"></div>
        <div class="hero-orb hero-orb--blue"></div>
        <div class="hero-orb hero-orb--indigo"></div>
        
        <div class="relative z-10 px-8 pt-8 pb-0">
          <!-- Breadcrumbs -->
          <div class="flex items-center gap-2 text-white/40 text-[11px] font-bold uppercase tracking-widest mb-6">
            <button routerLink="/api-versioning" class="hover:text-white transition-colors">API Versioning</button>
            <span class="opacity-30">/</span>
            <span class="text-white/80">Data Transformation</span>
          </div>

          <div class="flex items-end justify-between pb-8">
            <div class="flex items-center gap-5">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4318FF] to-[#8B5CF6] flex items-center justify-center border border-white/20 shadow-2xl shadow-[#4318FF]/40 group overflow-hidden relative">
                <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div class="premium-shine absolute inset-0 pointer-events-none"></div>
                <lucide-icon [img]="Share2" class="w-8 h-8 text-white relative z-10"></lucide-icon>
              </div>
              <div class="flex flex-col gap-1.5">
                <div class="flex items-center gap-3">
                  <h1 class="text-3xl font-black text-white tracking-tight">Data Transformation</h1>
                  <span class="px-2.5 py-0.5 rounded-lg bg-[#05CD99]/20 border border-[#05CD99]/30 text-[#05CD99] text-[10px] font-black uppercase tracking-widest">v2.0 Configured</span>
                </div>
                <div class="flex items-center gap-4 text-white/50 text-xs font-bold uppercase tracking-wider">
                  <span class="flex items-center gap-1.5"><lucide-icon [img]="Layout" class="w-3.5 h-3.5 text-indigo-400"></lucide-icon> HOME / INSURANCE DATA SHARING</span>
                  <div class="w-1 h-1 rounded-full bg-white/20"></div>
                  <span class="flex items-center gap-1.5 text-white/80">
                    /home-insurance-policies/{{ '{' }}InsurancePolicyId{{ '}' }}
                  </span>
                </div>
              </div>
            </div>

          
          </div>

          <!-- Tabs Navigation -->
          <div class="flex items-center gap-8 mt-4 border-b border-white/10">
            <button 
              *ngFor="let tab of tabs"
              (click)="activeTab.set(tab.id)"
              class="relative py-4 text-xs font-black uppercase tracking-widest transition-all duration-300"
              [class.text-white]="activeTab() === tab.id"
              [class.text-white/40]="activeTab() !== tab.id"
            >
              <span class="flex items-center gap-2">
                <lucide-icon [img]="tab.icon" class="w-4 h-4"></lucide-icon>
                {{ tab.label }}
              </span>
              <div 
                *ngIf="activeTab() === tab.id" 
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4318FF] to-[#8B5CF6] rounded-t-full"
              ></div>
            </button>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- TAB CONTENT AREA                                               -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="px-8 pb-12">
        
        <!-- Tab 1: Object Configuration -->
        <div *ngIf="activeTab() === 'object'" class="animate-in slide-in-from-bottom-4 fade-in duration-500">
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
                <!-- Placeholder for the 3D illustration mentioned in prompt -->
                <div class="w-[400px] h-[300px] flex items-center justify-center">
                   <div class="relative">
                      <div class="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
                      <img src="https://img.freepik.com/free-vector/robotic-arm-concept-illustration_114360-8451.jpg" alt="3D Process" class="w-full h-full object-contain relative z-10 opacity-90 drop-shadow-2xl">
                   </div>
                </div>
              </div>
           </div>
        </div>

        <!-- Tab 2: API Configuration -->
        <div *ngIf="activeTab() === 'api'" class="grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <!-- File Drop Zone -->
          <div class="col-span-12 lg:col-span-4">
             <div class="premium-glass p-8 h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-indigo-100 hover:border-[#4318FF]/40 transition-all cursor-pointer group">
                <div class="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <lucide-icon [img]="UploadCloud" class="w-10 h-10 text-[#4318FF]"></lucide-icon>
                </div>
                <h4 class="text-lg font-black text-[#2B3674] tracking-tight mb-2">Drag & drop .txt file here</h4>
                <p class="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mb-8">Supported format: JSON-schema (.txt)</p>
                <button class="px-8 py-3 rounded-xl border-2 border-[#4318FF]/20 text-[#4318FF] text-xs font-black uppercase tracking-widest hover:bg-[#4318FF] hover:text-white transition-all">Browse Files</button>
             </div>
          </div>
          <!-- JSON Viewer -->
          <div class="col-span-12 lg:col-span-8">
             <div class="premium-glass p-0 overflow-hidden shadow-2xl">
                <div class="p-4 bg-[#2B3674] flex items-center justify-between">
                   <div class="flex items-center gap-2">
                      <lucide-icon [img]="FileJson" class="w-4 h-4 text-emerald-400"></lucide-icon>
                      <span class="text-xs font-black text-white uppercase tracking-widest">Paste JSON Content</span>
                   </div>
                   <button class="text-white/40 hover:text-white transition-colors"><lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon></button>
                </div>
                <div class="bg-[#0C0E1A] p-6 h-[400px] overflow-auto custom-scrollbar">
                   <pre class="font-mono text-[13px] text-indigo-200 leading-relaxed">{{ jsonContent }}</pre>
                </div>
             </div>
          </div>
        </div>

        <!-- Tab 3: Data Mapping -->
        <div *ngIf="activeTab() === 'mapping'" class="grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <!-- Sidebar -->
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
          <!-- Mapping Table -->
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

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    
    .hero-banner { border-radius: 0 0 32px 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); }
    .hero-bg { background: linear-gradient(135deg, #0C0F2E 0%, #171C40 100%); }
    .hero-grid {
      background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 24px 24px; opacity: 0.5;
    }
    .hero-orb {
      position: absolute; width: 400px; height: 400px;
      border-radius: 50%; filter: blur(100px);
      pointer-events: none; opacity: 0.4;
    }
    .hero-orb--blue { background: #4318FF; top: -150px; right: -50px; }
    .hero-orb--indigo { background: #8B5CF6; bottom: -150px; left: 10%; }

    .premium-glass {
      background: white; border: 1px solid rgba(163,174,208,0.2);
      border-radius: 24px; box-shadow: 0 10px 40px rgba(112,144,176,0.1);
    }

    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #0C0E1A; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #4318FF40; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4318FF80; }

    .animate-page-in { animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DataTransformationComponent {
  activeTab = signal('object');
  activeEntity = signal('ItemType');

  tabs = [
    { id: 'object', label: 'Object Configuration', icon: Database },
    { id: 'api', label: 'API Configuration', icon: Settings2 },
    { id: 'mapping', label: 'Data Mapping', icon: Share2 },
    { id: 'field', label: 'API Field Mapping', icon: Layout }
  ];

  entities = [
    'ItemType', 'UsageByApplicant', 'Gender', 'PrimaryLanguage',
    'Salutation', 'IssuingEmirate', 'PropertyCondition', 'TotalContentsValue',
    'TotalPersonalBelongingsValue','PaymentStatus','CountrySubDivision','Status',
    'PolicyPurchaseChannelType','Construction','ConstructionType','PaymentFrequency',
    'ThirdPartyRecoveryStatus','RoofType','MaritalStatus','ExteriorWalls','FoundationType',
    'VisaType','PolicyStatus','TypeOfProperty','AddressType','OwnershipStatus','PaymentMode'
  ];

  jsonContent = JSON.stringify({
    "type": "object",
    "required": ["data"],
    "properties": {
      "data": {
        "type": "object",
        "required": [
          "InsurancePolicyId",
          "PolicyHolder",
          "Identity",
          "Product",
          "Claims",
          "Premium"
        ],
        "properties": {
          "InsurancePolicyId": { "type": "string" },
          "PolicyHolder": { "$ref": "#/definitions/Holder" }
        }
      }
    }
  }, null, 2);

  mappingData: Record<string, any[]> = {
    'ItemType': [
      { standard: 'SportsEquipment', ref: '', isDefault: false },
      { standard: 'Jewellery', ref: '', isDefault: false },
      { standard: 'Art', ref: '', isDefault: false },
      { standard: 'StampCoinOrMedalCollections', ref: '', isDefault: false },
      { standard: 'RugsOrCarpets', ref: '', isDefault: false },
      { standard: 'Electronics', ref: '', isDefault: false },
      { standard: 'Watches', ref: '', isDefault: false },
      { standard: 'Luggage', ref: '', isDefault: false }
    ],
    'Gender': [
      { standard: 'Male', ref: 'M', isDefault: true },
      { standard: 'Female', ref: 'F', isDefault: false },
      { standard: 'Unspecified', ref: 'U', isDefault: false }
    ]
  };

  readonly Database = Database;
  readonly Settings2 = Settings2;
  readonly Share2 = Share2;
  readonly Layout = Layout;
  readonly UploadCloud = UploadCloud;
  readonly FileJson = FileJson;
  readonly CheckCircle2 = CheckCircle2;
  readonly ArrowRight = ArrowRight;
}
