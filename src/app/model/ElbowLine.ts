import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPoint } from './HookPoint';
import { LineDrawer } from './LineDrawer';

export class ElbowLine {

  private points: Point[] = [];

  constructor(start: HookPoint, end: HookPoint) {
    // super(new Point(0,0), start, end);
    this.points = LineDrawer.createLinePoints(start, end);
  }

  draw(host: SVG.G): void {
    throw new Error('Method not implemented.');
  }

}
