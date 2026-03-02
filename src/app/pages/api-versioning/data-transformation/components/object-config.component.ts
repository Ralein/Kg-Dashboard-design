import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Database, Trash2, Save, ChevronDown, Code2, Braces, Pencil, Check, X } from 'lucide-angular';

@Component({
  selector: 'app-object-config',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
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

      <!-- ── Accordion View ── -->
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

        <!-- Accordion items -->
        <div class="accordion-list">
          <div *ngFor="let obj of configuredObjects(); let i = index; let last = last"
            class="accordion-item"
            [class.accordion-item--expanded]="expandedRow() === obj.name"
            [class.accordion-item--last]="last">

            <!-- Clickable header -->
            <div class="accordion-header group"
              (click)="toggleRow(obj.name)">

              <div class="flex items-center gap-4 min-w-0">
                <span class="row-index">{{ (i + 1).toString().padStart(2, '0') }}</span>

                <div class="flex items-center gap-2.5 min-w-0">
                  <lucide-icon [img]="Code2" class="w-3.5 h-3.5 text-[#4318FF] shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"></lucide-icon>
                  <span class="text-sm font-black text-[#2B3674] tracking-tight truncate">{{ obj.name }}</span>
                </div>

                <span class="type-chip shrink-0">{{ getType(obj.json) }}</span>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <!-- Delete — visible on hover -->
                <button (click)="deleteObject(obj.name); $event.stopPropagation()"
                  class="del-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  <lucide-icon [img]="Trash2" class="w-3 h-3"></lucide-icon>
                  Delete
                </button>

                <!-- Expand hint + Chevron -->
                <div class="expand-cue" [class.expand-cue--open]="expandedRow() === obj.name">
                  <span class="expand-label">
                    {{ expandedRow() === obj.name ? 'Collapse' : 'View Schema' }}
                  </span>
                  <div class="chevron-wrap" [class.chevron-wrap--open]="expandedRow() === obj.name">
                    <lucide-icon [img]="ChevronDown" class="w-4 h-4"></lucide-icon>
                  </div>
                </div>
              </div>
            </div>

            <!-- Collapsible JSON body -->
            <div class="accordion-body" [class.accordion-body--open]="expandedRow() === obj.name">
              <div class="accordion-body-inner px-6 pb-5">
                <div class="json-viewer" [class.json-viewer--editing]="editingRow() === obj.name">

                  <!-- JSON viewer header -->
                  <div class="json-viewer-header">
                    <div class="dot-group">
                      <span class="dot dot--red"></span>
                      <span class="dot dot--amber"></span>
                      <span class="dot dot--green"></span>
                    </div>

                    <!-- Edit / Apply / Cancel controls -->
                    <div class="edit-controls" (click)="$event.stopPropagation()">
                      <ng-container *ngIf="editingRow() !== obj.name">
                        <button class="ctrl-btn ctrl-btn--edit"
                          (click)="startEdit(obj.name, obj.json)">
                          <lucide-icon [img]="Pencil" class="w-3 h-3"></lucide-icon>
                          Edit
                        </button>
                      </ng-container>
                      <ng-container *ngIf="editingRow() === obj.name">
                        <span *ngIf="editError()" class="edit-error">Invalid JSON</span>
                        <button class="ctrl-btn ctrl-btn--cancel" (click)="cancelEdit()">
                          <lucide-icon [img]="X" class="w-3 h-3"></lucide-icon>
                          Cancel
                        </button>
                        <button class="ctrl-btn ctrl-btn--apply" (click)="applyEdit(obj.name)">
                          <lucide-icon [img]="Check" class="w-3 h-3"></lucide-icon>
                          Apply
                        </button>
                      </ng-container>
                    </div>
                  </div>

                  <!-- Read mode -->
                  <pre *ngIf="editingRow() !== obj.name"
                    class="json-code"
                    (click)="startEdit(obj.name, obj.json); $event.stopPropagation()">{{ obj.json }}</pre>

                  <!-- Edit mode -->
                  <textarea *ngIf="editingRow() === obj.name"
                    class="json-textarea"
                    [class.json-textarea--error]="editError()"
                    [ngModel]="editDraft()"
                    (ngModelChange)="editDraft.set($event); editError.set(false)"
                    (click)="$event.stopPropagation()"
                    spellcheck="false"
                    rows="10">
                  </textarea>

                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Empty state -->
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

    /* ── Panel ── */
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

    /* ── Accordion ── */
    .accordion-list { display: flex; flex-direction: column; }

    .accordion-item {
      border-bottom: 1px solid rgba(163,174,208,0.14);
      border-left: 3px solid transparent;
      transition: border-left-color 0.2s ease, background 0.15s ease;
    }
    .accordion-item--last { border-bottom: none; }
    .accordion-item:hover { border-left-color: rgba(67,24,255,0.2); }
    .accordion-item--expanded {
      border-left-color: #4318FF;
      background: #FAFBFF;
    }

    /* Header row */
    .accordion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      cursor: pointer;
      user-select: none;
      transition: background 0.15s ease;
    }
    .accordion-header:hover { background: rgba(67,24,255,0.02); }
    .accordion-item--expanded .accordion-header {
      background: transparent;
      padding-bottom: 14px;
    }

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

    .expand-cue {
      display: flex; align-items: center; gap: 5px;
      color: #A3AED0;
      transition: color 0.2s ease;
    }
    .expand-cue--open { color: #4318FF; }
    .accordion-header:hover .expand-cue { color: #7C5CFC; }

    .expand-label {
      font-size: 9px; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.12em;
      opacity: 0;
      transform: translateX(4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      white-space: nowrap;
    }
    .accordion-header:hover .expand-label,
    .expand-cue--open .expand-label {
      opacity: 1;
      transform: translateX(0);
    }

    .chevron-wrap {
      transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .chevron-wrap--open { transform: rotate(180deg); }

    /* ── Collapsible body ── */
    .accordion-body {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      visibility: hidden;
      transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.25s ease,
                  visibility 0s linear 0.32s;
    }
    .accordion-body--open {
      grid-template-rows: 1fr;
      opacity: 1;
      visibility: visible;
      transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.25s ease 0.05s,
                  visibility 0s linear 0s;
    }
    .accordion-body-inner { overflow: hidden; min-height: 0; }

    /* ── JSON viewer ── */
    .json-viewer {
      background: #0D1117;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.12);
      transition: border-color 0.2s ease;
    }
    .json-viewer--editing {
      border-color: rgba(67,24,255,0.35);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 3px rgba(67,24,255,0.08), 0 4px 16px rgba(0,0,0,0.12);
    }

    .json-viewer-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 12px 8px 16px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .dot-group { display: flex; align-items: center; gap: 5px; }
    .dot { width: 9px; height: 9px; border-radius: 50%; }
    .dot--red   { background: #FF5F57; }
    .dot--amber { background: #FFBD2E; }
    .dot--green { background: #28C840; }

    /* Edit controls */
    .edit-controls { display: flex; align-items: center; gap: 6px; }
    .edit-error {
      font-size: 9px; font-weight: 800; color: #F87171;
      text-transform: uppercase; letter-spacing: 0.1em;
      margin-right: 2px;
    }
    .ctrl-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 6px;
      font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
      cursor: pointer; border: 1px solid; transition: all 0.15s;
    }
    .ctrl-btn--edit {
      color: #A3AED0; background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.08);
    }
    .ctrl-btn--edit:hover { color: #C8CDE8; background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.14); }
    .ctrl-btn--cancel {
      color: #F87171; background: rgba(248,113,113,0.06);
      border-color: rgba(248,113,113,0.2);
    }
    .ctrl-btn--cancel:hover { background: rgba(248,113,113,0.12); }
    .ctrl-btn--apply {
      color: #28C840; background: rgba(40,200,64,0.08);
      border-color: rgba(40,200,64,0.25);
    }
    .ctrl-btn--apply:hover { background: rgba(40,200,64,0.15); }

    /* Read-only pre */
    .json-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 11.5px; line-height: 1.75;
      color: #A9B1D6;
      padding: 16px; margin: 0;
      white-space: pre-wrap; word-break: break-word;
      cursor: text;
      background-image: repeating-linear-gradient(
        0deg, transparent, transparent 23px,
        rgba(255,255,255,0.015) 23px, rgba(255,255,255,0.015) 24px
      );
    }
    .json-code:hover { color: #C2C9E8; }

    /* Editable textarea */
    .json-textarea {
      display: block;
      width: 100%; box-sizing: border-box;
      font-family: 'Courier New', Courier, monospace;
      font-size: 11.5px; line-height: 1.75;
      color: #C9D1F0;
      background: #0D1117;
      border: none; outline: none;
      padding: 16px; margin: 0;
      resize: vertical;
      min-height: 160px;
      white-space: pre;
      overflow-x: auto;
      background-image: repeating-linear-gradient(
        0deg, transparent, transparent 23px,
        rgba(255,255,255,0.015) 23px, rgba(255,255,255,0.015) 24px
      );
    }
    .json-textarea--error { color: #F87171; }
    .json-textarea:focus { outline: none; }
  `]
})
export class ObjectConfigComponent {
  readonly Database = Database;
  readonly Trash2 = Trash2;
  readonly Save = Save;
  readonly ChevronDown = ChevronDown;
  readonly Code2 = Code2;
  readonly Braces = Braces;
  readonly Pencil = Pencil;
  readonly Check = Check;
  readonly X = X;

  showTable = signal(false);
  expandedRow = signal<string | null>(null);
  editingRow = signal<string | null>(null);
  editDraft = signal<string>('');
  editError = signal(false);

  toggleRow(name: string) {
    // Don't collapse while editing this row
    if (this.editingRow() === name) return;
    this.expandedRow.set(this.expandedRow() === name ? null : name);
  }

  startEdit(name: string, json: string) {
    this.editDraft.set(json);
    this.editError.set(false);
    this.editingRow.set(name);
  }

  applyEdit(name: string) {
    try {
      JSON.parse(this.editDraft());
      this.configuredObjects.update(obs =>
        obs.map(o => o.name === name ? { ...o, json: this.editDraft() } : o)
      );
      this.editError.set(false);
      this.editingRow.set(null);
    } catch {
      this.editError.set(true);
    }
  }

  cancelEdit() {
    this.editDraft.set('');
    this.editError.set(false);
    this.editingRow.set(null);
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
  "required": ["FirstName","LastName","Gender","DateOfBirth"],
  "properties": {
    "FirstName": { "type": "string" },
    "LastName":  { "type": "string" },
    "Gender":    { "type": "string", "enum": ["Male","Female","Other"] },
    "DateOfBirth": { "type": "string", "format": "date" }
  }
}`
    },
    {
      name: 'Identity',
      json: `{
  "oneOf": [{ "type": "object", "required": ["EmiratesId"] }],
  "properties": {
    "EmiratesId": { "type": "string" },
    "VisaNumber":  { "type": "string" },
    "VisaType":    { "type": "string", "enum": ["Employment","Residence"] }
  }
}`
    },
    {
      name: 'Product',
      json: `{
  "type": "object",
  "required": ["Policy","PropertyDetails"],
  "properties": {
    "CoverType":   { "type": "string" },
    "Description": { "type": "string" }
  }
}`
    },
    {
      name: 'Claims',
      json: `{
  "type": "object",
  "required": ["Summary","NoClaimsDiscountAvailable"],
  "properties": {
    "Summary":                    { "type": "string" },
    "NoClaimsDiscountAvailable":  { "type": "boolean" }
  }
}`
    },
    {
      name: 'Premium',
      json: `{
  "type": "object",
  "required": ["TotalPremiumAmount","PaymentFrequency"],
  "properties": {
    "TotalPremiumAmount": { "type": "number" },
    "PaymentFrequency":   { "type": "string" }
  }
}`
    }
  ]);

  deleteObject(name: string) {
    if (this.editingRow() === name) this.cancelEdit();
    this.configuredObjects.update(obs => obs.filter(o => o.name !== name));
    if (this.expandedRow() === name) this.expandedRow.set(null);
  }

  saveObjects() {
    console.log('Saving objects...', this.configuredObjects());
  }
}