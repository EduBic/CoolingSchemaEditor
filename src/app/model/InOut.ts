import * as SVG from 'svg.js';
import { Point } from './Point';

export enum HangPosition {
  Top = 'Top',
  Right = 'Right',
  Bottom = 'Bottom',
  Left = 'Left'
}

export class InOut {
  private static IN_OUT_SIZE = 6;

  readonly inCoordinate: Point;
  readonly inPosition: HangPosition;

  readonly outCoordinate: Point;
  readonly outPosition: HangPosition;

  inElem: SVG.Element;
  outElem: SVG.Element;

  constructor(inX: number, inY: number, outX: number, outY: number,
    inPos: HangPosition, outPos: HangPosition) {
    this.inCoordinate = new Point(inX, inY);
    this.inPosition = inPos;
    this.outCoordinate = new Point(outX, outY);
    this.outPosition = outPos;
  }

  public static createAutoTopInBottomOut(totWidth: number, totHeight: number,
      inPos: HangPosition, outPos: HangPosition,
      originX = 0, originY = 0): InOut {
      if (inPos === HangPosition.Top && outPos === HangPosition.Bottom) {
        return new InOut(
          totWidth / 2 + originX, originY,
          totWidth / 2 + originX, totHeight + originY,
          inPos, outPos
        );
      } else if (inPos === HangPosition.Bottom && outPos === HangPosition.Top) {
        return new InOut(
          totWidth / 2 + originX, totHeight + originY,  // input
          totWidth / 2 + originX, originY,              // output
          inPos, outPos
        );
      } else {
        console.log('Error: cannot create InOut automatically', inPos, outPos);
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

}
