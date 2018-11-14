import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { MultiRectEx } from './MultiRectEx';
import { ButterflyEx } from './ButterflyEx';
import { Utils } from './Utils';
import { Point } from './Point';
import { BigRectEx } from './BigRecEx';
import { LineDrawer } from './LineDrawer';

export class SystemElement extends SchemaElement {

  system: SVG.G;

  constructor(origin: Point) {
    super(origin);
  }

  draw(host: SVG.G): void {

    this.system = host.group();

    const multiRect = new MultiRectEx(
      new Point(120, 100),
      3, 60, 60, 6
    );

    multiRect.draw(this.system);

    const but = new ButterflyEx(
      new Point(60, 160),
      30, 60
    );
    but.draw(this.system);

    const cond = new BigRectEx(
      new Point(80, 10),
      200, 60, 0.1, false
    );
    cond.draw(this.system);

    const evap = new BigRectEx(
      new Point(80, 400),
      200, 60, 0.1, true
    );
    evap.draw(this.system);

    console.log(cond);


    LineDrawer.drawLine(multiRect.getOutCoordinates(0), multiRect.getOutHangPosition(0),
                        cond.getInCoordinates(2), cond.getInHangPosition(2), this.system);

    // LineDrawer.drawLine(cond.getOutCoordinates(2), cond.getOutHangPosition(2),
    //                     but.getInCoordinates(), but.getInHangPosition(), this.system);

    // LineDrawer.drawLine(but.getOutCoordinates(), but.getOutHangPosition(),
    //                     evap.getInCoordinates(2), evap.getInHangPosition(2), this.system);

    // LineDrawer.drawLine(evap.getOutCoordinates(1), evap.getOutHangPosition(1),
    //                       multiRect.getAbsoluteInCoordinates(), multiRect.getInHangPosition(), this.system);

    // LineDrawer.drawDirectPolyline(cond.getOutCoordinates(2), but.getInCoordinates(0), this.system);

    // LineDrawer.drawSingleElbowPolyline(but.getInOut(0), evap.getInOut(1), this.system);
    // Utils.drawSingleElbowPolyline(evap.getInOut(2), multiRect.getInOut(0), this.system);
    // Utils.drawDirectPolyline(multiRect.getAbsoluteOutCoordinates(0), but.getInCoordinates(0), this.system);
    // Utils.drawDirectPolyline(but.getOutCoordinates(0), multiRect.getAbsoluteInCoordinates(0), this.system);

  }
}
