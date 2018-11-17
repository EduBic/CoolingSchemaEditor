import * as SVG from 'svg.js';

import {
  GraphicSingle
} from '../core/GraphicSingle';

import {
  Point
} from '../core/Point';
import { HookPair, Direction } from '../core/HookPair';
import { ParallelizerElem } from '../layout/ParallelElements';

export class Rect extends GraphicSingle implements ParallelizerElem {

  private width: number;
  private height: number;

  private svgRect: SVG.Rect;

  constructor(origin: Point, width: number, height: number, direction: Direction = Direction.None) {
    super(origin, direction, HookPair.createSimpleInOut(width, height, direction, origin));
    this.width = width;
    this.height = height;
  }

  draw(host: SVG.G): void {
    this.svgRect = host.rect(this.width, this.height)
      .move(this.origin.x, this.origin.y)
      .addClass('rect');

    this.svgRect.on('mouseover', () => {
      this.drawInputPoint(host);
      this.drawOutputPoint(host);
    });

    this.svgRect.on('mouseleave', () => {
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
    return new Rect(origin, this.width, this.height, super.getDirection());
  }

}
