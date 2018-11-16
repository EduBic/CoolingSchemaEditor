import * as SVG from 'svg.js';

import {
  GraphicSingle
} from '../core/GraphicSingle';

import {
  Point
} from '../core/Point';
import { InOut, Direction } from '../core/InOut';
import { HookPosition } from '../core/HookPosition';
import { ParallelizerElem } from '../layout/ParallelElements';

export class Rect extends GraphicSingle implements ParallelizerElem {

  private width: number;
  private height: number;

  private svgRect: SVG.Rect;

  constructor(origin: Point, width: number, height: number) {
    super(origin,
      InOut.createSimpleInOut(width, height, Direction.BottomToTop, origin)
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

  public getElemWidth(): number {
    return this.width;
  }
  public getElemHeight(): number {
    return this.height;
  }

  public getCopy(origin: Point): GraphicSingle {
    return new Rect(origin, this.width, this.height);
  }

}
