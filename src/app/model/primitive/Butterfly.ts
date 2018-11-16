import * as SVG from 'svg.js';
import { GraphicSingle } from '../core/GraphicSingle';
import { Point } from '../core/Point';
import { InOut } from '../core/InOut';
import { HookPosition } from '../core/HookPosition';

export class Butterfly extends GraphicSingle {
  private width: number;
  private height: number;

  private shape: SVG.Polygon;

  constructor(origin: Point, width: number, height: number) {
    super(origin,
      InOut.createAutoTopInBottomOut(width, height,
        HookPosition.Top, HookPosition.Bottom,
        origin.x, origin.y)
    );
    this.width = width;
    this.height = height;
  }

  draw(host: SVG.G): void {
    this.shape = host.polygon([
      this.origin.x, this.origin.y,
      this.origin.x + this.width, this.origin.y,
      this.origin.x, this.origin.y + this.height,
      this.origin.x + this.width, this.origin.y + this.height
    ])
      // .move(this.origin.x, this.origin.y)
      .addClass('butterfly');

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
