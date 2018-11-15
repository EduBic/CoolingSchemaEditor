import * as SVG from 'svg.js';

import {
  GraphicElement
} from './GraphicElement';

import {
  Point
} from './Point';
import { InOut } from './InOut';
import { HookPosition } from './HookPosition';

export class Rect extends GraphicElement {

  private width: number;
  private height: number;

  private svgRect: SVG.Rect;

  constructor(origin: Point, width: number, height: number) {
    super(origin,
      InOut.createAutoTopInBottomOut(width, height, HookPosition.Bottom, HookPosition.Top, origin.x, origin.y)
    );
    this.width = width;
    this.height = height;
  }

  draw(host: SVG.G): void {
    this.svgRect = host.rect(this.width, this.height)
      .move(this.origin.x, this.origin.y)
      .addClass('rect');

    this.svgRect.on('mouseover', (e) => {
      this.drawInputPoint(host);
      this.drawOutputPoint(host);
    });

    this.svgRect.on('mouseleave', (e) => {
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
