import * as SVG from 'svg.js';
import { Point } from './Point';
import { InOut } from './InOut';
import { HookPoint } from './HookPoint';
import { GraphicElement } from './GraphicElement';


/**
 * Base class that represent the basic Graphic element drawed inside an SVG.
 */
export abstract class GraphicSingleElement extends GraphicElement {
  protected inOutList: InOut[];

  protected svgElement: SVG.Shape;

  constructor(origin: Point, ...inOuts: InOut[]) {
    super(origin);
    this.inOutList = inOuts;
  }

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

  public getHook(index: number = 0): InOut {
    return this.inOutList[index];
  }

  public getInHook(index: number = 0): HookPoint {
    return this.inOutList[index].getInHook();
  }

  public getOutHook(index: number = 0): HookPoint {
    return this.inOutList[index].getOutHook();
  }

}
