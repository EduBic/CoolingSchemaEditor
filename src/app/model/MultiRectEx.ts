import * as SVG from 'svg.js';
import { Point } from './Point';
import { Rect } from './Rect';
import { InOut, HangPosition } from './InOut';
import { Utils } from './Utils';
import { SchemaElement } from './SchemaElement';

export class MultiRectEx extends SchemaElement {
  private static TOT_LINE_LENGTH = 80;

  private totalRects: number;

  private width: number;
  private heigth: number;
  private margin: number;

  private groupSVG: SVG.G;


  constructor(origin: Point, totalRects: number, widthRect: number, heigthRect: number, margin: number = 5) {
    super(origin, InOut.createAutoTopInBottomOut(
      (totalRects * widthRect + (totalRects - 1) * margin),
      heigthRect + MultiRectEx.TOT_LINE_LENGTH * 2,
      HangPosition.Bottom, HangPosition.Top
    ));
    this.totalRects = totalRects;
    this.width = widthRect;
    this.heigth = heigthRect;
    this.margin = margin;
  }

  public draw(host: SVG.G) {

    this.groupSVG = host.group();
    this.groupSVG.move(this.origin.x, this.origin.y);

    for (let i = 0; i < this.totalRects; i++) {
      // const rect = this.groupSVG.rect(this.width, this.heigth)
      //   .move((this.width + this.margin) * i, 0);

      const aRect = new Rect(
        {x: (this.width + this.margin) * i, y: MultiRectEx.TOT_LINE_LENGTH},
        60, 60
      );

      this.drawElbowPolyline(aRect.getOutCoordinates(0), this.getOutCoordinates(0), this.groupSVG);
      this.drawElbowPolyline(aRect.getInCoordinates(0), this.getInCoordinates(0), this.groupSVG);

      aRect.draw(this.groupSVG);
    }

    this.drawInputPoint(this.groupSVG);
    this.drawOutputPoint(this.groupSVG);

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
      .attr('stroke', 'black');
  }


}
