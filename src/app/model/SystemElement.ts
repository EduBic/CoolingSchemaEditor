import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { MultiRectEx } from './MultiRectEx';
import { ButterflyEx } from './ButterflyEx';
import { Utils } from './Utils';
import { Point } from './Point';
import { BigRectEx } from './BigRecEx';

export class SystemElement extends SchemaElement {

  system: SVG.G;

  constructor(origin: Point) {
    super(origin);
  }

  draw(host: SVG.G): void {

    this.system = host.group();

    const multiRect = new MultiRectEx(
      {x: 120, y: 100},
      3, 60, 60, 6
    );

    multiRect.draw(this.system);

    const but = new ButterflyEx(
      {x: 60, y: 160},
      30, 60
    );
    but.draw(this.system);

    const cond = new BigRectEx(
      {x: 80, y: 10},
      200, 60, 0.1, false
    );
    cond.draw(this.system);

    const evap = new BigRectEx(
      {x: 80, y: 400},
      200, 60, 0.1, true
    );
    evap.draw(this.system);

    Utils.drawDirectPolyline(multiRect.getAbsoluteOutCoordinates(0), cond.getInCoordinates(2), this.system);
    Utils.drawDirectPolyline(cond.getOutCoordinates(2), but.getInCoordinates(0), this.system);

    Utils.drawSingleElbowPolyline(but.getInOut(0), evap.getInOut(1), this.system);
    // Utils.drawSingleElbowPolyline(evap.getInOut(2), multiRect.getInOut(0), this.system);
    // Utils.drawDirectPolyline(multiRect.getAbsoluteOutCoordinates(0), but.getInCoordinates(0), this.system);
    // Utils.drawDirectPolyline(but.getOutCoordinates(0), multiRect.getAbsoluteInCoordinates(0), this.system);

  }
}
