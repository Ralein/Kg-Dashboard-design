import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-api-success-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`
})
export class ApiSuccessChartComponent extends BaseChartComponent {
    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.38, trackW = 14;
        const startAngle = Math.PI * 0.75, fullSweep = Math.PI * 1.5;
        const targetPct = 0.942, failPct = 1 - targetPct;

        const sp = p * targetPct;

        // Background track
        ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, startAngle + fullSweep);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

        // Failure segment
        const failEnd = startAngle + fullSweep;
        ctx.beginPath(); ctx.arc(cx, cy, r, failEnd - failPct * fullSweep, failEnd);
        ctx.strokeStyle = 'rgba(238,93,80,0.55)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

        // Success segment
        const successEnd = startAngle + sp * fullSweep;
        const ag = ctx.createLinearGradient(cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle), cx + r * Math.cos(successEnd), cy + r * Math.sin(successEnd));
        ag.addColorStop(0, '#4318FF'); ag.addColorStop(0.5, '#42CD7E'); ag.addColorStop(1, '#00F5A0');

        ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, successEnd);
        ctx.strokeStyle = ag; ctx.lineWidth = trackW; ctx.lineCap = 'round';
        ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 18; ctx.stroke(); ctx.shadowBlur = 0;

        // Head dot
        ctx.beginPath(); ctx.arc(cx + r * Math.cos(successEnd), cy + r * Math.sin(successEnd), 6, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 16; ctx.fill(); ctx.shadowBlur = 0;

        // Center text
        const tg = ctx.createLinearGradient(cx - 40, cy - 20, cx + 40, cy + 20);
        tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, '#42CD7E');
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `800 ${Math.round(r * 0.45)}px "DM Sans",sans-serif`; ctx.fillStyle = tg;
        ctx.fillText((Math.round(sp * 942) / 10).toFixed(1) + '%', cx, cy - 8);
        ctx.font = `500 ${Math.round(r * 0.14)}px "DM Sans",sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fillText('SUCCESS RATE', cx, cy + 16);
    }
}
