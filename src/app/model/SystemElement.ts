import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { MultiRectEx } from './MultiRectEx';
import { ButterflyEx } from './ButterflyEx';
import { Utils } from './Utils';
import { Point } from './Point';

export class SystemElement extends SchemaElement {

  system: SVG.G;

  constructor(origin: Point) {
    super(origin);
  }

  draw(host: SVG.G): void {

    this.system = host.group();

    const multiRect = new MultiRectEx(
      {x: 120, y: 100},
      3, 60, 60, 6
    );

    multiRect.draw(this.system);

    const but = new ButterflyEx(
      {x: 60, y: 160},
      30, 60
    );
    but.draw(this.system);

    this.drawDirectPolyline(multiRect.getAbsoluteOutCoordinates(0), but.getInCoordinates(0), this.system);
    this.drawDirectPolyline(but.getOutCoordinates(0), multiRect.getAbsoluteInCoordinates(0), this.system);

  }

  private drawDirectPolyline(start: Point, end: Point, svg: SVG.G) {
    let middle: Point;

    if (start.y < end.y && start.x >= end.x) {
      // middle point is left top
      middle = new Point(Math.min(start.x, end.x), Math.min(start.y, end.y));
    } else if (start.y < end.y && start.x < end.x) {
      // middle point is left bottom
      middle = new Point(Math.min(start.x, end.x), Math.max(start.y, end.y));
    } else if (start.y >= end.y && start.x >= end.x) {
      // middle point is right top
      middle = new Point(Math.max(start.x, end.x), Math.min(start.y, end.y));
    } else if (start.y >= end.y && start.x < end.x) {
      // middle point is right bottom
      middle = new Point(Math.max(start.x, end.x), Math.max(start.y, end.y));
    }

    svg.polyline([
      start.x, start.y,
      middle.x, middle.y,
      end.x, end.y
    ]).attr('fill', 'none')
    .attr('stroke', 'blue');
  }

  private drawElbowPolyline(start: Point, end: Point, svg: SVG.G) {
    // important to maintaine the start and end point
    const points = Utils.computeElbow(start, end);

    svg.polyline([
      start.x, start.y,
      points[0].x, points[0].y,
      points[1].x, points[1].y,
      end.x, end.y
    ]).attr('fill', 'none')
      .attr('stroke', 'blue');
  }
}
