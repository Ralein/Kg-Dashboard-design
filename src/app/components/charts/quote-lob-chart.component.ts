import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-quote-lob-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`
})
export class QuoteLobChartComponent extends BaseChartComponent {
    @Input() data: any[] = [];
    private N = 0;

    protected draw(p: number) {
        this.N = this.data.length;
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const labelPad = 48;
        const cx = W / 2;
        const cy = H / 2;
        const maxR = Math.min(W, H) / 2 - labelPad;
        const levels = 4;
        const maxDataVal = 200;

        for (let l = 1; l <= levels; l++) {
            const r = (l / levels) * maxR;
            ctx.beginPath();
            for (let i = 0; i < this.N; i++) {
                const [x, y] = this.ptAt(cx, cy, r, i);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = l === levels ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            ctx.setLineDash(l === levels ? [] : [3, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            const [lx, ly] = this.ptAt(cx, cy, r, 0);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.font = '400 7px "DM Sans",sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
            ctx.fillText(String(Math.round((l / levels) * maxDataVal)), lx + 4, ly - 2);
        }

        for (let i = 0; i < this.N; i++) {
            const [x, y] = this.ptAt(cx, cy, maxR, i);
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 1; ctx.stroke();
        }

        ctx.beginPath();
        this.data.forEach((d, i) => {
            const r = (d.value / maxDataVal) * maxR * p;
            const [x, y] = this.ptAt(cx, cy, r, i);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();

        const fillGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        fillGrad.addColorStop(0, 'rgba(124,92,255,0.6)');
        fillGrad.addColorStop(0.55, 'rgba(5,205,153,0.3)');
        fillGrad.addColorStop(1, 'rgba(106,210,255,0.08)');
        ctx.fillStyle = fillGrad;
        ctx.shadowColor = '#7C5CFF'; ctx.shadowBlur = 30;
        ctx.fill(); ctx.shadowBlur = 0;

        ctx.beginPath();
        this.data.forEach((d, i) => {
            const r = (d.value / maxDataVal) * maxR * p;
            const [x, y] = this.ptAt(cx, cy, r, i);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = 'rgba(124,92,255,0.9)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#7C5CFF'; ctx.shadowBlur = 16;
        ctx.stroke(); ctx.shadowBlur = 0;

        this.data.forEach((d, i) => {
            const r = (d.value / maxDataVal) * maxR * p;
            const [x, y] = this.ptAt(cx, cy, r, i);
            ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = d.color; ctx.globalAlpha = 0.18; ctx.fill(); ctx.globalAlpha = 1;
            ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = d.color; ctx.shadowColor = d.color; ctx.shadowBlur = 14;
            ctx.fill(); ctx.shadowBlur = 0;
            ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; ctx.fill();
        });

        const labelR = maxR + 20;
        this.data.forEach((d, i) => {
            const [lx, ly] = this.ptAt(cx, cy, labelR, i);
            const angle = this.axisAngle(i);
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);

            ctx.textAlign = cosA > 0.1 ? 'left' : cosA < -0.1 ? 'right' : 'center';
            ctx.textBaseline = sinA < -0.1 ? 'bottom' : sinA > 0.1 ? 'top' : 'middle';

            ctx.fillStyle = d.color;
            ctx.font = '700 10px "DM Sans",sans-serif';
            ctx.shadowColor = d.color; ctx.shadowBlur = 8;
            ctx.fillText(d.label, lx, ly);
            ctx.shadowBlur = 0;

            const valueR = maxR + 33;
            const [vx, vy] = this.ptAt(cx, cy, valueR, i);
            ctx.textAlign = cosA > 0.1 ? 'left' : cosA < -0.1 ? 'right' : 'center';
            ctx.textBaseline = sinA < -0.1 ? 'bottom' : sinA > 0.1 ? 'top' : 'middle';
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.font = '500 9px "DM Sans",sans-serif';
            ctx.fillText(String(d.value), vx, vy);
        });
    }

    private axisAngle(i: number) { return (i / this.N) * Math.PI * 2 - Math.PI / 2; }
    private ptAt(cx: number, cy: number, r: number, i: number): [number, number] {
        const a = this.axisAngle(i);
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }
}
