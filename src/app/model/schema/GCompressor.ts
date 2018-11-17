import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GElement } from './GElement';
import { TriangleDrawer } from './TriangleDrawer';
import { Direction } from './Direction';
import { Gate } from './Gate';

export class GCompressor extends GElement {

  private radius: number;

  constructor(origin: Point, svgRef: SVG.G, radius: number, direction: Direction) {
    super(origin, svgRef, radius * 2, radius * 2,
      Gate.createSimple(radius * 2, radius * 2, direction)
    );

    this.radius = radius;
  }

  public drawSub() {
    this.svgGroup
      .circle(this.radius * 2)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');

    this.svgGroup
      .polyline(TriangleDrawer.getTrianglePoints(this.radius))
      .attr('fill', 'transparent')
      .attr('stroke', 'black');
  }

}
