import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Database, Trash2, Save, ChevronDown, ChevronRight, Code2, Braces } from 'lucide-angular';

@Component({
  selector: 'app-object-config',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="animate-in slide-in-from-bottom-4 fade-in duration-500">

      <!-- ── Initial State ── -->
      <div *ngIf="!showTable()" class="empty-shell flex flex-col items-center justify-center py-20 gap-6">
        <div class="icon-stack">
          <div class="icon-ring ring-1"></div>
          <div class="icon-ring ring-2"></div>
          <div class="icon-core">
            <lucide-icon [img]="Database" class="w-7 h-7 text-[#4318FF]"></lucide-icon>
          </div>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-black text-[#2B3674] tracking-tight mb-1">No objects loaded</h3>
          <p class="text-sm text-[#A3AED0] font-medium max-w-xs leading-relaxed">
            Load the configured domain objects for this API transformation process.
          </p>
        </div>
        <button (click)="showTable.set(true)"
          class="load-btn flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all">
          <lucide-icon [img]="Database" class="w-4 h-4"></lucide-icon>
          View Configured Objects
        </button>
      </div>

      <!-- ── Table View ── -->
      <div *ngIf="showTable()" class="obj-panel">

        <!-- Header bar -->
        <div class="obj-header px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <lucide-icon [img]="Braces" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
            <span class="text-xs font-black text-[#2B3674] uppercase tracking-widest">Schema Objects</span>
            <span class="count-badge">{{ configuredObjects().length }}</span>
          </div>
          <button (click)="saveObjects()"
            class="save-btn flex items-center gap-2 px-5 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all">
            <lucide-icon [img]="Save" class="w-3.5 h-3.5"></lucide-icon>
            Save
          </button>
        </div>

        <!-- Object rows -->
        <div class="divide-y divide-gray-100/60">
          <div *ngFor="let obj of configuredObjects(); let i = index"
            class="obj-row"
            [class.obj-row--expanded]="expandedRow() === obj.name">

            <!-- Row header — click to expand -->
            <div class="obj-row-header px-6 py-4 flex items-center justify-between cursor-pointer group"
              (click)="toggleRow(obj.name)">
              <div class="flex items-center gap-4">
                <span class="row-index">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <div class="flex items-center gap-2.5">
                  <lucide-icon [img]="Code2" class="w-3.5 h-3.5 text-[#4318FF] opacity-60 group-hover:opacity-100 transition-opacity"></lucide-icon>
                  <span class="text-sm font-black text-[#2B3674] tracking-tight">{{ obj.name }}</span>
                </div>
                <span class="type-chip">{{ getType(obj.json) }}</span>
              </div>
              <div class="flex items-center gap-3">
                <button (click)="deleteObject(obj.name); $event.stopPropagation()"
                  class="del-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  <lucide-icon [img]="Trash2" class="w-3 h-3"></lucide-icon>
                  Delete
                </button>
                <div class="chevron-wrap" [class.rotated]="expandedRow() === obj.name">
                  <lucide-icon [img]="ChevronRight" class="w-4 h-4 text-[#A3AED0]"></lucide-icon>
                </div>
              </div>
            </div>

            <!-- JSON panel — expands inline -->
            <div class="json-panel" [class.json-panel--open]="expandedRow() === obj.name">
              <div class="json-inner px-6 pb-5">
                <div class="json-viewer">
                  <div class="json-viewer-header">
                    <span class="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">JSON Schema</span>
                    <div class="dot-group">
                      <span class="dot dot--red"></span>
                      <span class="dot dot--amber"></span>
                      <span class="dot dot--green"></span>
                    </div>
                  </div>
                  <pre class="json-code">{{ obj.json }}</pre>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Empty state inside table -->
        <div *ngIf="configuredObjects().length === 0" class="py-16 flex flex-col items-center gap-3">
          <lucide-icon [img]="Database" class="w-8 h-8 text-[#E2E8F0]"></lucide-icon>
          <p class="text-xs font-bold text-[#A3AED0] uppercase tracking-widest">All objects removed</p>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* ── Empty state ── */
    .empty-shell {
      background: white;
      border: 1px solid rgba(163,174,208,0.2);
      border-radius: 24px;
      box-shadow: 0 4px 24px rgba(112,144,176,0.07);
    }

    .icon-stack { position: relative; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; }
    .icon-core {
      position: relative; z-index: 2;
      width: 48px; height: 48px; border-radius: 14px;
      background: #F0EEFF;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid rgba(67,24,255,0.12);
    }
    .icon-ring {
      position: absolute; border-radius: 50%;
      border: 1.5px dashed rgba(67,24,255,0.12);
      animation: spinRing 18s linear infinite;
    }
    .ring-1 { inset: -8px; animation-duration: 14s; }
    .ring-2 { inset: -18px; animation-direction: reverse; animation-duration: 22s; }
    @keyframes spinRing { to { transform: rotate(360deg); } }

    .load-btn {
      background: #2B3674; color: white;
      box-shadow: 0 8px 20px rgba(43,54,116,0.18);
    }
    .load-btn:hover { background: #1B2559; transform: translateY(-1px); }

    /* ── Main panel ── */
    .obj-panel {
      background: white;
      border: 1px solid rgba(163,174,208,0.18);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(112,144,176,0.08);
    }

    .obj-header {
      background: #FAFBFF;
      border-bottom: 1px solid rgba(163,174,208,0.12);
    }

    .count-badge {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 20px; height: 20px; padding: 0 6px;
      background: rgba(67,24,255,0.08);
      color: #4318FF;
      font-size: 10px; font-weight: 900;
      border-radius: 6px;
    }

    .save-btn {
      background: #05CD99; color: white;
      box-shadow: 0 4px 12px rgba(5,205,153,0.2);
    }
    .save-btn:hover { background: #04B484; transform: translateY(-1px); }

    /* ── Row ── */
    .obj-row {
      border-left: 3px solid transparent;
      transition: border-color 0.2s ease, background 0.2s ease;
    }
    .obj-row:hover { background: #FAFBFF; border-left-color: rgba(67,24,255,0.15); }
    .obj-row--expanded { border-left-color: #4318FF; background: #FAFBFF; }

    .obj-row-header { user-select: none; }

    .row-index {
      font-family: 'Courier New', monospace;
      font-size: 11px; font-weight: 700;
      color: #D0D5E8;
      min-width: 24px;
    }

    .type-chip {
      font-size: 9px; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.1em;
      padding: 2px 8px; border-radius: 6px;
      background: rgba(67,24,255,0.06);
      color: #7C5CFC;
      border: 1px solid rgba(67,24,255,0.1);
    }

    .del-btn {
      color: #F87171;
      border: 1px solid rgba(248,113,113,0.2);
      background: rgba(248,113,113,0.04);
    }
    .del-btn:hover { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.4); }

    .chevron-wrap {
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .chevron-wrap.rotated { transform: rotate(90deg); }

    /* ── JSON expand panel ── */
    .json-panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .json-panel--open { grid-template-rows: 1fr; }
    .json-inner { overflow: hidden; }

    .json-viewer {
      background: #0D1117;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.12);
    }

    .json-viewer-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .dot-group { display: flex; align-items: center; gap: 5px; }
    .dot { width: 9px; height: 9px; border-radius: 50%; }
    .dot--red   { background: #FF5F57; }
    .dot--amber { background: #FFBD2E; }
    .dot--green { background: #28C840; }

    .json-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 11.5px;
      line-height: 1.75;
      color: #A9B1D6;
      padding: 16px;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      /* Subtle scan-line texture */
      background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 23px,
        rgba(255,255,255,0.015) 23px,
        rgba(255,255,255,0.015) 24px
      );
    }
  `]
})
export class ObjectConfigComponent {
  readonly Database = Database;
  readonly Trash2 = Trash2;
  readonly Save = Save;
  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;
  readonly Code2 = Code2;
  readonly Braces = Braces;

  showTable = signal(false);
  expandedRow = signal<string | null>(null);

  toggleRow(name: string) {
    this.expandedRow.set(this.expandedRow() === name ? null : name);
  }

  getType(json: string): string {
    try {
      const parsed = JSON.parse(json);
      if (parsed.type) return parsed.type;
      if (parsed.oneOf) return 'oneOf';
      return 'schema';
    } catch { return 'schema'; }
  }

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
    if (this.expandedRow() === name) this.expandedRow.set(null);
  }

  saveObjects() {
    console.log('Saving objects...', this.configuredObjects());
  }
}