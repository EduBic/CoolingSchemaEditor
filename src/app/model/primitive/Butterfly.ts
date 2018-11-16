import * as SVG from 'svg.js';
import { GraphicSingle } from '../core/GraphicSingle';
import { Point } from '../core/Point';
import { InOut, Direction } from '../core/InOut';
import { HookPosition } from '../core/HookPosition';

export class Butterfly extends GraphicSingle {
  private width: number;
  private height: number;

  private vertical: boolean;

  private shape: SVG.Polygon;

  constructor(origin: Point, width: number, height: number, vertical = true) {
    if (vertical) {
      // vertical
      super(origin,
        InOut.createSimpleInOut(width, height,
          Direction.TopToBottom, origin)
      );
      this.width = width;
      this.height = height;
    } else {
      // horizontal
      super(origin,
        InOut.createSimpleInOut(width, height, Direction.LeftToRight, origin)
      );
      this.width = width;
      this.height = height;
    }

    this.vertical = vertical;
  }

  draw(host: SVG.G): void {
    if (this.vertical) {
      this.shape = host.polygon([
        this.origin.x, this.origin.y,
        this.origin.x + this.width, this.origin.y,
        this.origin.x, this.origin.y + this.height,
        this.origin.x + this.width, this.origin.y + this.height
      ])
        .move(this.origin.x, this.origin.y)
        .addClass('butterfly');
    } else {
      this.shape = host.polygon([
        this.origin.x, this.origin.y,
        this.origin.x, this.origin.y + this.height,
        this.origin.x + this.width, this.origin.y,
        this.origin.x + this.width, this.origin.y + this.height
      ])
        // .move(this.origin.x, this.origin.y)
        .addClass('butterfly');
    }



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
