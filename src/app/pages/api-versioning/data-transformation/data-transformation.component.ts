import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule, ChevronLeft, ChevronDown, CheckCircle2,
  Settings2, Database, Layout, Share2, UploadCloud, FileJson,
  Search, Filter, ArrowRight, X, Trash2, Plus, Play, Save as SaveIcon, Info, ChevronUp, ChevronRight
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
              (click)="onTabClick(tab.id)"
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
      <!-- TAB CONTENT AREA (ORCHESTRATED)                                -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="px-8 pb-12">
        <app-object-config *ngIf="activeTab() === 'object'"></app-object-config>
        
        <app-api-config 
          *ngIf="activeTab() === 'api'" 
          [jsonContent]="jsonContent"
        ></app-api-config>
        
        <app-data-mapping 
          *ngIf="activeTab() === 'mapping'"
          [entities]="entities"
          [mappingData]="mappingData"
          [activeEntity]="activeEntity"
        ></app-data-mapping>
        
        <app-field-mapping 
          *ngIf="activeTab() === 'field'"
          [mappingRules]="mappingRules"
          [lfiFieldGroups]="lfiFieldGroups"
        ></app-field-mapping>
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
    .animate-page-in { animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DataTransformationComponent implements OnInit {
  private router = inject(Router);

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
    'TotalPersonalBelongingsValue', 'PaymentStatus', 'CountrySubDivision', 'Status',
    'PolicyPurchaseChannelType', 'Construction', 'ConstructionType', 'PaymentFrequency',
    'ThirdPartyRecoveryStatus', 'RoofType', 'MaritalStatus', 'ExteriorWalls', 'FoundationType',
    'VisaType', 'PolicyStatus', 'TypeOfProperty', 'AddressType', 'OwnershipStatus', 'PaymentMode'
  ];

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

  jsonContent = JSON.stringify({
    "type": "object",
    "required": ["data"],
    "properties": {
      "data": {
        "type": "object",
        "required": ["InsurancePolicyId", "PolicyHolder", "Identity", "Product", "Claims", "Premium"],
        "properties": {
          "InsurancePolicyId": { "type": "string" },
          "PolicyHolder": { "$ref": "#/definitions/Holder" }
        }
      }
    }
  }, null, 2);

  mappingRules = signal([
    { name: 'InsurancePolicyId', mappedTo: 'PolicyKey' },
    { name: 'PolicyHolder.Salutation', mappedTo: null },
    { name: 'PolicyHolder.FirstName', mappedTo: null },
    { name: 'PolicyHolder.MiddleName', mappedTo: null },
    { name: 'PolicyHolder.LastName', mappedTo: null },
    { name: 'PolicyHolder.Gender', mappedTo: null },
    { name: 'PolicyHolder.DateOfBirth', mappedTo: null },
    { name: 'PolicyHolder.Occupation', mappedTo: null },
    { name: 'PolicyHolder.PreferredLanguage', mappedTo: null }
  ]);

  lfiFieldGroups = signal([
    { name: 'Policy', expanded: true, fields: ['LOB', 'PolicyKey', 'PolicyNumber', 'Renewalno', 'CustomerKey'] },
    { name: 'Customer', expanded: false, fields: ['FirstName', 'LastName', 'Email', 'Mobile'] },
    { name: 'Claim', expanded: false, fields: ['ClaimNumber', 'ClaimDate', 'LossDate'] },
    { name: 'Policy_cover_benefit', expanded: false, fields: ['CoverAmount', 'BenefitType'] }
  ]);

  ngOnInit() {
    if (this.router.url.endsWith('/edit')) {
      this.activeTab.set('field');
    }
  }

  onTabClick(tabId: string) {
    this.activeTab.set(tabId);
  }

  readonly Database = Database;
  readonly Settings2 = Settings2;
  readonly Share2 = Share2;
  readonly Layout = Layout;
  readonly ArrowRight = ArrowRight;
}
