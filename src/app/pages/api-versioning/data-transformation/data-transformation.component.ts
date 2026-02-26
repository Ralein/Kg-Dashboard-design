import { Component, signal, computed, OnDestroy, Renderer2, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule, ChevronLeft, ChevronDown, CheckCircle2,
  Settings2, Database, Layout, Share2, UploadCloud, FileJson,
  Search, Filter, ArrowRight, X, Trash2, Plus, Play, Save as SaveIcon, Info, ChevronUp, ChevronRight, Globe,
  LucideIconData
} from 'lucide-angular';

import { ObjectConfigComponent } from './components/object-config.component';
import { ApiConfigComponent } from './components/api-config.component';
import { DataMappingComponent } from './components/data-mapping.component';
import { FieldMappingComponent } from './components/field-mapping.component';

@Component({
  selector: 'app-data-transformation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LucideAngularModule,
    ObjectConfigComponent,
    ApiConfigComponent,
    DataMappingComponent,
    FieldMappingComponent
  ],
  template: `
  <div class="flex flex-col gap-0 animate-page-in">

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- PREMIUM HERO BANNER                                            -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="hero-banner relative overflow-hidden mb-3">
      <div class="hero-bg absolute inset-0"></div>
      <div class="hero-grid absolute inset-0"></div>
      <div class="hero-orb hero-orb--blue"></div>
      <div class="hero-orb hero-orb--indigo"></div>

      <div class="relative z-10 px-8 pt-5 pb-0">
        <div class="flex items-center gap-2 text-white/40 text-[11px] font-bold uppercase tracking-widest mb-3">
          <button routerLink="/api-versioning" class="hover:text-white transition-colors">API Versioning</button>
          <span class="opacity-30">/</span>
          <span class="text-white/80">Data Transformation</span>
        </div>

        <div class="flex items-end justify-between pb-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4318FF] to-[#8B5CF6] flex items-center justify-center border border-white/20 group overflow-hidden relative">
              <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div class="premium-shine absolute inset-0 pointer-events-none"></div>
              <lucide-icon [img]="Share2" class="w-6 h-6 text-white relative z-10"></lucide-icon>
            </div>
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-3">
                <h1 class="text-2xl font-black text-white tracking-tight">Data Transformation</h1>
                <span class="px-2.5 py-0.5 rounded-lg bg-[#05CD99]/20 border border-[#05CD99]/30 text-[#05CD99] text-[10px] font-black uppercase tracking-widest">{{ isEditMode() ? 'Edit Mode' : 'View Mode' }}</span>
              </div>
              <div class="flex items-center gap-4 text-white/50 text-xs font-bold uppercase tracking-wider">
                <span class="flex items-center gap-1.5 uppercase">
                  <lucide-icon [img]="Layout" class="w-3.5 h-3.5 text-indigo-400"></lucide-icon>
                  {{ selectedLob() }} / {{ selectedProcessFlow() }}
                </span>
                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500/30"></div>
                <span class="flex items-center gap-1.5 text-white/80 lowercase">
                  <lucide-icon [img]="Globe" class="w-3.5 h-3.5 text-indigo-400 opacity-50"></lucide-icon>
                  {{ selectedEndpoint() }}
                </span>
                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500/30"></div>
                <span class="flex items-center gap-1.5 text-emerald-400">
                  <lucide-icon [img]="CheckCircle2" class="w-3.5 h-3.5"></lucide-icon>
                  {{ docVersion() }}
                </span>
              </div>
            </div>
          </div>
          <button (click)="createEndpoint()" class="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
            <lucide-icon [img]="Plus" class="w-4 h-4"></lucide-icon>
            <span>Create Endpoint</span>
          </button>
        </div>

        <!-- ══════════════════════════════════════════
             TAB NAVIGATION — high-contrast cards
        ══════════════════════════════════════════ -->
        <div class="tab-nav-wrap">
          <button *ngFor="let tab of tabs; let i = index"
            (click)="onTabClick(tab.id)"
            class="tab-btn"
            [class.tab-btn--active]="activeTab() === tab.id"
            [class.tab-btn--done]="isTabBefore(tab.id)">

            <!-- Step number -->
            <span class="tab-step">
              <ng-container *ngIf="isTabBefore(tab.id)">
                <lucide-icon [img]="CheckCircle2" class="w-3.5 h-3.5 text-emerald-400"></lucide-icon>
              </ng-container>
              <ng-container *ngIf="!isTabBefore(tab.id)">{{ i + 1 }}</ng-container>
            </span>

            <!-- Icon + label -->
            <lucide-icon [img]="tab.icon" class="w-4 h-4 flex-shrink-0"></lucide-icon>
            <span class="tab-label">{{ tab.label }}</span>

            <!-- Active glow bar -->
            <div *ngIf="activeTab() === tab.id" class="tab-glow-bar"></div>
          </button>
        </div>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- CONFIGURATION BAR                                              -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="mb-3">
      <div class="premium-glass px-5 py-3 grid grid-cols-1 gap-4 bg-white/60 items-end"
           [class.md:grid-cols-4]="isEditMode()"
           [class.md:grid-cols-5]="!isEditMode()">
        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Line of Business</label>
          <div class="relative">
            <select
              [ngModel]="selectedLob()"
              (ngModelChange)="onLobChange($event)"
              class="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-[#2B3674] outline-none focus:border-[#4318FF] transition-all appearance-none disabled:bg-gray-50/50 disabled:cursor-not-allowed"
              [disabled]="!isEditMode() || !!recordId()">
              <option value="" disabled selected>Select LOB</option>
              <option value="HOME">HOME</option>
              <option value="MOTOR">MOTOR</option>
              <option value="TRAVEL">TRAVEL</option>
              <option value="MEDICAL">MEDICAL</option>
            </select>
            <lucide-icon [img]="ChevronDown" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Process Flow</label>
          <div class="relative">
            <select
              [ngModel]="selectedProcessFlow()"
              (ngModelChange)="onProcessFlowChange($event)"
              class="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-[#2B3674] outline-none focus:border-[#4318FF] transition-all appearance-none disabled:bg-gray-50/50 disabled:cursor-not-allowed"
              [disabled]="!selectedLob() || !isEditMode() || !!recordId()">
              <option value="" disabled selected>Select Process Flow</option>
              <option value="Insurance Data Sharing">Insurance Data Sharing</option>
              <option value="Insurance Quotation">Insurance Quotation</option>
            </select>
            <lucide-icon [img]="ChevronDown" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Doc Version</label>
          <div class="relative">
            <select
              [ngModel]="docVersion()"
              (ngModelChange)="docVersion.set($event)"
              class="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-[#2B3674] outline-none focus:border-[#4318FF] transition-all appearance-none disabled:bg-gray-50/50 disabled:cursor-not-allowed"
              [disabled]="!selectedProcessFlow() || !isEditMode() || !!recordId()">
              <option value="" disabled selected>Documentation Version</option>
              <option value="v8">v8 (Current)</option>
              <option value="v7">v7</option>
            </select>
            <lucide-icon [img]="ChevronDown" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Target Endpoint</label>
          <div class="relative">
            <select
              [ngModel]="selectedEndpoint()"
              (ngModelChange)="selectedEndpoint.set($event)"
              class="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-[#2B3674] outline-none focus:border-[#4318FF] transition-all appearance-none disabled:bg-gray-50/50 disabled:cursor-not-allowed"
              [disabled]="!selectedProcessFlow() || !!recordId()">
              <option value="" disabled selected>Select Endpoint</option>
              <option *ngFor="let ep of availableEndpoints()" [value]="ep">{{ ep }}</option>
              <option *ngIf="availableEndpoints().length === 0" disabled>Waiting for input...</option>
            </select>
            <lucide-icon [img]="ChevronDown" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
          </div>
        </div>

        <div *ngIf="!isEditMode()" class="flex flex-col justify-end">
          <button (click)="toggleEdit()" class="bg-[#4318FF] hover:bg-[#3311CC] text-white px-5 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 w-full justify-center">
             <lucide-icon [img]="Settings2" class="w-4 h-4"></lucide-icon>
             <span>Edit Mode</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- TAB CONTENT AREA                                               -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="pb-12">
      <app-object-config *ngIf="activeTab() === 'object'"></app-object-config>

      <app-api-config
        *ngIf="activeTab() === 'api'"
        [jsonContent]="jsonContent"
        (contentChange)="jsonContent = $event">
      </app-api-config>

      <app-data-mapping
        *ngIf="activeTab() === 'mapping'"
        [entities]="entities"
        [mappingData]="mappingData"
        [activeEntity]="activeEntity">
      </app-data-mapping>

      <app-field-mapping
        *ngIf="activeTab() === 'field'"
        [mappingRules]="mappingRules"
        [lfiFieldGroups]="lfiFieldGroups"
        [isEditMode]="isEditMode()">
      </app-field-mapping>
    </div>
  </div>
  `,
  styles: [`
    :host { display: block; }

    /* ── Hero Banner ── */
    .hero-banner { border-radius: 0 0 32px 32px; }
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
    .hero-orb--blue   { background: #4318FF; top: -150px; right: -50px; }
    .hero-orb--indigo { background: #8B5CF6; bottom: -150px; left: 10%; }

    /* ── Page animation ── */
    .animate-page-in { animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Premium shine ── */
    .premium-shine {
      background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%);
      background-size: 200% 200%;
      animation: shineSweep 2.5s ease-in-out infinite;
    }
    @keyframes shineSweep {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Glass card ── */
    .premium-glass {
      background: rgba(255,255,255,0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 24px;
    }

    /* ══════════════════════════════════════════
       TAB NAVIGATION — high-contrast, can't-miss
    ══════════════════════════════════════════ */

    .tab-nav-wrap {
      display: flex;
      align-items: stretch;
      gap: 6px;
      margin-top: 14px;
      padding-bottom: 0;
      border-bottom: 2px solid rgba(255,255,255,0.08);
    }

    /* Every tab is a proper visible card */
    .tab-btn {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 12px 16px 14px;
      border: 1px solid rgba(255,255,255,0.12);
      border-bottom: none;
      border-radius: 14px 14px 0 0;
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.75);
      cursor: pointer;
      outline: none;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
      white-space: nowrap;
      overflow: hidden;
    }
    .tab-btn:hover {
      background: rgba(255,255,255,0.12);
      color: white;
      border-color: rgba(255,255,255,0.22);
    }

    /* Completed (visited) tab */
    .tab-btn--done {
      background: rgba(5,205,153,0.08);
      border-color: rgba(5,205,153,0.2);
      color: rgba(255,255,255,0.65);
    }
    .tab-btn--done:hover {
      background: rgba(5,205,153,0.14);
      color: white;
    }

    /* ACTIVE tab — warm amber/orange, blazing on dark navy */
    .tab-btn--active {
      background: linear-gradient(155deg, #d97706 0%, #f59e0b 50%, #f97316 100%) !important;
      border-color: rgba(251,146,60,0.7) !important;
      color: white !important;
      padding-bottom: 17px;
    }
    .tab-btn--active::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 60%);
      border-radius: inherit;
      pointer-events: none;
    }

    /* Step number badge */
    .tab-step {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      font-size: 10px;
      font-weight: 900;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .tab-btn--active .tab-step {
      background: rgba(255,255,255,0.28);
      border-color: rgba(255,255,255,0.55);
    }
    .tab-btn--done .tab-step {
      background: rgba(5,205,153,0.15);
      border-color: rgba(5,205,153,0.35);
    }

    /* Label */
    .tab-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.07em;
      text-transform: uppercase;
    }

    /* Icon */
    .tab-btn lucide-icon {
      opacity: 0.7;
      transition: opacity 0.2s, filter 0.2s;
    }
    .tab-btn:hover lucide-icon,
    .tab-btn--active lucide-icon {
      opacity: 1;
    }
    .tab-btn--active lucide-icon {
      filter: drop-shadow(0 0 5px rgba(251,146,60,0.9));
    }

    /* Thick glowing underline for active — amber/orange */
    .tab-glow-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #f59e0b, #f97316, #fb923c);
      box-shadow:
        0 0 10px 3px rgba(249,115,22,1),
        0 0 28px 8px rgba(245,158,11,0.6);
      border-radius: 4px 4px 0 0;
    }
  `]
})
export class DataTransformationComponent implements OnDestroy, OnInit {
  private router = inject(Router);
  private renderer = inject(Renderer2);

  activeTab = signal('object');
  activeEntity = signal('ItemType');

  selectedLob = signal('');
  selectedProcessFlow = signal('');
  docVersion = signal('v8');
  apiVersion = signal('v1.0');
  selectedEndpoint = signal('');
  recordId = signal<string | null>(null);
  isEditMode = signal(false);
  toastMessage = signal('');

  tabs = [
    { id: 'object',  label: 'Object Configuration', icon: Database  },
    { id: 'api',     label: 'API Configuration',    icon: Settings2 },
    { id: 'mapping', label: 'Data Mapping',          icon: Share2    },
    { id: 'field',   label: 'API Field Mapping',     icon: Layout    }
  ];

  /** Returns true if this tab comes before the active one (i.e. already visited) */
  isTabBefore(tabId: string): boolean {
    const order = this.tabs.map(t => t.id);
    return order.indexOf(tabId) < order.indexOf(this.activeTab());
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    const toast = document.createElement('div');
    toast.setAttribute('id', 'transformation-toast');
    toast.innerHTML = `
      <div style="position:fixed;top:24px;right:24px;z-index:100000;background:#0d1b3e;padding:14px 20px;border-radius:16px;color:#fff;display:flex;align-items:center;gap:12px;box-shadow:0 20px 48px rgba(0,0,0,0.3);animation:toastSlide .4s ease-out;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05CD99" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span style="font-size:12px;font-weight:700;">${message}</span>
      </div>
      <style>@keyframes toastSlide{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}</style>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  submitMappings(): void { this.showToast('Mappings submitted successfully'); }
  createEndpoint(): void { this.showToast('Designer initialized for new endpoint'); }

  toggleEdit(): void {
    const currentUrl = this.router.url;
    if (!currentUrl.endsWith('/edit')) this.router.navigate([currentUrl, 'edit']);
  }

  availableEndpoints = computed(() => {
    const lob = this.selectedLob().toLowerCase();
    const flow = this.selectedProcessFlow();
    if (!lob || !flow) return [];
    if (flow === 'Insurance Quotation') {
      return lob === 'medical' ? ['/health-insurance-quotes'] : [`/${lob}-insurance-quotes`];
    }
    if (flow === 'Insurance Data Sharing') {
      return [
        `/${lob}-insurance-policies/{InsurancePolicyId}`,
        `/${lob}-insurance-policies`
      ];
    }
    return [];
  });

  onLobChange(val: string) {
    this.selectedLob.set(val);
    this.selectedProcessFlow.set('');
    this.docVersion.set('');
    this.selectedEndpoint.set('');
  }

  onProcessFlowChange(val: string) {
    this.selectedProcessFlow.set(val);
    this.docVersion.set('');
    this.selectedEndpoint.set('');
  }

  entities = [
    'ItemType','UsageByApplicant','Gender','PrimaryLanguage','Salutation','IssuingEmirate',
    'PropertyCondition','TotalContentsValue','TotalPersonalBelongingsValue','PaymentStatus',
    'CountrySubDivision','Status','PolicyPurchaseChannelType','Construction','ConstructionType',
    'PaymentFrequency','ThirdPartyRecoveryStatus','RoofType','MaritalStatus','ExteriorWalls',
    'FoundationType','VisaType','PolicyStatus','TypeOfProperty','AddressType','OwnershipStatus','PaymentMode'
  ];

  mappingData: Record<string, any[]> = {
    'ItemType': [
      { standard: 'SportsEquipment', ref: '', isDefault: false },
      { standard: 'Jewellery',        ref: '', isDefault: false },
      { standard: 'Art',              ref: '', isDefault: false },
      { standard: 'Electronics',      ref: '', isDefault: false },
      { standard: 'Watches',          ref: '', isDefault: false }
    ],
    'Gender': [
      { standard: 'Male',        ref: 'M', isDefault: true  },
      { standard: 'Female',      ref: 'F', isDefault: false },
      { standard: 'Unspecified', ref: 'U', isDefault: false }
    ]
  };

  jsonContent = JSON.stringify({
    "type": "object",
    "required": ["data"],
    "properties": {
      "data": {
        "type": "object",
        "required": ["InsurancePolicyId","PolicyHolder","Identity","Product","Claims","Premium"],
        "properties": {
          "InsurancePolicyId": { "type": "string" },
          "PolicyHolder":      { "$ref": "#/definitions/Holder" }
        }
      }
    }
  }, null, 2);

  mappingRules = signal([
    { name: 'InsurancePolicyId',         mappedTo: 'PolicyKey' },
    { name: 'PolicyHolder.Salutation',   mappedTo: null },
    { name: 'PolicyHolder.FirstName',    mappedTo: null },
    { name: 'PolicyHolder.MiddleName',   mappedTo: null },
    { name: 'PolicyHolder.LastName',     mappedTo: null },
    { name: 'PolicyHolder.Gender',       mappedTo: null },
    { name: 'PolicyHolder.DateOfBirth',  mappedTo: null },
    { name: 'PolicyHolder.Occupation',   mappedTo: null }
  ]);

  lfiFieldGroups = signal([
    { name: 'Policy',     expanded: true,  fields: ['LOB','PolicyKey','PolicyNumber','Renewalno','CustomerKey'] },
    { name: 'Customer',   expanded: false, fields: ['LOB','CustomerKey','TrafficIdNumber','EmiratesIdNumber','Salutation','FirstName','LastName','Gender','DateOfBirth','MaritalStatus','MobileNumber','EmailAddress','Nationality'] },
    { name: 'Claim',      expanded: false, fields: ['LOB','ClaimKey','PolicyKey','ClaimUniqueID','ClaimDate','Description','Status','TotalGrossClaimCurrency','TotalGrossClaimAmount'] },
    { name: 'Home',       expanded: false, fields: ['HomeKey','PolicyKey','LOB','TypeOfProperty','OwnershipStatus','Construction','NumberOfFloors','NumberOfRooms','BuildingNumber','StreetName','Country'] },
    { name: 'Endorsement',expanded: false, fields: ['LOB','EndorsemntKey','POLICYKEY','EndorsementDescription','EndorsementDate','AdjustmentAmount'] }
  ]);

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.isEditMode.set(this.router.url.endsWith('/edit'));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recordId.set(id);
      if (id.includes('ep-med')) {
        this.selectedLob.set('MEDICAL');
        this.selectedProcessFlow.set(id === 'ep-med-1' ? 'Insurance Quotation' : 'Insurance Data Sharing');
        this.docVersion.set('v8');
        this.selectedEndpoint.set(id === 'ep-med-1' ? '/health-insurance-quotes' : '/medical-insurance-policies/{InsurancePolicyId}');
      } else if (id.includes('ep-trav')) {
        this.selectedLob.set('TRAVEL');
        this.selectedProcessFlow.set(id === 'ep-trav-2' ? 'Insurance Data Sharing' : 'Insurance Quotation');
        this.docVersion.set(id === 'ep-trav-3' ? 'v7' : 'v8');
        this.selectedEndpoint.set(id === 'ep-trav-2' ? '/travel-insurance-policies' : '/travel-insurance-quotes');
      } else if (id.includes('motor') || ['ep-3','ep-4','ep-5','ep-6'].includes(id)) {
        this.selectedLob.set('MOTOR');
        this.selectedProcessFlow.set(id === 'ep-5' ? 'Insurance Quotation' : 'Insurance Data Sharing');
        this.docVersion.set(id === 'ep-6' ? 'v7' : 'v8');
        this.selectedEndpoint.set(id === 'ep-5' ? '/motor-insurance-quotes' : '/motor-insurance-policies/{InsurancePolicyId}');
      } else {
        this.selectedLob.set('HOME');
        this.selectedProcessFlow.set('Insurance Data Sharing');
        this.selectedEndpoint.set('/home-insurance-policies/{InsurancePolicyId}');
      }
    }
    if (this.isEditMode()) this.activeTab.set('field');
  }

  ngOnDestroy() {}

  onTabClick(tabId: string) { this.activeTab.set(tabId); }

  readonly Database     = Database;
  readonly Settings2    = Settings2;
  readonly Share2       = Share2;
  readonly Layout       = Layout;
  readonly ChevronDown  = ChevronDown;
  readonly Plus         = Plus;
  readonly CheckCircle2 = CheckCircle2;
  readonly Globe        = Globe;
}