import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPosition } from './HookPosition';
import { HookPoint } from './HookPoint';

export enum Direction {
  TopToBottom = 'TopToBottom',
  BottomToTop = 'BottomToTop',
  LeftToRight = 'LeftToRight',
  RightToLeft = 'RightToLeft'
}

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

  public static createSimpleInOut(totWidth: number, totHeight: number,
      direction: Direction, origin: Point): InOut {

      if (direction === Direction.TopToBottom) {
        return new InOut(
          totWidth / 2 + origin.x, origin.y,
          totWidth / 2 + origin.x, totHeight + origin.y,
          HookPosition.Top, HookPosition.Bottom
        );
      } else if (direction === Direction.BottomToTop) {
        return new InOut(
          totWidth / 2 + origin.x, totHeight + origin.y,  // input
          totWidth / 2 + origin.x, origin.y,              // output
          HookPosition.Bottom, HookPosition.Top
        );
      } else if (direction === Direction.LeftToRight) {
        return new InOut(
          origin.x, origin.y + totHeight / 2,
          origin.x + totWidth, origin.y + totHeight / 2,
          HookPosition.Left, HookPosition.Right
        );
      } else if (direction === Direction.RightToLeft) {
        return new InOut(
          origin.x + totWidth, origin.y + totHeight / 2,    // input
          origin.x, origin.y + totHeight / 2,               // output
          HookPosition.Right, HookPosition.Left
        );
      }
  }

  /**
   * Method for building InOut pair for GraphicGroup elements
   */
  public static createInFromBottomOutFromTop(totWidth: number, totHeight: number, origin: Point) {
    return new InOut(
      totWidth / 2 + origin.x, origin.y,
      totWidth / 2 + origin.x, totHeight + origin.y,
      HookPosition.Bottom, HookPosition.Top
    );
  }

  public static createAutoBottomInTopOut(totWidth: number, totHeight: number, origin: Point) {
    return new InOut(
      totWidth / 2 + origin.x, totHeight + origin.y,
      totWidth / 2 + origin.x, origin.y,
      HookPosition.Bottom, HookPosition.Top
    );
  }

  public static createFromHooks(start: HookPoint, end: HookPoint): InOut {
    return new InOut(
      start.coord.x, start.coord.y,
      end.coord.x, end.coord.y,
      start.position, end.position
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
