import * as SVG from 'svg.js';
import { Point } from './Point';

export class InOut {
  private static IN_OUT_SIZE = 6;

  inCoordinate: Point;
  outCoordinate: Point;

  inElem: SVG.Element;
  outElem: SVG.Element;

  constructor(inX: number, inY: number, outX: number, outY: number) {
    this.inCoordinate = new Point(inX, inY);
    this.outCoordinate = new Point(outX, outY);
  }

  // constructor(totWidth: number, totHeight: number, originX: number = 0, originY: number = 0) {
  //   this.inCoordinate = new Point(
  //     totWidth / 2 + originX, totHeight + originY
  //   );

  //   this.outCoordinate = new Point(
  //     totWidth / 2 + originX, originY
  //   );
  // }

  public static createAutoInOut(totWidth: number, totHeight: number,
      originX = 0, originY = 0, invert = false): InOut {
      if (invert) {
        return new InOut(
          totWidth / 2 + originX, originY,
          totWidth / 2 + originX, totHeight + originY,
        );
      } else {
        return new InOut(
          totWidth / 2 + originX, totHeight + originY,
          totWidth / 2 + originX, originY
        );
      }
  }

  public drawInputPoint(host: SVG.G) {
    this.inElem = host.rect(InOut.IN_OUT_SIZE, InOut.IN_OUT_SIZE)
        .move(this.inCoordinate.x - InOut.IN_OUT_SIZE / 2, this.inCoordinate.y - InOut.IN_OUT_SIZE / 2)
        .addClass('inputPoint');
  }

  public drawOutputPoint(host: SVG.G) {
    this.outElem = host.circle(InOut.IN_OUT_SIZE)
      .move(this.outCoordinate.x - InOut.IN_OUT_SIZE / 2, this.outCoordinate.y - InOut.IN_OUT_SIZE / 2)
      .addClass('outputPoint');
  }

  public removePoints() {
    if (this.inElem) {
      this.inElem.remove();
    }
    if (this.outElem) {
      this.outElem.remove();
    }
  }

  // constructor(_in: Point, _out: Point) {
  //   this.inCoordinate = _in;
  //   this.outCoordinate = _out;
  // }
}
