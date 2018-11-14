import * as SVG from 'svg.js';

import {
  SchemaElement
} from './SchemaElement';

import {
  Point
} from './Point';
import { InOut, HangPosition } from './InOut';
import { Utils } from './Utils';

export class Rect extends SchemaElement {

  private width: number;
  private height: number;

  private svgRect: SVG.Rect;

  constructor(origin: Point, width: number, height: number) {
    super(origin,
      InOut.createAutoTopInBottomOut(width, height, HangPosition.Bottom, HangPosition.Top, origin.x, origin.y)
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

}
