import * as SVG from 'svg.js';
import { GraphicSingle } from '../core/GraphicSingle';
import { Point } from '../core/Point';
import { InOut, Direction } from '../core/InOut';

export class Butterfly extends GraphicSingle {
  private width: number;
  private height: number;

  private shape: SVG.Polygon;

  constructor(origin: Point, width: number, height: number, direction: Direction) {
    super(origin, direction, InOut.createSimpleInOut(width, height, direction, origin));
    this.width = width;
    this.height = height;
  }

  draw(host: SVG.G): void {
    if (this.isVertical()) {
      this.shape = host.polygon([
        this.origin.x, this.origin.y,
        this.origin.x + this.width, this.origin.y,
        this.origin.x, this.origin.y + this.height,
        this.origin.x + this.width, this.origin.y + this.height
      ]);
    } else {
      this.shape = host.polygon([
        this.origin.x, this.origin.y,
        this.origin.x, this.origin.y + this.height,
        this.origin.x + this.width, this.origin.y,
        this.origin.x + this.width, this.origin.y + this.height
      ]);
    }

    this.shape.addClass('butterfly');


    this.shape.on('mouseover', (e) => {
      this.drawInputPoint(host);
      this.drawOutputPoint(host);
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
