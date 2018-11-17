import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPosition } from './HookPosition';
import { HookPoint } from './HookPoint';

export enum Direction {
  TopToBottom = 'TopToBottom',
  BottomToTop = 'BottomToTop',
  LeftToRight = 'LeftToRight',
  RightToLeft = 'RightToLeft',
  None = 'None'
}

export class HookPair {
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
      direction: Direction, origin: Point): HookPair {

      if (direction === Direction.TopToBottom) {
        return new HookPair(
          totWidth / 2 + origin.x, origin.y,
          totWidth / 2 + origin.x, totHeight + origin.y,
          HookPosition.Top, HookPosition.Bottom
        );
      } else if (direction === Direction.BottomToTop) {
        return new HookPair(
          totWidth / 2 + origin.x, totHeight + origin.y,  // input
          totWidth / 2 + origin.x, origin.y,              // output
          HookPosition.Bottom, HookPosition.Top
        );
      } else if (direction === Direction.LeftToRight) {
        return new HookPair(
          origin.x, origin.y + totHeight / 2,
          origin.x + totWidth, origin.y + totHeight / 2,
          HookPosition.Left, HookPosition.Right
        );
      } else if (direction === Direction.RightToLeft) {
        return new HookPair(
          origin.x + totWidth, origin.y + totHeight / 2,    // input
          origin.x, origin.y + totHeight / 2,               // output
          HookPosition.Right, HookPosition.Left
        );
      } else {
        console.log('No direction -> Empty HookPair');
        return new EmptyHookPair();
      }
  }

  /**
   * Method for building InOut pair for GraphicGroup elements
   */
  public static createInFromBottomOutFromTop(totWidth: number, totHeight: number, origin: Point) {
    return new HookPair(
      totWidth / 2 + origin.x, origin.y,
      totWidth / 2 + origin.x, totHeight + origin.y,
      HookPosition.Bottom, HookPosition.Top
    );
  }

  public static createAutoBottomInTopOut(totWidth: number, totHeight: number, origin: Point) {
    return new HookPair(
      totWidth / 2 + origin.x, totHeight + origin.y,
      totWidth / 2 + origin.x, origin.y,
      HookPosition.Bottom, HookPosition.Top
    );
  }

  public static createFromHooks(start: HookPoint, end: HookPoint): HookPair {
    return new HookPair(
      start.coord.x, start.coord.y,
      end.coord.x, end.coord.y,
      start.position, end.position
    );
  }

  public drawInputPoint(host: SVG.G, relativeOrigin: Point = new Point(0, 0)) {
    this.inElem = host.rect(HookPair.IN_OUT_SIZE, HookPair.IN_OUT_SIZE)
        .move(this.inHook.coord.x - relativeOrigin.x - HookPair.IN_OUT_SIZE / 2,
              this.inHook.coord.y - relativeOrigin.y - HookPair.IN_OUT_SIZE / 2)
        .addClass('inputPoint');
  }

  public drawOutputPoint(host: SVG.G, relativeOrigin: Point = new Point(0, 0)) {
    this.outElem = host.circle(HookPair.IN_OUT_SIZE)
      .move(this.outHook.coord.x - relativeOrigin.x - HookPair.IN_OUT_SIZE / 2,
            this.outHook.coord.y - relativeOrigin.y - HookPair.IN_OUT_SIZE / 2)
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

  public getInHook(): HookPoint {
    return this.inHook;
  }

  public getOutHook(): HookPoint {
    return this.outHook;
  }

}

class EmptyHookPair extends HookPair {

  private static readonly DEBUG = true;
  private static readonly EMPTY_HOOK_POINT = new Point(0, 0);

  constructor() {
    super(0, 0, 0, 0, HookPosition.Bottom, HookPosition.Bottom);
  }

  public drawInputPoint(host: SVG.G, relativeOrigin: Point = new Point(0, 0)) { }

  public drawOutputPoint(host: SVG.G, relativeOrigin: Point = new Point(0, 0)) { }

  public getInHook(): HookPoint {
    if (EmptyHookPair.DEBUG) { console.log('I\'m a fake HookPoint!'); }

    return new HookPoint(EmptyHookPair.EMPTY_HOOK_POINT, HookPosition.Bottom);
  }

  public getOutHook(): HookPoint {
    if (EmptyHookPair.DEBUG) { console.log('I\'m a fake HookPoint!'); }

    return new HookPoint(EmptyHookPair.EMPTY_HOOK_POINT, HookPosition.Bottom);
  }

}
