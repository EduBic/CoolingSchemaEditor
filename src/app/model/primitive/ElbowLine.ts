import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { HookPoint } from '../core/HookPoint';
import { LineDrawer } from '../core/LineDrawer';
import { GraphicSingle } from '../core/GraphicSingle';
import { InOut } from '../core/InOut';

export class ConnectorLine extends GraphicSingle {

  private points: Point[] = [];

  constructor(start: HookPoint, end: HookPoint) {
    super(new Point(0, 0), InOut.createFromHooks(start, end));
    this.points = LineDrawer.createLinePoints(start, end);
  }

  draw(host: SVG.G): void {

    this.svgElement.on('mouseover', (e) => {
      this.drawInputPoint(host);
      this.drawOutputPoint(host);
    });

    this.svgElement.on('mouseleave', (e) => {
      this.removePoints();
    });
  }

}
