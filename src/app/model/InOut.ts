import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPosition } from './HookPosition';
import { HookPoint } from './HookPoint';

export class InOut {
  private static readonly IN_OUT_SIZE = 6;

  private readonly inHook: HookPoint;
  private readonly outHook: HookPoint;

  // GraphicComponent
  inElem: SVG.Element;
  outElem: SVG.Element;

  constructor(inX: number, inY: number, outX: number, outY: number,
    inPos: HookPosition, outPos: HookPosition) {

    this.outHook = new HookPoint(new Point(outX, outY), outPos);
    this.inHook = new HookPoint(new Point(inX, inY), inPos);
  }

  public static createAutoTopInBottomOut(totWidth: number, totHeight: number,
      inPos: HookPosition, outPos: HookPosition,
      originX: number, originY: number): InOut {

      if (inPos === HookPosition.Top && outPos === HookPosition.Bottom) {
        return new InOut(
          totWidth / 2 + originX, originY,
          totWidth / 2 + originX, totHeight + originY,
          inPos, outPos
        );
      } else if (inPos === HookPosition.Bottom && outPos === HookPosition.Top) {
        return new InOut(
          totWidth / 2 + originX, totHeight + originY,  // input
          totWidth / 2 + originX, originY,              // output
          inPos, outPos
        );
      } else {
        console.log('Error: cannot create InOut automatically', inPos, outPos);
      }
  }

  public static createAutoTopInBottomOut2(totWidth: number, totHeight: number, origin: Point) {
    return new InOut(
      totWidth / 2 + origin.x, origin.y,
      totWidth / 2 + origin.x, totHeight + origin.y,
      HookPosition.Top, HookPosition.Bottom
    );
  }

  public drawInputPoint(host: SVG.G, relativeOrigin: Point = new Point(0, 0)) {
    this.inElem = host.rect(InOut.IN_OUT_SIZE, InOut.IN_OUT_SIZE)
        .move(this.getInCoordinate().x - relativeOrigin.x - InOut.IN_OUT_SIZE / 2,
              this.getInCoordinate().y - relativeOrigin.y - InOut.IN_OUT_SIZE / 2)
        .addClass('inputPoint');
  }

  public drawOutputPoint(host: SVG.G, relativeOrigin: Point = new Point(0, 0)) {
    this.outElem = host.circle(InOut.IN_OUT_SIZE)
      .move(this.getOutCoordinate().x - relativeOrigin.x - InOut.IN_OUT_SIZE / 2,
            this.getOutCoordinate().y - relativeOrigin.y - InOut.IN_OUT_SIZE / 2)
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

  public getInCoordinate(): Point {
    return this.inHook.coord;
  }

  public getInPosition(): HookPosition {
    return this.inHook.position;
  }

  public getOutCoordinate(): Point {
    return this.outHook.coord;
  }

  public getOutPosition(): HookPosition {
    return this.outHook.position;
  }

  getInHook(): HookPoint {
    return this.inHook;
  }

  getOutHook(): HookPoint {
    return this.outHook;
  }

}
