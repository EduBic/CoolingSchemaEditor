import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { HookPosition } from '../core/HookPosition';
import { Direction, UtilDirection } from './Direction';
import { HookPoint } from '../core/HookPoint';


export class Gate {

  private static readonly IN_OUT_SIZE = 6;

  // true if input into element, false if output from element
  private entry;

  private coord: Point;
  private extPos: HookPosition;

  // Graphic
  private svgElem: SVG.Shape;

  constructor(coord: Point, pos: HookPosition, isEntry: boolean) {
    this.coord = coord;
    this.extPos = pos;
    this.entry = isEntry;
  }

  public static createSimple(totWidth: number, totHeight: number, direction: Direction): Gate[] {
    const positions: HookPosition[] = UtilDirection.getPosition(direction);
    let entryCoord: Point;
    let exitCoord: Point;

    switch (direction) {
      case Direction.TopToBottom:
        entryCoord = new Point(totWidth / 2, 0);
        exitCoord = new Point(totWidth / 2, totHeight);
        break;

      case Direction.BottomToTop:
        entryCoord = new Point(totWidth / 2, totHeight);
        exitCoord = new Point(totWidth / 2, 0);
        break;

      case Direction.LeftToRight:
        entryCoord = new Point(0, totHeight / 2);
        exitCoord = new Point(totWidth, totHeight / 2);
        break;

      case Direction.RightToLeft:
        entryCoord = new Point(totWidth, totHeight / 2);
        exitCoord = new Point(0, totHeight / 2);
        break;
    }

    return [
      new Gate(entryCoord, positions[0], true),
      new Gate(exitCoord, positions[1], false)
    ];
  }

  public draw(host: SVG.G): SVG.Shape {
    if (this.isEntry()) {
      this.svgElem = host.rect(Gate.IN_OUT_SIZE, Gate.IN_OUT_SIZE)
        .move(this.coord.x - Gate.IN_OUT_SIZE / 2,
              this.coord.y - Gate.IN_OUT_SIZE / 2)
        .addClass('inputPoint');
    } else {  // exit Gate
      this.svgElem = host.circle(Gate.IN_OUT_SIZE)
        .move(this.coord.x - Gate.IN_OUT_SIZE / 2,
              this.coord.y - Gate.IN_OUT_SIZE / 2)
        .addClass('outputPoint');
    }

    return this.svgElem;
  }

  public remove(): SVG.Shape {
    if (this.svgElem) {
      this.svgElem.remove();
    }
    return this.svgElem;
  }


  public isEntry(): boolean {
    return this.entry;
  }

  public isExit(): boolean {
    return !this.entry;
  }

  public toInternalHook(): HookPoint {
    return new HookPoint(this.coord, UtilDirection.getOppositePosition(this.extPos));
  }

  public toExternalHook(): HookPoint {
    return new HookPoint(this.coord, this.extPos);
  }

  public getAbsoluteGate(origin: Point): Gate {
    return new Gate(new Point(origin.x + this.coord.x, origin.y + this.coord.y), this.extPos, this.entry);
  }

}
