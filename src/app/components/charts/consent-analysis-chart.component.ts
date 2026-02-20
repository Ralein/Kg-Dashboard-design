import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-consent-analysis-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`,
    styles: [`:host { display: block; width: 100%; height: 100%; }`]
})
export class ConsentAnalysisChartComponent extends BaseChartComponent {
    @Input() data: any[] = [];

    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const cx = W * 0.38, cy = H / 2; // Shifted center to the left
        const maxR = Math.min(W * 0.45, H * 0.44); // Slightly smaller R to fit side layout
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
            ctx.strokeStyle = 'rgba(163, 174, 208, 0.1)';
            ctx.lineWidth = track;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Outer glow
            ctx.beginPath();
            ctx.arc(cx, cy, r, start, start + pct);
            ctx.strokeStyle = seg.color;
            ctx.lineWidth = track + 2;
            ctx.globalAlpha = 0.1;
            ctx.stroke();
            ctx.globalAlpha = 1;

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
            ctx.stroke();

            // Tip dot
            const endA = start + pct;
            ctx.beginPath();
            ctx.arc(cx + r * Math.cos(endA), cy + r * Math.sin(endA), track * 0.55, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = 'rgba(0,0,0,0.1)'; ctx.shadowBlur = 4;
            ctx.fill(); ctx.shadowBlur = 0;

            // Labels (final frame only) - Now all on the right
            if (p === 1) {
                const rx = W * 0.68; // Labels start further right
                const ry = H * 0.15 + i * (H * 0.75 / data.length); // Vertically spaced list

                // Indicator dot for the legend effect
                ctx.beginPath();
                ctx.arc(rx - 12, ry, 4, 0, Math.PI * 2);
                ctx.fillStyle = seg.color;
                ctx.fill();

                ctx.fillStyle = seg.color;
                ctx.font = '700 13px "DM Sans",sans-serif';
                ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                ctx.fillText(`${Math.round((seg.value / seg.total) * 100)}%`, rx, ry);

                ctx.fillStyle = '#2B3674';
                ctx.font = '600 11px "DM Sans",sans-serif';
                ctx.fillText(seg.label, rx + 44, ry);

                ctx.fillStyle = '#A3AED0';
                ctx.font = '500 11px "DM Sans",sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(String(seg.value), W - 16, ry);
            }
        });

        // Center total - Shifting with cx
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `800 ${Math.round(minR * 1.1)}px "DM Sans",sans-serif`;
        const tg = ctx.createLinearGradient(cx - 30, cy - 20, cx + 30, cy + 20);
        tg.addColorStop(0, '#2B3674'); tg.addColorStop(1, '#4318FF');
        ctx.fillStyle = tg;
        ctx.fillText('700', cx, cy - 10);

        ctx.font = `500 12px "DM Sans",sans-serif`;
        ctx.fillStyle = '#A3AED0';
        ctx.fillText('total', cx, cy + 18);
    }
}
