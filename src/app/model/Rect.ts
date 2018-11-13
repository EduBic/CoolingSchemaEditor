import * as SVG from 'svg.js';

import {
  SchemaElement
} from './SchemaElement';

import {
  Point
} from './Point';
import { InOut } from './InOut';
import { Utils } from './Utils';

export class Rect extends SchemaElement {

  private width: number;
  private heigth: number;

  private svgRect: SVG.Rect;

  constructor(origin: Point, width: number, height: number) {
    super(origin,
      new InOut(width, height, origin.x, origin.y)
    );
    this.width = width;
    this.heigth = height;
  }

  draw(host: SVG.G): void {
    this.svgRect = host.rect(this.width, this.heigth)
      .move(this.origin.x, this.origin.y)
      .addClass('rect');

    this.svgRect.on('mouseover', (e) => {
      this.inOut.drawInputPoint(host);
      this.inOut.drawOutputPoint(host);
    });

    this.svgRect.on('mouseleave', (e) => {
      this.inOut.removePoints();
    });
  }

  drawOut(host: SVG.G, outCoord: Point): void {
    this.drawElbowPolyline(this.inOut.outCoordinate, outCoord, host);
  }

  private drawElbowPolyline(start, end, svg) {
    // important to maintaine the start and end point
    const points = Utils.computeElbow(start, end);

    svg.polyline([
      start.x, start.y,
      points[0].x, points[0].y,
      points[1].x, points[1].y,
      end.x, end.y
    ]).attr('fill', 'none')
      .attr('stroke', 'black');
  }

  getInCoordinates(): Point {
    return this.inOut.inCoordinate;
  }

  getOutCoordinates(): Point {
    return this.inOut.outCoordinate;
  }


}
