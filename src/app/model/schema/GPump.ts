import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GElement } from './GElement';
import { TriangleDrawer } from './TriangleDrawer';
import { Direction } from './Direction';
import { Gate } from './Gate';
import { GParallelElement } from './GParallelWrapper';

export class GPump extends GElement implements GParallelElement {

  private radius: number;
  private direction: Direction;

  constructor(origin: Point, svgParent: SVG.G, radius: number, direction: Direction) {
    super(origin, svgParent, radius * 2, radius * 2,
      Gate.createSimple(radius * 2, radius * 2, direction)
    );
    this.radius = radius;
    this.direction = direction;
  }

  protected drawInternal() {
    // Draw circle
    this.svgGroup.circle(this.radius * 2)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');
    // Draw inner triangle
    const triangle = this.svgGroup
      .polygon(TriangleDrawer.getTrianglePoints(this.radius));

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

    // Draw hooks
    // TODO
  }

  public getCopy(newOrigin: Point, svgParent: SVG.G, direction: Direction): GElement {
    return new GPump(newOrigin, svgParent, this.radius, direction);
  }

  public getWidth(): number {
    return this.totWidth;
  }

  public getHeight(): number {
    return this.totHeight;
  }


}
