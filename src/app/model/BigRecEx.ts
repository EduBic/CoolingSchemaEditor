import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { Point } from './Point';
import { InOut } from './InOut';

export class BigRectEx extends SchemaElement {

  private width: number;
  private height: number;

  shape: SVG.Rect;

  constructor(origin: Point, width: number, height: number, percent: number = 0.1, invert = false) {
    super(origin,
      BigRectEx.externalInOut(origin, width, height, percent, invert),
      BigRectEx.rightInOut(origin, width, height, percent, invert),
      BigRectEx.leftInOut(origin, width, height, percent, invert)
    );
    this.width = width;
    this.height = height;
  }

  private static externalInOut(origin, width, height, percent, invert: boolean = true): InOut {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x + width * (1 - percent), origin.y);
      _out = new Point(origin.x + width * percent, origin.y);
    } else {
      _in = new Point(origin.x + width * percent, origin.y + height);
      _out = new Point(origin.x + width * (1 - percent), origin.y + height);
    }

    return new InOut(_in.x, _in.y, _out.x, _out.y) ;
  }

  private static rightInOut(origin, width, height, percent, invert: boolean = true): InOut {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x + width * percent * 2, origin.y + height);
      _out = new Point(origin.x, origin.y + height / 2);
    } else {
      _in = new Point(origin.x + width, origin.y + height / 2);
      _out = new Point(origin.x + width * (1 - percent * 2), origin.y);
    }

    return new InOut(_in.x, _in.y, _out.x, _out.y);
  }

  private static leftInOut(origin, width, height, percent, invert: boolean = true): InOut {
    let _in;
    let _out;

    if (invert) {
      _in = new Point(origin.x + width * (1 - percent * 2), origin.y + height);
      _out = new Point(origin.x + width, origin.y + height / 2);
    } else {
      _in = new Point(origin.x, origin.y + height / 2);
      _out = new Point(origin.x + width * percent * 2, origin.y);
    }

    return new InOut(_in.x, _in.y, _out.x, _out.y);
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
