import { Point } from '../core/Point';

export abstract class SubsystemBuilder {

  public static getOrigin(groupOrigin: Point, elemOrigin: Point): Point {
    return new Point(groupOrigin.x + elemOrigin.x, groupOrigin.y + elemOrigin.y);
  }

}
