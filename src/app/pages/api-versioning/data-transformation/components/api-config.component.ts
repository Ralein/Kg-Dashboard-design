import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, UploadCloud, FileJson, CheckCircle2, Copy, Check, Braces, FileCode } from 'lucide-angular';

@Component({
  selector: 'app-api-config',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="grid grid-cols-12 gap-5 animate-in slide-in-from-bottom-4 fade-in duration-500">

      <!-- ── Left: Upload Zone ── -->
      <div class="col-span-12 lg:col-span-4">
        <div (click)="fileInput.click()"
             (dragover)="onDragOver($event)"
             (dragleave)="isDragging.set(false)"
             (drop)="onFileDropped($event)"
             class="upload-zone h-full flex flex-col items-center justify-center text-center cursor-pointer group"
             [class.upload-zone--dragging]="isDragging()">

          <!-- Animated upload icon -->
          <div class="upload-icon-wrap mb-6" [class.upload-icon-wrap--active]="isDragging()">
            <div class="upload-icon-ring ring-outer"></div>
            <div class="upload-icon-ring ring-inner"></div>
            <div class="upload-icon-core">
              <lucide-icon [img]="UploadCloud" class="w-7 h-7 text-[#4318FF]"></lucide-icon>
            </div>
          </div>

          <h4 class="text-sm font-black text-[#2B3674] tracking-tight mb-1">
            {{ isDragging() ? 'Release to upload' : 'Drop your JSON here' }}
          </h4>
          <p class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-widest mb-6">
            .json &nbsp;·&nbsp; .txt
          </p>

          <input #fileInput type="file" (change)="onFileSelected($event)" accept=".json,.txt" class="hidden">

          <button class="browse-btn text-[11px] font-black uppercase tracking-widest px-5 py-2 rounded-xl transition-all">
            Browse Files
          </button>

          <!-- File loaded indicator -->
          <div *ngIf="loadedFileName()" class="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
            <lucide-icon [img]="FileCode" class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"></lucide-icon>
            <span class="text-[10px] font-black text-emerald-700 truncate max-w-[140px]">{{ loadedFileName() }}</span>
          </div>
        </div>
      </div>

      <!-- ── Right: JSON Viewer ── -->
      <div class="col-span-12 lg:col-span-8">
        <div class="editor-panel">

          <!-- Editor titlebar -->
          <div class="editor-bar">
            <div class="editor-dots">
              <span class="dot dot--red"></span>
              <span class="dot dot--amber"></span>
              <span class="dot dot--green"></span>
            </div>
            <div class="flex items-center gap-2">
              <lucide-icon [img]="Braces" class="w-3.5 h-3.5 text-indigo-300/60"></lucide-icon>
              <span class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">JSON Content Preview</span>
            </div>
            <button (click)="copyContent()" class="copy-btn" title="Copy JSON">
              <lucide-icon [img]="copied() ? Check : Copy" class="w-3.5 h-3.5"></lucide-icon>
              <span>{{ copied() ? 'Copied!' : 'Copy' }}</span>
            </button>
          </div>

          <!-- Line numbers + code -->
          <div class="editor-body custom-scrollbar">
            <div class="line-numbers" aria-hidden="true">
              <span *ngFor="let n of lineNumbers()">{{ n }}</span>
            </div>
            <pre class="editor-code">{{ jsonContent }}</pre>
          </div>

          <!-- Status bar -->
          <div class="editor-statusbar">
            <span class="flex items-center gap-1.5">
              <span class="status-dot"></span>
              JSON
            </span>
            <span>{{ lineNumbers().length }} lines</span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* ── Upload Zone ── */
    .upload-zone {
      background: white;
      border: 2px dashed rgba(163,174,208,0.35);
      border-radius: 24px;
      padding: 2.5rem 2rem;
      transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(112,144,176,0.06);
    }
    .upload-zone:hover {
      border-color: rgba(67,24,255,0.35);
      background: #FAFBFF;
      box-shadow: 0 8px 30px rgba(67,24,255,0.06);
    }
    .upload-zone--dragging {
      border-color: #4318FF;
      background: rgba(67,24,255,0.03);
      box-shadow: 0 0 0 4px rgba(67,24,255,0.08), 0 8px 30px rgba(67,24,255,0.1);
    }

    /* Icon stack */
    .upload-icon-wrap {
      position: relative; width: 64px; height: 64px;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.3s ease;
    }
    .upload-icon-wrap--active { transform: scale(1.1); }
    .upload-zone:hover .upload-icon-wrap { transform: scale(1.05); }

    .upload-icon-core {
      position: relative; z-index: 2;
      width: 48px; height: 48px; border-radius: 14px;
      background: #F0EEFF;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid rgba(67,24,255,0.15);
      box-shadow: 0 4px 12px rgba(67,24,255,0.12);
    }
    .upload-icon-ring {
      position: absolute; border-radius: 50%;
      border: 1.5px dashed rgba(67,24,255,0.15);
      animation: spinRing 16s linear infinite;
    }
    .ring-outer { inset: -10px; animation-duration: 16s; }
    .ring-inner { inset: -20px; animation-direction: reverse; animation-duration: 24s; }
    @keyframes spinRing { to { transform: rotate(360deg); } }

    .browse-btn {
      border: 1.5px solid rgba(67,24,255,0.25);
      color: #4318FF;
      background: transparent;
    }
    .browse-btn:hover {
      background: #4318FF;
      color: white;
      border-color: #4318FF;
      box-shadow: 0 4px 14px rgba(67,24,255,0.25);
      transform: translateY(-1px);
    }

    /* ── Editor panel ── */
    .editor-panel {
      background: #0D1117;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
      box-shadow: 0 20px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05);
      display: flex;
      flex-direction: column;
    }

    /* Titlebar */
    .editor-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .editor-dots { display: flex; align-items: center; gap: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot--red   { background: #FF5F57; }
    .dot--amber { background: #FFBD2E; }
    .dot--green { background: #28C840; }

    .copy-btn {
      display: flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 8px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.5);
      font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em;
      transition: all 0.2s;
    }
    .copy-btn:hover {
      background: rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.85);
      border-color: rgba(255,255,255,0.15);
    }

    /* Code area */
    .editor-body {
      display: flex;
      height: 420px;
      overflow: auto;
      /* Subtle scan-line */
      background-image: repeating-linear-gradient(
        0deg, transparent, transparent 23px,
        rgba(255,255,255,0.012) 23px, rgba(255,255,255,0.012) 24px
      );
    }

    .line-numbers {
      display: flex; flex-direction: column;
      padding: 16px 0;
      min-width: 44px;
      background: rgba(255,255,255,0.02);
      border-right: 1px solid rgba(255,255,255,0.05);
      text-align: right;
      user-select: none;
      flex-shrink: 0;
    }
    .line-numbers span {
      font-family: 'Courier New', monospace;
      font-size: 11px; line-height: 1.75;
      color: rgba(255,255,255,0.18);
      padding: 0 10px;
    }

    .editor-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 12px; line-height: 1.75;
      color: #A9B1D6;
      padding: 16px 20px;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      flex: 1;
    }

    /* Status bar */
    .editor-statusbar {
      display: flex; align-items: center; gap: 16px;
      padding: 6px 16px;
      background: #4318FF;
      font-size: 10px; font-weight: 700;
      color: rgba(255,255,255,0.7);
      letter-spacing: 0.05em;
    }
    .status-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #28C840;
      display: inline-block;
    }

    /* Scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
  `]
})
export class ApiConfigComponent {
  @Input() jsonContent: string = '';
  @Output() contentChange = new EventEmitter<string>();

  readonly UploadCloud = UploadCloud;
  readonly FileJson = FileJson;
  readonly CheckCircle2 = CheckCircle2;
  readonly Copy = Copy;
  readonly Check = Check;
  readonly Braces = Braces;
  readonly FileCode = FileCode;

  isDragging = signal(false);
  copied = signal(false);
  loadedFileName = signal<string | null>(null);

  lineNumbers = (() => {
    // computed-like getter
    return () => {
      const count = (this.jsonContent || '').split('\n').length;
      return Array.from({ length: count }, (_, i) => i + 1);
    };
  })();

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) { this.readFile(file); }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) { this.readFile(file); }
  }

  copyContent(): void {
    if (!this.jsonContent) return;
    navigator.clipboard.writeText(this.jsonContent);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  private readFile(file: File): void {
    this.loadedFileName.set(file.name);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.contentChange.emit(e.target.result);
    };
    reader.readAsText(file);
  }
}