import { CanvasRenderingContext2D, CanvasGradient } from 'canvas';

export function progressBar(
  ctx: CanvasRenderingContext2D,
  currentProgress: number,
  maxProgress: number,
  x: number,
  y: number,
  width: number,
  height: number,
  barFillColor: CanvasGradient | string,
  emptyFillColor: CanvasGradient | string
) {
  ctx.save();
  ctx.beginPath();
  if (!emptyFillColor) emptyFillColor = 'black';
  if (!barFillColor) barFillColor = 'white';
  let radius = height / 2;
  const halfradians = (2 * Math.PI) / 2;
  const quarterradians = (2 * Math.PI) / 4;
  ctx.arc(radius + x, radius + y, radius, -quarterradians, halfradians, true);
  ctx.lineTo(x, y + height - radius);
  ctx.arc(radius + x, height - radius + y, radius, halfradians, quarterradians, true);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arc(x + width - radius, y + height - radius, radius, quarterradians, 0, true);
  ctx.lineTo(x + width, y + radius);
  ctx.arc(x + width - radius, y + radius, radius, 0, -quarterradians, true);
  ctx.lineTo(x + radius, y);
  ctx.fillStyle = emptyFillColor;
  ctx.fill();
  ctx.closePath();
  ctx.clip();
  let calculateprogress = (currentProgress / maxProgress) * width + (x - width);
  let tst = calculateprogress;
  ctx.beginPath();
  ctx.arc(radius + tst, radius + y, radius, -quarterradians, halfradians, true);
  ctx.lineTo(tst, y + height - radius);
  ctx.arc(radius + tst, height - radius + y, radius, halfradians, quarterradians, true);
  ctx.lineTo(tst + width - radius, y + height);
  ctx.arc(tst + width - radius, y + height - radius, radius, quarterradians, 0, true);
  ctx.lineTo(tst + width, y + radius);
  ctx.arc(tst + width - radius, y + radius, radius, 0, -quarterradians, true);
  ctx.lineTo(tst + radius, y);
  ctx.fillStyle = barFillColor;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}
