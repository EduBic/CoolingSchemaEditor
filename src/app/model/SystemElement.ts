import * as SVG from 'svg.js';
import {
  SchemaElement
} from './SchemaElement';
import {
  MultiRectEx
} from './MultiRectEx';
import {
  ButterflyEx
} from './ButterflyEx';
import {
  Utils
} from './Utils';
import {
  Point
} from './Point';
import {
  BigRectEx
} from './BigRecEx';
import {
  LineDrawer
} from './LineDrawer';
import { SchemaGroup } from './SchemaGroup';

export class SystemElement extends SchemaGroup {

  private system: SVG.G;

  // private children: SchemaElement[] = [];

  private condenser: BigRectEx;
  private compressors: MultiRectEx[] = [];
  private expansionValves: ButterflyEx[] = [];
  private evaporator: BigRectEx;

  constructor(origin: Point) {
    super(origin);

    this.compressors.push(
      new MultiRectEx(new Point(320, 100), 3, 60, 60, 6), // Right
      new MultiRectEx(new Point(120, 100), 3, 60, 60, 6)  // Left
    );

    this.expansionValves.push(
      new ButterflyEx(new Point(540, 160), 30, 60), // Right
      new ButterflyEx(new Point(60, 160), 30, 60)   // Left
    );

    this.condenser = new BigRectEx(
      new Point(80, 10),
      200, 60, 0.1, false
    );

    this.evaporator = new BigRectEx(
      new Point(80, 400),
      200, 60, 0.1, true
    );

    this.addChildren(this.compressors)
      .addChildren(this.expansionValves)
      .addChild(this.condenser)
      .addChild(this.evaporator);
  }

  draw(host: SVG.G): void {

    this.system = host.group();
    // console.log(cond);

    const circuits = Math.min(this.compressors.length, this.expansionValves.length);

    for (let i = 0; i < circuits; i++) {
      this.drawPolyline(
        LineDrawer.createLinePoints(this.compressors[i].getOutCoordinates(), this.compressors[i].getOutHangPosition(),
          this.condenser.getInCoordinates(i + 1), this.condenser.getInHangPosition(i + 1)));

      this.drawPolyline(
        LineDrawer.createLinePoints(this.condenser.getOutCoordinates(i + 1), this.condenser.getOutHangPosition(i + 1),
        this.expansionValves[i].getInCoordinates(), this.expansionValves[i].getInHangPosition()));

      this.drawPolyline(
        LineDrawer.createLinePoints(this.expansionValves[i].getOutCoordinates(), this.expansionValves[i].getOutHangPosition(),
          this.evaporator.getInCoordinates(i + 1), this.evaporator.getInHangPosition(i + 1)));

      this.drawPolyline(
        LineDrawer.createLinePoints(this.evaporator.getOutCoordinates(i + 1), this.evaporator.getOutHangPosition(i + 1),
          this.compressors[i].getInCoordinates(), this.compressors[i].getInHangPosition()));
    }

    this.drawChildren(this.system);
  }

  private drawPolyline(points: Point[]) {
    const nums: number[] = [];

    points.forEach(p => {
      nums.push(p.x);
      nums.push(p.y);
    });

    this.system.polyline(nums)
      .attr('fill', 'none')
      .attr('stroke', '#0077be');
  }
}
