import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPair } from './HookPair';
import { Direction } from './Direction';
import { HookPoint } from './HookPoint';
import { GraphicElement } from './GraphicElement';

/**
 * Base class that represent the basic Graphic element drawed inside an SVG.
 */
export abstract class GraphicSingle extends GraphicElement {
  private hookPairs: HookPair[];
  private direction: Direction;

  protected svgElement: SVG.Shape;

  constructor(origin: Point, direction: Direction, ...inOuts: HookPair[]) {
    super(origin);
    this.direction = direction;
    this.hookPairs = inOuts;
  }


  public drawInOutPoint(host: SVG.G) {
    this.hookPairs.forEach(inOut => {
      inOut.drawOutputPoint(host);
      inOut.drawInputPoint(host);
    });
  }

  public removePoints() {
    this.hookPairs.forEach(inOut => {
      inOut.removePoints();
    });
  }

  public getHook(index: number = 0): HookPair {
    return this.hookPairs[index];
  }

  public getInHook(index?: number): HookPoint {
    if (index) {
      return this.hookPairs[index].getInHook();
    }
    return this.hookPairs[0].getInHook();
  }

  public getOutHook(index?: number): HookPoint {
    if (index) {
      return this.hookPairs[index].getOutHook();
    }
    return this.hookPairs[0].getOutHook();
  }

  protected getDirection(): Direction {
    return this.direction;
  }

  protected isVertical(): boolean {
    return this.direction === Direction.TopToBottom || this.direction === Direction.BottomToTop;
  }

}
