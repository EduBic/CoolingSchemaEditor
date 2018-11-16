import { Point } from './Point';
import { HookPosition } from './HookPosition';

export class LinkHook {

  readonly coord: Point;

  readonly posFromInt: HookPosition; // connect to children
  readonly posFromExt: HookPosition;  // connect to external element


  constructor(coord: Point, posFromInt: HookPosition, posFromExt: HookPosition) {
    this.coord = coord;
    this.posFromInt = posFromInt;
    this.posFromExt = posFromExt;
  }
}
