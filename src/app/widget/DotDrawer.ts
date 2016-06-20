import {Color} from '../Color'

export class DotDrawer {
  static simple(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }


  static wind(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, windBearing: number) {
    //DotDrawer.simple(ctx, x, y, r, color);  //TODO just testing, remove me.

    let pointAngleDeg = (windBearing + 180) % 360;
    let pointAngle = pointAngleDeg * Math.PI / 180;
    let tailAngle = 60;
    let tailPercent = .6;
    let secondAngle = ((pointAngleDeg + 90 + tailAngle) * Math.PI / 180) % (2 * Math.PI);
    let thirdAngle = ((pointAngleDeg + 270 - tailAngle) * Math.PI / 180) % (2 * Math.PI);
    let points = [
      { x: x + r * Math.sin(pointAngle), y: y - r * Math.cos(pointAngle) },
      { x: x + r * Math.sin(secondAngle), y: y - r * Math.cos(secondAngle) },
      { x: x + (r * tailPercent) * Math.sin(windBearing * Math.PI / 180), y: y - (r * tailPercent) * Math.cos(windBearing * Math.PI / 180) },
      { x: x + r * Math.sin(thirdAngle), y: y - r * Math.cos(thirdAngle) }
    ];

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(points[0].x, points[0].y);
    for (let p of points) {
      ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
  }

  static moon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, moonPhase: number) {
    var epsilon = .001;
    //Draw 'dark' portion of moon
    ctx.beginPath();
    ctx.fillStyle = '#333';  //TODO make configurable
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();

    //Draw 'light' portion of moon
    ctx.beginPath();
    ctx.fillStyle = color;

    if (moonPhase < .25) {
      var mP = r * (.25 - moonPhase) * 4;
      var eR = Math.pow(r * 2, 2) / (8 * mP) + (mP / 2);
      var eX = x + 1 * (eR - mP);
      var angle = Math.atan(r / (eR - mP));
      ctx.arc(eX, y, eR, angle + Math.PI, -angle + Math.PI, true);
      ctx.arc(x, y, r, Math.PI / 2, -Math.PI / 2, false);
    } else if (moonPhase <= .5) {
      var mP = r * (moonPhase - .25) * 4;
      var eR = Math.pow(r * 2, 2) / (8 * mP) + (mP / 2);
      var eX = x + -1 * (eR - mP);
      var angle = Math.atan(r / (eR - mP));
      if (mP > epsilon) {
        ctx.arc(eX, y, eR, angle, -angle, true);
      }
      ctx.arc(x, y, r, Math.PI / 2, -Math.PI / 2, false);
    } else if (moonPhase <= .75) {
      var mP = r * (.75 - moonPhase) * 4;
      var eR = Math.pow(r * 2, 2) / (8 * mP) + (mP / 2);
      var eX = x + 1 * (eR - mP);
      var angle = Math.atan(r / (eR - mP));
      ctx.arc(eX, y, eR, angle + Math.PI, -angle + Math.PI, true);
      ctx.arc(x, y, r, Math.PI / 2, -Math.PI / 2, true);
    } else {
      var mP = r * (moonPhase - .75) * 4;
      var eR = Math.pow(r * 2, 2) / (8 * mP) + (mP / 2);
      var eX = x + -1 * (eR - mP);
      var angle = Math.atan(r / (eR - mP));
      if (mP > epsilon) {
        ctx.arc(eX, y, eR, angle, -angle, true);
      }
      ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2, false);
    }

    ctx.closePath();
    ctx.fill();
  }
}
