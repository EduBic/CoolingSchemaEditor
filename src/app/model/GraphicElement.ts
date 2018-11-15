import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPoint } from './HookPoint';

export abstract class GraphicElement {
  protected readonly origin: Point;

  constructor(origin: Point) {
    this.origin = origin;
  }

  public abstract draw(host: SVG.G): void;

  public abstract getInHook(): HookPoint;

  public abstract getOutHook(): HookPoint;

}
