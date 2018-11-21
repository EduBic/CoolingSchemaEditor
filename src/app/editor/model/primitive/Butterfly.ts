import * as SVG from 'svg.js';
import { GraphicSingle } from '../core/GraphicSingle';
import { Point } from '../core/Point';
import { HookPair } from '../core/HookPair';
import { Direction } from "../core/Direction";

export class Butterfly extends GraphicSingle {
  private width: number;
  private height: number;

  private shape: SVG.Polygon;

  constructor(origin: Point, width: number, height: number, direction: Direction) {
    super(origin, direction, HookPair.createSimpleInOut(width, height, direction, origin));
    this.width = width;
    this.height = height;
  }

  draw(host: SVG.G): void {
    if (this.isVertical()) {
      // console.log('vertical');
      this.shape = host.polygon([
        this.origin.x, this.origin.y,
        this.origin.x + this.width, this.origin.y,
        this.origin.x, this.origin.y + this.height,
        this.origin.x + this.width, this.origin.y + this.height
      ]);
    } else {
      // console.log('horizontal');
      this.shape = host.polygon([
        this.origin.x, this.origin.y,
        this.origin.x, this.origin.y + this.height,
        this.origin.x + this.width, this.origin.y,
        this.origin.x + this.width, this.origin.y + this.height
      ]);
    }

    this.shape.addClass('butterfly');


    this.shape.on('mouseover', (e) => {
      this.drawInOutPoint(host);
    });

    this.shape.on('mouseleave', (e) => {
      this.removePoints();
    });
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

}
