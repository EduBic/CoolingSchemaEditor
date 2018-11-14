import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { Point } from './Point';
import { InOut, HangPosition } from './InOut';

export class BigRectEx extends SchemaElement {

  private width: number;
  private height: number;

  shape: SVG.Rect;

  constructor(origin: Point, width: number, height: number, percent: number = 0.1, invert: boolean) {
    super(origin,
      BigRectEx.externalInOut(origin, width, height, percent, invert),
      BigRectEx.rightInOut(origin, width, height, percent, invert),
      BigRectEx.leftInOut(origin, width, height, percent, invert)
    );
    this.width = width;
    this.height = height;
  }

  private static externalInOut(origin, width, height, percent, invert: boolean): InOut {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x + width * percent, origin.y + height);
      _out = new Point(origin.x + width * (1 - percent), origin.y + height);
    } else {
      _in = new Point(origin.x + width * (1 - percent), origin.y);
      _out = new Point(origin.x + width * percent, origin.y);
    }

    return new InOut(_in.x, _in.y, _out.x, _out.y,
      invert ? HangPosition.Bottom : HangPosition.Top,
      invert ? HangPosition.Bottom : HangPosition.Top
    );
  }

  private static leftInOut(origin, width, height, percent, invert: boolean): InOut {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x + width, origin.y + height / 2);
      _out = new Point(origin.x + width * (1 - percent * 2), origin.y);
    } else {
      _in = new Point(origin.x + width * percent * 2, origin.y + height);
      _out = new Point(origin.x, origin.y + height / 2);
    }

    return new InOut(_in.x, _in.y, _out.x, _out.y,
      invert ? HangPosition.Right : HangPosition.Bottom,
      invert ? HangPosition.Top : HangPosition.Right
    );
  }

  private static rightInOut(origin, width, height, percent, invert: boolean): InOut {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x, origin.y + height / 2);
      _out = new Point(origin.x + width * percent * 2, origin.y);
    } else {
      _in = new Point(origin.x + width * (1 - percent * 2), origin.y + height);
      _out = new Point(origin.x + width, origin.y + height / 2);
    }

    return new InOut(_in.x, _in.y, _out.x, _out.y,
      invert ? HangPosition.Left : HangPosition.Bottom,
      invert ? HangPosition.Top : HangPosition.Left
    );
  }

  draw(host: SVG.G): void {
    this.shape = host.rect(this.width, this.height)
      .move(this.origin.x, this.origin.y)
      .addClass('rect');

    this.shape.on('mouseover', (e) => {
      this.drawInputPoint(host);
      this.drawOutputPoint(host);
    });

    this.shape.on('mouseleave', (e) => {
      this.removePoints();
    });
  }

}
