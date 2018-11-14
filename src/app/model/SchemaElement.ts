import * as SVG from 'svg.js';
import { Point } from './Point';
import { InOut } from './InOut';
import { HookPosition } from './HookPosition';
import { HookPoint } from './HookPoint';


/**
 * Base class that represent the basic Graphic element drawed inside an SVG.
 */
export abstract class SchemaElement {
  protected readonly origin: Point;
  protected readonly inOutList: InOut[] = [];

  constructor(origin: Point, ...inOut: InOut[]) {
    this.origin = origin;
    this.inOutList = inOut;
  }

  abstract draw(host: SVG.G): void;

  public getInCoordinates(index: number = 0): Point {
    return this.inOutList[index].getInCoordinate();
  }

  public getOutCoordinates(index: number = 0): Point {
    // console.log('From getOutCoordinate', this.inOutList);
    return this.inOutList[index].getOutCoordinate();
  }

  public drawInputPoint(host: SVG.G) {
    this.inOutList.forEach(inOut => {
      inOut.drawInputPoint(host);
    });
  }

  public drawOutputPoint(host: SVG.G) {
    this.inOutList.forEach(inOut => {
      inOut.drawOutputPoint(host);
    });
  }

  public removePoints() {
    this.inOutList.forEach(inOut => {
      inOut.removePoints();
    });
  }

  public getInHook(index: number = 0): HookPoint {
    return this.inOutList[index].getInHook();
  }

  public getOutHook(index: number = 0): HookPoint {
    return this.inOutList[index].getOutHook();
  }
}
