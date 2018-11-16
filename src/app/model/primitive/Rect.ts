import * as SVG from 'svg.js';

import {
  GraphicSingle
} from '../core/GraphicSingle';

import {
  Point
} from '../core/Point';
import { InOut } from '../core/InOut';
import { HookPosition } from '../core/HookPosition';

export class Rect extends GraphicSingle {

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
