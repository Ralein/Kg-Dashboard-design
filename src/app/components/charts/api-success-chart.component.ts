import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-api-success-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`,
    styles: [`:host { display: block; width: 100%; height: 100%; }`]
})
export class ApiSuccessChartComponent extends BaseChartComponent {
    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const cx = W / 2, cy = H / 2, r = 80, trackW = 14;
        const startAngle = Math.PI * 0.75, fullSweep = Math.PI * 1.5;
        const targetPct = 0.942, failPct = 1 - targetPct;
        const ticks = [0, 0.25, 0.5, 0.75, 1];

        const sp = p * targetPct;

        // Glow ring
        const glowGrad = ctx.createRadialGradient(cx, cy, r - 20, cx, cy, r + 20);
        glowGrad.addColorStop(0, 'rgba(66,205,126,0.0)');
        glowGrad.addColorStop(0.5, 'rgba(66,205,126,0.06)');
        glowGrad.addColorStop(1, 'rgba(66,205,126,0.0)');
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = glowGrad; ctx.lineWidth = 30; ctx.stroke();

        // Track
        ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, startAngle + fullSweep);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

        // Failure arc
        const failEnd = startAngle + fullSweep;
        ctx.beginPath(); ctx.arc(cx, cy, r, failEnd - failPct * fullSweep, failEnd);
        ctx.strokeStyle = 'rgba(238,93,80,0.55)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

        // Success arc + glow
        const successEnd = startAngle + sp * fullSweep;
        const ag = ctx.createLinearGradient(
            cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle),
            cx + r * Math.cos(successEnd), cy + r * Math.sin(successEnd)
        );
        ag.addColorStop(0, '#4318FF'); ag.addColorStop(0.5, '#42CD7E'); ag.addColorStop(1, '#00F5A0');
        ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, successEnd);
        ctx.strokeStyle = ag; ctx.lineWidth = trackW; ctx.lineCap = 'round';
        ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 18; ctx.stroke(); ctx.shadowBlur = 0;

        // Tip dot
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(successEnd), cy + r * Math.sin(successEnd), 6, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 16;
        ctx.fill(); ctx.shadowBlur = 0;

        // Tick marks
        ticks.forEach(t => {
            const a = startAngle + t * fullSweep;
            ctx.beginPath();
            ctx.moveTo(cx + (r - trackW / 2 - 6) * Math.cos(a), cy + (r - trackW / 2 - 6) * Math.sin(a));
            ctx.lineTo(cx + (r + trackW / 2 + 6) * Math.cos(a), cy + (r + trackW / 2 + 6) * Math.sin(a));
            ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.lineCap = 'butt'; ctx.stroke();
        });

        // Center text
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `800 36px "DM Sans", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText((Math.round(sp * 942) / 10).toFixed(1) + '%', cx, cy - 8);
        ctx.font = `500 11px "DM Sans", sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('SUCCESS RATE', cx, cy + 16);

        // Bottom legend — Success
        const legendY = cy + r + 28;
        const dotR = 5;

        // Success dot
        ctx.beginPath(); ctx.arc(cx - 52, legendY, dotR, 0, Math.PI * 2);
        ctx.fillStyle = '#42CD7E'; ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 8;
        ctx.fill(); ctx.shadowBlur = 0;

        // Success label
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.font = `500 10px "DM Sans", sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText('Success', cx - 44, legendY);

        // Success value
        ctx.font = `700 10px "DM Sans", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText((targetPct * 100).toFixed(1) + '%', cx - 44, legendY + 13);

        // Failure dot
        ctx.beginPath(); ctx.arc(cx + 18, legendY, dotR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(238,93,80,0.9)'; ctx.shadowColor = '#EE5D50'; ctx.shadowBlur = 8;
        ctx.fill(); ctx.shadowBlur = 0;

        // Failure label
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.font = `500 10px "DM Sans", sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText('Failure', cx + 26, legendY);

        // Failure value
        ctx.font = `700 10px "DM Sans", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText((failPct * 100).toFixed(1) + '%', cx + 26, legendY + 13);
    }
}