import * as SVG from 'svg.js';
import { Point } from '../../core/Point';
import { GElement } from './GElement';
import { TriangleDrawer } from './utils/TriangleDrawer';
import { Direction } from './utils/Direction';
import { Gate } from './utils/Gate';
import { GParallelElement } from './GParallelWrapper';

export class GCompressor extends GElement implements GParallelElement {

  private radius: number;
  private direction: Direction;

  constructor(origin: Point, svgRef: SVG.G, radius: number, direction: Direction) {
    super(origin, svgRef, radius * 2, radius * 2,
      Gate.createSimple(radius * 2, radius * 2, direction)
    );

    this.direction = direction;
    this.radius = radius;
  }

  public drawInternal() {
    this.svgGroup
      .circle(this.radius * 2)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');

    const triangle = this.svgGroup
      .polyline(TriangleDrawer.getTrianglePoints(this.radius))
      .attr('fill', 'transparent')
      .attr('stroke', 'black');

    switch (this.direction) {
        case Direction.TopToBottom:
          triangle.rotate(180, this.radius, this.radius);
          break;
        case Direction.RightToLeft:
          triangle.rotate(270, this.radius, this.radius);
          break;
        case Direction.LeftToRight:
          triangle.rotate(90, this.radius, this.radius);
          break;
      }
  }

  public getCopy(newOrigin: Point, svgParent: SVG.G, direction: Direction): GElement {
    return new GCompressor(newOrigin, svgParent, this.radius, direction);
  }

  public getWidth(): number {
    return this.totWidth;
  }

  public getHeight(): number {
    return this.totHeight;
  }

  public getDirection(): Direction {
    return this.direction;
  }

}
