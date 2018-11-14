import { Point } from './Point';
import { HookPosition } from './HookPosition';

export class HookPoint {
  readonly coord: Point;
  readonly position: HookPosition;

  constructor(coord: Point, pos: HookPosition) {
    this.coord = coord;
    this.position = pos;
  }
}
