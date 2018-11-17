import * as SVG from 'svg.js';
import { GraphicSingle } from '../core/GraphicSingle';
import { Point } from '../core/Point';
import { HookPair, Direction } from '../core/HookPair';
import { HookPosition } from '../core/HookPosition';

export class BigRect extends GraphicSingle {

  private width: number;
  private height: number;

  shape: SVG.Rect;

  constructor(origin: Point, width: number, height: number, percent: number = 0.1, invert: boolean) {
    super(origin,
      Direction.None,
      BigRect.externalInOut(origin, width, height, percent, invert),
      BigRect.rightInOut(origin, width, height, percent, invert),
      BigRect.leftInOut(origin, width, height, percent, invert)
    );
    this.width = width;
    this.height = height;
  }

  private static externalInOut(origin, width, height, percent, invert: boolean): HookPair {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x + width * percent, origin.y + height);
      _out = new Point(origin.x + width * (1 - percent), origin.y + height);
    } else {
      _in = new Point(origin.x + width * (1 - percent), origin.y);
      _out = new Point(origin.x + width * percent, origin.y);
    }

    return new HookPair(_in.x, _in.y, _out.x, _out.y,
      invert ? HookPosition.Bottom : HookPosition.Top,
      invert ? HookPosition.Bottom : HookPosition.Top
    );
  }

  private static leftInOut(origin, width, height, percent, invert: boolean): HookPair {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x, origin.y + height / 2);
      _out = new Point(origin.x + width * (percent * 2), origin.y);
    } else {
      _in = new Point(origin.x + width * percent * 2, origin.y + height);
      _out = new Point(origin.x, origin.y + height / 2);
    }

    return new HookPair(_in.x, _in.y, _out.x, _out.y,
      invert ? HookPosition.Left : HookPosition.Bottom,
      invert ? HookPosition.Top : HookPosition.Left
    );
  }

  private static rightInOut(origin, width, height, percent, invert: boolean): HookPair {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x + width, origin.y + height / 2);
      _out = new Point(origin.x + width * (1 - percent * 2), origin.y);
    } else {
      _in = new Point(origin.x + width * (1 - percent * 2), origin.y + height);
      _out = new Point(origin.x + width, origin.y + height / 2);
    }

    return new HookPair(_in.x, _in.y, _out.x, _out.y,
      invert ? HookPosition.Right : HookPosition.Bottom,
      invert ? HookPosition.Top : HookPosition.Right
    );
  }

  draw(host: SVG.G): void {
    this.shape = host.rect(this.width, this.height)
      .move(this.origin.x, this.origin.y)
      .addClass('rect');

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
    throw this.height;
  }

}
