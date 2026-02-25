import { Component, Input, signal, WritableSignal, OnDestroy, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    LucideAngularModule, Search, Trash2, ArrowRight, X, Play,
    Save as SaveIcon, ChevronUp, ChevronDown, ChevronRight,
    Link2, Zap, CheckCircle2, Unlink
} from 'lucide-angular';

@Component({
    selector: 'app-field-mapping',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="grid grid-cols-12 gap-5 animate-in slide-in-from-bottom-4 fade-in duration-500">

      <!-- ══════════════════════════════════════════ -->
      <!-- LEFT: Mapping Rules Panel                 -->
      <!-- ══════════════════════════════════════════ -->
      <div class="col-span-12 lg:col-span-9 flex flex-col">
        <div class="rules-panel flex flex-col">

          <!-- Header -->
          <div class="rules-header">
            <div class="flex items-center gap-2.5">
              <div class="header-icon">
                <lucide-icon [img]="Link2" class="w-3.5 h-3.5 text-[#4318FF]"></lucide-icon>
              </div>
              <span class="text-xs font-black text-[#2B3674] uppercase tracking-widest">Field Mappings</span>
              <div class="flex items-center gap-1.5">
                <span class="stat-chip stat-chip--mapped">{{ mappedCount() }} mapped</span>
                <span class="stat-chip stat-chip--pending">{{ pendingCount() }} pending</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="relative">
                <lucide-icon [img]="Search" class="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#A3AED0] pointer-events-none"></lucide-icon>
                <input type="text" [(ngModel)]="mappingSearchQuery" placeholder="Search fields..." class="search-input pl-9">
              </div>
              <button *ngIf="isEditMode" (click)="clearAllMappings()" class="icon-btn icon-btn--danger" title="Clear all">
                <lucide-icon [img]="Unlink" class="w-3.5 h-3.5"></lucide-icon>
              </button>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="mapping-progress-bar">
            <div class="mapping-progress-fill" [style.width.%]="mappingProgress()"></div>
          </div>

          <!-- Mapping rows -->
          <div class="flex-1 overflow-auto custom-scrollbar px-5 py-4">
            <div class="flex flex-col gap-2.5">
              <div *ngFor="let field of filteredMappingRules(); let i = index"
                class="mapping-row group"
                [class.mapping-row--mapped]="!!field.mappedTo"
                [class.mapping-row--drop-active]="isEditMode && activeDragOver === field.name"
                (dragover)="isEditMode ? onDragOver($event, field.name) : null"
                (dragleave)="isEditMode ? onDragLeave($event) : null"
                (drop)="isEditMode ? onDrop($event, field.name) : null">

                <!-- Source node -->
                <div class="mapping-node mapping-node--source">
                  <div class="node-index">{{ (i + 1).toString().padStart(2,'0') }}</div>
                  <div class="node-body">
                    <span class="node-label">{{ field.name }}</span>
                    <span class="node-type">OFS Field</span>
                  </div>
                </div>

                <!-- Connector -->
                <div class="connector">
                  <div class="connector-dot" [class.dot--live]="!!field.mappedTo"></div>
                  <div class="connector-trace" [class.connector-trace--live]="!!field.mappedTo">
                    <div *ngIf="!!field.mappedTo" class="trace-pulse"></div>
                  </div>
                  <lucide-icon [img]="ArrowRight" class="connector-arrow w-3.5 h-3.5" [class.arrow--live]="!!field.mappedTo"></lucide-icon>
                  <div class="connector-dot" [class.dot--live]="!!field.mappedTo"></div>
                </div>

                <!-- Target drop zone -->
                <div class="mapping-node mapping-node--target"
                  [class.mapping-node--filled]="!!field.mappedTo"
                  [class.mapping-node--empty]="!field.mappedTo">

                  <div *ngIf="field.mappedTo" class="flex items-center justify-between w-full gap-2 animate-in zoom-in-95 duration-200">
                    <div class="flex items-center gap-2 min-w-0">
                      <lucide-icon [img]="CheckCircle2" class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"></lucide-icon>
                      <div class="node-body min-w-0">
                        <span class="node-label truncate block">{{ field.mappedTo }}</span>
                        <span class="node-type">LFI Field</span>
                      </div>
                    </div>
                    <button *ngIf="isEditMode" (click)="removeMapping(field)" class="unmap-btn flex-shrink-0">
                      <lucide-icon [img]="X" class="w-3 h-3"></lucide-icon>
                    </button>
                  </div>

                  <div *ngIf="!field.mappedTo" class="empty-target">
                    <span *ngIf="isEditMode">← Drop LFI field</span>
                    <span *ngIf="!isEditMode">Unmapped</span>
                  </div>
                </div>

                <!-- Row actions -->
                <div *ngIf="isEditMode" class="row-actions opacity-0 group-hover:opacity-100 transition-opacity">
                  <button (click)="openRuleModal(field)" class="action-pill action-pill--rule">
                    <lucide-icon [img]="Zap" class="w-3 h-3"></lucide-icon>
                    Rule
                  </button>
                  <button class="icon-btn-sm">
                    <lucide-icon [img]="Trash2" class="w-3 h-3"></lucide-icon>
                  </button>
                </div>

              </div>

              <div *ngIf="filteredMappingRules().length === 0" class="py-12 text-center">
                <p class="text-xs font-bold text-[#A3AED0] uppercase tracking-widest">No fields match</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="rules-footer">
            <div class="flex items-center gap-2 text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest">
              <div class="w-2 h-2 rounded-full transition-colors"
                [class.bg-emerald-400]="mappingProgress() === 100"
                [class.bg-amber-400]="mappingProgress() < 100 && mappingProgress() > 0"
                [class.bg-gray-300]="mappingProgress() === 0">
              </div>
              {{ mappingProgress() === 100 ? 'All mapped' : mappingProgress() + '% complete' }}
            </div>
            <div class="flex items-center gap-2">
              <button (click)="testMappings()" class="footer-btn footer-btn--ghost flex items-center gap-1.5">
                <lucide-icon [img]="Play" class="w-3.5 h-3.5"></lucide-icon>
                Test
              </button>
              <button *ngIf="isEditMode" (click)="saveMappings()" class="footer-btn footer-btn--primary flex items-center gap-1.5">
                <lucide-icon [img]="SaveIcon" class="w-3.5 h-3.5"></lucide-icon>
                Save Mappings
              </button>
              <span *ngIf="!isEditMode" class="footer-btn footer-btn--disabled">Read Only</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════ -->
      <!-- RIGHT: LFI Field Sidebar                  -->
      <!-- ══════════════════════════════════════════ -->
      <div class="col-span-12 lg:col-span-3">
        <div class="lfi-panel sticky top-4">

          <div class="lfi-header">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black text-[#2B3674] uppercase tracking-widest">LFI Fields</span>
              <span class="count-chip">{{ totalLfiFields() }}</span>
            </div>
          </div>

          <div class="lfi-search-wrap">
            <lucide-icon [img]="Search" class="lfi-search-icon"></lucide-icon>
            <input type="text" [(ngModel)]="sidebarSearchQuery" placeholder="Search LFI fields..." class="lfi-search">
          </div>

          <div class="lfi-list custom-scrollbar">
            <div *ngFor="let group of filteredLfiGroups()" class="lfi-group">
              <button (click)="group.expanded = !group.expanded" class="lfi-group-btn">
                <div class="flex items-center gap-2">
                  <div class="group-chevron" [class.group-chevron--open]="group.expanded">
                    <lucide-icon [img]="ChevronRight" class="w-3 h-3 text-[#A3AED0]"></lucide-icon>
                  </div>
                  <span class="text-[11px] font-black text-[#2B3674] uppercase tracking-wider">{{ group.name }}</span>
                </div>
                <span class="text-[9px] font-bold text-[#A3AED0]">{{ group.fields.length }}</span>
              </button>

              <div *ngIf="group.expanded" class="lfi-field-list animate-in slide-in-from-top-2 duration-200">
                <div *ngFor="let field of group.fields; let last = last" class="lfi-field-wrap" [class.last]="last">
                  <div class="tree-line"></div>
                  <div
                    [attr.draggable]="isEditMode"
                    (dragstart)="isEditMode ? onDragStart($event, field) : null"
                    class="lfi-field"
                    [class.lfi-field--active]="isEditMode"
                    [class.lfi-field--readonly]="!isEditMode">
                    {{ field }}
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="filteredLfiGroups().length === 0" class="py-8 text-center">
              <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest">No matches</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
    styles: [`
    /* ── Rules panel ── */
    .rules-panel {
      background: white;
      border: 1px solid rgba(163,174,208,0.18);
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 4px 20px rgba(112,144,176,0.07);
      min-height: 580px;
    }
    .rules-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 20px; background: #FAFBFF;
      border-bottom: 1px solid rgba(163,174,208,0.12); flex-shrink: 0;
    }
    .header-icon {
      width: 26px; height: 26px; border-radius: 8px;
      background: rgba(67,24,255,0.08);
      display: flex; align-items: center; justify-content: center;
    }
    .stat-chip {
      display: inline-flex; align-items: center;
      padding: 2px 8px; border-radius: 6px;
      font-size: 10px; font-weight: 900;
    }
    .stat-chip--mapped { background: rgba(5,205,153,0.1); color: #05CD99; }
    .stat-chip--pending { background: rgba(163,174,208,0.12); color: #A3AED0; }

    /* Progress */
    .mapping-progress-bar { height: 3px; background: #F1F5F9; }
    .mapping-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4318FF 0%, #05CD99 100%);
      transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
    }

    /* Search */
    .search-input {
      padding: 7px 12px; border-radius: 10px;
      border: 1px solid #E2E8F0; background: #F8FAFF;
      font-size: 11px; font-weight: 700; color: #2B3674;
      outline: none; transition: all 0.2s; width: 190px;
    }
    .search-input:focus { border-color: #4318FF; background: white; box-shadow: 0 0 0 3px rgba(67,24,255,0.06); }

    /* Buttons */
    .icon-btn {
      width: 32px; height: 32px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      border: none; cursor: pointer; transition: all 0.2s;
    }
    .icon-btn--danger { background: rgba(248,113,113,0.08); color: #F87171; }
    .icon-btn--danger:hover { background: rgba(248,113,113,0.15); color: #EF4444; }
    .icon-btn-sm {
      width: 24px; height: 24px; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      background: transparent; color: #D0D5E8; border: none; cursor: pointer; transition: all 0.2s;
    }
    .icon-btn-sm:hover { background: rgba(248,113,113,0.1); color: #F87171; }

    /* ── Mapping row — connection-diagram layout ── */
    .mapping-row {
      display: flex; align-items: center;
      border-radius: 14px; border: 1px solid rgba(163,174,208,0.15);
      overflow: hidden; transition: all 0.2s ease; background: #F8FAFF;
    }
    .mapping-row:hover { border-color: rgba(67,24,255,0.18); box-shadow: 0 4px 16px rgba(67,24,255,0.05); }
    .mapping-row--mapped { border-color: rgba(5,205,153,0.2); background: rgba(5,205,153,0.02); }
    .mapping-row--mapped:hover { border-color: rgba(5,205,153,0.35); box-shadow: 0 4px 16px rgba(5,205,153,0.08); }
    .mapping-row--drop-active {
      border-color: #4318FF !important;
      box-shadow: 0 0 0 3px rgba(67,24,255,0.1) !important;
      background: rgba(67,24,255,0.02) !important;
    }

    /* Node */
    .mapping-node {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 14px; flex: 1; min-width: 0;
    }
    .mapping-node--source { border-right: 1px solid rgba(163,174,208,0.12); }
    .mapping-node--target { border-left: 1px solid rgba(163,174,208,0.12); }
    .mapping-node--empty { background: transparent; }
    .mapping-node--filled { background: rgba(5,205,153,0.02); }

    .node-index {
      font-family: 'Courier New', monospace;
      font-size: 10px; font-weight: 700; color: #D0D5E8; flex-shrink: 0; min-width: 20px;
    }
    .node-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
    .node-label { font-size: 12px; font-weight: 800; color: #2B3674; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .node-type { font-size: 9px; font-weight: 700; color: #C5CEDF; text-transform: uppercase; letter-spacing: 0.08em; }

    /* Connector wire */
    .connector {
      flex-shrink: 0; width: 72px; padding: 0 4px;
      display: flex; align-items: center; gap: 0;
    }
    .connector-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #E2E8F0; flex-shrink: 0; transition: all 0.3s;
    }
    .connector-dot.dot--live { background: #05CD99; box-shadow: 0 0 6px rgba(5,205,153,0.5); }
    .connector-trace {
      flex: 1; height: 2px; background: #E2E8F0;
      position: relative; overflow: hidden; transition: background 0.3s;
    }
    .connector-trace--live { background: linear-gradient(90deg, #05CD99, #4318FF); }
    .trace-pulse {
      position: absolute; top: 0; left: -60%;
      width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
      animation: traceSweep 2s ease-in-out infinite;
    }
    @keyframes traceSweep { 0% { left:-60%; } 100% { left:100%; } }
    .connector-arrow { color: #D0D5E8; flex-shrink: 0; transition: color 0.3s; }
    .connector-arrow.arrow--live { color: #4318FF; }

    /* Empty drop target */
    .empty-target {
      font-size: 10px; font-weight: 700; color: #C5CEDF;
      text-transform: uppercase; letter-spacing: 0.08em;
      padding: 8px 12px; border-radius: 10px;
      border: 1.5px dashed rgba(163,174,208,0.35);
      width: 100%; text-align: center; transition: all 0.2s;
    }
    .mapping-row--drop-active .empty-target {
      border-color: #4318FF; color: #4318FF; background: rgba(67,24,255,0.04);
    }

    /* Unmap button */
    .unmap-btn {
      width: 22px; height: 22px; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      background: transparent; color: #D0D5E8; border: none; cursor: pointer; transition: all 0.2s;
    }
    .unmap-btn:hover { background: rgba(248,113,113,0.1); color: #F87171; }

    /* Row actions */
    .row-actions { display: flex; align-items: center; gap: 6px; padding: 0 10px; flex-shrink: 0; }
    .action-pill {
      display: flex; align-items: center; gap: 4px;
      padding: 4px 10px; border-radius: 8px;
      font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;
      cursor: pointer; border: none; transition: all 0.2s;
    }
    .action-pill--rule { background: rgba(5,205,153,0.1); color: #05CD99; border: 1px solid rgba(5,205,153,0.2); }
    .action-pill--rule:hover { background: #05CD99; color: white; }

    /* Footer */
    .rules-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 20px; border-top: 1px solid rgba(163,174,208,0.12);
      background: #FAFBFF; flex-shrink: 0;
    }
    .footer-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 18px; border-radius: 12px;
      font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
      cursor: pointer; transition: all 0.2s;
    }
    .footer-btn--ghost { border: 1.5px solid rgba(67,24,255,0.18); color: #4318FF; background: transparent; }
    .footer-btn--ghost:hover { background: rgba(67,24,255,0.05); }
    .footer-btn--primary { background: #2B3674; color: white; border: none; box-shadow: 0 6px 16px rgba(43,54,116,0.18); }
    .footer-btn--primary:hover { background: #1B2559; transform: translateY(-1px); }
    .footer-btn--disabled {
      display: flex; align-items: center;
      padding: 8px 18px; border-radius: 12px;
      font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
      border: 1px solid #E2E8F0; color: #A3AED0; cursor: not-allowed; opacity: 0.6;
    }

    /* ── LFI Panel ── */
    .lfi-panel {
      background: white; border: 1px solid rgba(163,174,208,0.18);
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 4px 20px rgba(112,144,176,0.07);
      display: flex; flex-direction: column; max-height: 620px;
    }
    .lfi-header {
      padding: 14px 16px; background: #FAFBFF;
      border-bottom: 1px solid rgba(163,174,208,0.12); flex-shrink: 0;
    }
    .count-chip {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 1px 7px; border-radius: 6px;
      background: rgba(67,24,255,0.07); color: #4318FF;
      font-size: 10px; font-weight: 900;
    }
    .lfi-search-wrap {
      position: relative; padding: 10px 12px;
      border-bottom: 1px solid rgba(163,174,208,0.1); flex-shrink: 0;
    }
    .lfi-search-icon {
      position: absolute; left: 24px; top: 50%; translate: 0 -50%;
      width: 13px; height: 13px; color: #A3AED0; pointer-events: none;
    }
    .lfi-search {
      width: 100%; padding: 7px 10px 7px 30px;
      border: 1px solid #E2E8F0; border-radius: 10px;
      font-size: 11px; font-weight: 700; color: #2B3674;
      background: #F8FAFF; outline: none; transition: all 0.2s;
    }
    .lfi-search:focus { border-color: #4318FF; background: white; box-shadow: 0 0 0 3px rgba(67,24,255,0.06); }
    .lfi-list { flex: 1; overflow-y: auto; padding: 8px 10px; }

    /* Group */
    .lfi-group { margin-bottom: 2px; }
    .lfi-group-btn {
      width: 100%; display: flex; align-items: center; justify-content: space-between;
      padding: 8px 10px; border-radius: 10px;
      background: transparent; border: none; cursor: pointer; transition: background 0.15s;
    }
    .lfi-group-btn:hover { background: #F8FAFF; }
    .group-chevron {
      width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s ease;
    }
    .group-chevron--open { transform: rotate(90deg); }

    /* Tree structure */
    .lfi-field-list { padding: 2px 0 4px 18px; }
    .lfi-field-wrap { display: flex; align-items: center; position: relative; }
    .tree-line {
      position: absolute; left: -10px; top: 0; bottom: 0;
      width: 1px; background: rgba(163,174,208,0.2);
    }
    .lfi-field-wrap.last .tree-line { height: 50%; }
    .lfi-field {
      flex: 1; padding: 6px 10px; border-radius: 8px;
      font-size: 11px; font-weight: 700; color: #4318FF;
      border: 1px solid transparent; transition: all 0.15s;
      user-select: none; margin: 1px 0;
    }
    .lfi-field--active { cursor: grab; }
    .lfi-field--active:hover {
      background: white; border-color: rgba(67,24,255,0.15);
      box-shadow: 0 2px 8px rgba(67,24,255,0.08); transform: translateX(3px);
    }
    .lfi-field--active:active { cursor: grabbing; }
    .lfi-field--readonly { color: #A3AED0; cursor: default; }

    /* Scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(163,174,208,0.3); border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(67,24,255,0.2); }
  `]
})
export class FieldMappingComponent implements OnDestroy {
    @Input() mappingRules!: WritableSignal<any[]>;
    @Input() lfiFieldGroups!: WritableSignal<any[]>;
    @Input() isEditMode: boolean = false;

    mappingSearchQuery = '';
    sidebarSearchQuery = '';
    activeDragOver: string | null = null;

    private renderer = inject(Renderer2);
    private modalEl: HTMLElement | null = null;
    private backdropListener: (() => void) | null = null;

    isRuleModalOpen = signal(false);
    selectedFieldForBonus = signal<any>(null);
    selectedFunction = '';
    condition = '';

    readonly Search = Search;
    readonly Trash2 = Trash2;
    readonly ArrowRight = ArrowRight;
    readonly X = X;
    readonly Play = Play;
    readonly SaveIcon = SaveIcon;
    readonly ChevronUp = ChevronUp;
    readonly ChevronDown = ChevronDown;
    readonly ChevronRight = ChevronRight;
    readonly Link2 = Link2;
    readonly Zap = Zap;
    readonly CheckCircle2 = CheckCircle2;
    readonly Unlink = Unlink;

    filteredMappingRules() {
        return this.mappingRules().filter((f: any) =>
            f.name.toLowerCase().includes(this.mappingSearchQuery.toLowerCase())
        );
    }

    filteredLfiGroups() {
        if (!this.sidebarSearchQuery) return this.lfiFieldGroups();
        const q = this.sidebarSearchQuery.toLowerCase();
        return this.lfiFieldGroups().map((g: any) => ({
            ...g, expanded: true,
            fields: g.fields.filter((f: string) => f.toLowerCase().includes(q))
        })).filter((g: any) => g.fields.length > 0);
    }

    mappedCount() { return this.mappingRules().filter((r: any) => !!r.mappedTo).length; }
    pendingCount() { return this.mappingRules().filter((r: any) => !r.mappedTo).length; }
    mappingProgress() {
        const total = this.mappingRules().length;
        return total === 0 ? 0 : Math.round((this.mappedCount() / total) * 100);
    }
    totalLfiFields() {
        return this.lfiFieldGroups().reduce((sum: number, g: any) => sum + g.fields.length, 0);
    }

    onDragStart(event: DragEvent, field: string) {
        event.dataTransfer?.setData('text/plain', field);
    }
    onDragOver(event: DragEvent, fieldName: string) {
        event.preventDefault();
        this.activeDragOver = fieldName;
    }
    onDragLeave(event: DragEvent) { this.activeDragOver = null; }
    onDrop(event: DragEvent, fieldName: string) {
        event.preventDefault();
        this.activeDragOver = null;
        const lfiField = event.dataTransfer?.getData('text/plain');
        if (lfiField) {
            this.mappingRules.update(rules => rules.map(r =>
                r.name === fieldName ? { ...r, mappedTo: lfiField } : r
            ));
        }
    }
    removeMapping(field: any) {
        this.mappingRules.update(rules => rules.map(r =>
            r.name === field.name ? { ...r, mappedTo: null } : r
        ));
    }
    clearAllMappings() {
        this.mappingRules.update(rules => rules.map(r => ({ ...r, mappedTo: null })));
    }

    openRuleModal(field: any) {
        this.selectedFieldForBonus.set(field);
        this.isRuleModalOpen.set(true);
        this.mountRuleModal();
    }
    closeRuleModal() {
        this.isRuleModalOpen.set(false);
        this.selectedFunction = '';
        this.condition = '';
        this.unmountRuleModal();
    }

    private mountRuleModal() {
        this.unmountRuleModal();
        const fieldName = this.selectedFieldForBonus()?.name || '';
        const overlay = document.createElement('div');
        overlay.setAttribute('id', 'rule-portal-overlay');
        overlay.innerHTML = `
      <style>
        #rule-portal-overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(11,14,40,0.65);backdrop-filter:blur(6px);animation:ruleFade .2s ease-out; }
        #rule-portal-box { background:#fff;border-radius:24px;box-shadow:0 32px 80px rgba(0,0,0,0.22);width:100%;max-width:420px;overflow:hidden;animation:ruleSlide .3s cubic-bezier(0.16,1,0.3,1); }
        @keyframes ruleFade { from{opacity:0} to{opacity:1} }
        @keyframes ruleSlide { from{opacity:0;transform:translateY(18px) scale(.96)} to{opacity:1;transform:none} }
        #rule-ph { padding:20px 24px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;background:#fafbff; }
        #rule-ph h3 { margin:0;font-size:15px;font-weight:900;color:#2B3674; }
        #rule-xbtn { background:none;border:none;cursor:pointer;padding:6px;border-radius:50%;color:#94a3b8;line-height:0;transition:all .2s; }
        #rule-xbtn:hover { background:#fff3f3;color:#ef4444;transform:rotate(90deg); }
        #rule-pb { padding:24px;display:flex;flex-direction:column;gap:18px; }
        #rule-pb p { margin:0;font-size:13px;color:#A3AED0;line-height:1.6; }
        #rule-pb strong { color:#2B3674;font-weight:800; }
        .rule-label { font-size:10px;font-weight:900;color:#2B3674;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px; }
        .rule-sel-wrap { position:relative; }
        .rule-select { width:100%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:10px 14px;font-size:13px;font-weight:700;color:#2B3674;appearance:none;outline:none;transition:all .2s; }
        .rule-select:focus { border-color:#4318FF;background:#fff;box-shadow:0 0 0 3px rgba(67,24,255,0.06); }
        .rule-chev { position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;color:#A3AED0; }
        .rule-input { width:100%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:10px 14px;font-size:13px;font-weight:700;color:#2B3674;outline:none;transition:all .2s; }
        .rule-input:focus { border-color:#4318FF;background:#fff;box-shadow:0 0 0 3px rgba(67,24,255,0.06); }
        .rule-input::placeholder { color:#C5CEDF; }
        #rule-pf { padding:18px 24px;background:#fafbff;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px; }
        .rule-btn { padding:9px 22px;border-radius:12px;font-weight:800;font-size:12px;cursor:pointer;transition:all .2s;text-transform:uppercase;letter-spacing:0.05em; }
        #rule-cbtn { border:1.5px solid #e2e8f0;background:#fff;color:#2B3674; }
        #rule-cbtn:hover { background:#fef2f2;border-color:#fee2e2;color:#ef4444; }
        #rule-okbtn { border:none;background:#2B3674;color:#fff;box-shadow:0 6px 16px rgba(43,54,116,0.2); }
        #rule-okbtn:hover { background:#1B2559;transform:translateY(-1px); }
      </style>
      <div id="rule-portal-box">
        <div id="rule-ph">
          <h3>Add Rule — ${fieldName}</h3>
          <button id="rule-xbtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
        </div>
        <div id="rule-pb">
          <p>Configure a transformation to apply when mapping <strong>${fieldName}</strong>.</p>
          <div>
            <div class="rule-label">Transformation Function</div>
            <div class="rule-sel-wrap">
              <select id="rule-func-select" class="rule-select">
                <option value="" disabled selected>Select function...</option>
                <option value="uppercase">UPPERCASE</option>
                <option value="lowercase">LOWERCASE</option>
                <option value="date-format">DATE_FORMAT</option>
                <option value="concat">CONCAT</option>
                <option value="trim">TRIM</option>
                <option value="default">DEFAULT_VALUE</option>
              </select>
              <div class="rule-chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
            </div>
          </div>
          <div>
            <div class="rule-label">Condition (optional)</div>
            <input id="rule-cond-input" type="text" class="rule-input" placeholder="e.g. Status = 'Approved'" value="${this.condition}">
          </div>
        </div>
        <div id="rule-pf">
          <button class="rule-btn" id="rule-cbtn">Cancel</button>
          <button class="rule-btn" id="rule-okbtn">Apply Rule</button>
        </div>
      </div>
    `;
        document.body.appendChild(overlay);
        this.modalEl = overlay;
        overlay.querySelector('#rule-func-select')!.addEventListener('change', (e) => this.selectedFunction = (e.target as HTMLSelectElement).value);
        overlay.querySelector('#rule-cond-input')!.addEventListener('input', (e) => this.condition = (e.target as HTMLInputElement).value);
        overlay.querySelector('#rule-xbtn')!.addEventListener('click', () => this.closeRuleModal());
        overlay.querySelector('#rule-cbtn')!.addEventListener('click', () => this.closeRuleModal());
        overlay.querySelector('#rule-okbtn')!.addEventListener('click', () => this.updateRule());
        this.backdropListener = this.renderer.listen(overlay, 'click', (e: MouseEvent) => {
            if (e.target === overlay) this.closeRuleModal();
        });
    }

    private unmountRuleModal() {
        this.modalEl?.remove();
        this.modalEl = null;
        this.backdropListener?.();
        this.backdropListener = null;
    }

    ngOnDestroy() { this.unmountRuleModal(); }
    updateRule() {
        console.log('Rule:', { field: this.selectedFieldForBonus()?.name, function: this.selectedFunction, condition: this.condition });
        this.closeRuleModal();
    }
    testMappings() { console.log('Testing:', this.mappingRules()); }
    saveMappings() { console.log('Saving:', this.mappingRules()); }
}