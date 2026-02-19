import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-consent-analysis-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`
})
export class ConsentAnalysisChartComponent extends BaseChartComponent {
    @Input() data: any[] = [];

    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const cx = W / 2, cy = H / 2;
        const maxR = Math.min(W, H) * 0.44;
        const minR = maxR * 0.28;
        const data = this.data;
        const step = (maxR - minR) / data.length;
        const start = -Math.PI / 2;

        data.forEach((seg, i) => {
            const r = maxR - i * step;
            const track = step * 0.52;
            const pct = (seg.value / seg.total) * Math.PI * 2 * p;

            // Track ring
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = track;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Outer glow
            ctx.beginPath();
            ctx.arc(cx, cy, r, start, start + pct);
            ctx.strokeStyle = seg.color;
            ctx.lineWidth = track + 4;
            ctx.globalAlpha = 0.18;
            ctx.shadowColor = seg.color;
            ctx.shadowBlur = 18;
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            // Main arc
            const grad = ctx.createLinearGradient(
                cx + r * Math.cos(start), cy + r * Math.sin(start),
                cx + r * Math.cos(start + pct), cy + r * Math.sin(start + pct)
            );
            grad.addColorStop(0, this.lighten(seg.color, 0.3));
            grad.addColorStop(1, seg.color);
            ctx.beginPath();
            ctx.arc(cx, cy, r, start, start + pct);
            ctx.strokeStyle = grad;
            ctx.lineWidth = track;
            ctx.lineCap = 'round';
            ctx.shadowColor = seg.color;
            ctx.shadowBlur = 14;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Tip dot
            const endA = start + pct;
            ctx.beginPath();
            ctx.arc(cx + r * Math.cos(endA), cy + r * Math.sin(endA), track * 0.55, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = seg.color; ctx.shadowBlur = 12;
            ctx.fill(); ctx.shadowBlur = 0;

            // Labels (final frame only)
            if (p === 1) {
                const ry = cy - maxR + i * (maxR * 1.9 / data.length) + step * 0.3;
                const rx = cx + maxR + 14;

                ctx.fillStyle = seg.color;
                ctx.font = '700 10px "DM Sans",sans-serif';
                ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                ctx.shadowColor = seg.color; ctx.shadowBlur = 8;
                ctx.fillText(`${Math.round((seg.value / seg.total) * 100)}%`, rx, ry);
                ctx.shadowBlur = 0;
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.font = '500 9px "DM Sans",sans-serif';
                ctx.fillText(seg.label, rx, ry + 12);
                ctx.fillStyle = 'rgba(255,255,255,0.25)';
                ctx.fillText(String(seg.value), rx + 44, ry);
            }
        });

        // Center total
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `800 ${Math.round(minR * 0.9)}px "DM Sans",sans-serif`;
        const tg = ctx.createLinearGradient(cx - 30, cy - 20, cx + 30, cy + 20);
        tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, '#7C5CFF');
        ctx.fillStyle = tg; ctx.shadowColor = '#7C5CFF'; ctx.shadowBlur = 20;
        ctx.fillText('700', cx, cy - 8);
        ctx.shadowBlur = 0;
        ctx.font = `500 10px "DM Sans",sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fillText('total', cx, cy + 14);
    }
}
