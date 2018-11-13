import { Point } from './Point';

export class InOut {
  inCoordinate: Point;
  outCoordinate: Point;

  constructor(inX: number, inY: number, outX: number, outY: number) {
    this.inCoordinate = new Point(inX, inY);
    this.outCoordinate = new Point(outX, outY);
  }

  // constructor(_in: Point, _out: Point) {
  //   this.inCoordinate = _in;
  //   this.outCoordinate = _out;
  // }
}
