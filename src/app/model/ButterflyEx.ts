import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { Point } from './Point';
import { InOut } from './InOut';
import { HookPosition } from './HookPosition';

export class ButterflyEx extends SchemaElement {
  private width: number;
  private heigth: number;

  private shape: SVG.Polygon;

  constructor(origin: Point, width: number, height: number) {
    super(origin,
      InOut.createAutoTopInBottomOut(width, height,
        HookPosition.Top, HookPosition.Bottom,
        origin.x, origin.y)
    );
    this.width = width;
    this.heigth = height;
  }

  draw(host: SVG.G): void {
    this.shape = host.polygon([
      this.origin.x, this.origin.y,
      this.origin.x + this.width, this.origin.y,
      this.origin.x, this.origin.y + this.heigth,
      this.origin.x + this.width, this.origin.y + this.heigth
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

}
