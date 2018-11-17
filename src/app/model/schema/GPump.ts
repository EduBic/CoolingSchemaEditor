import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GElement } from './GElement';
import { TriangleDrawer } from './TriangleDrawer';
import { Direction } from './Direction';
import { HookPair } from '../core/HookPair';

export class GPump extends GElement {

  private radius: number;

  constructor(origin: Point, svgRef: SVG.G, radius: number, direction: Direction) {
    super(origin, svgRef, radius * 2, radius * 2,
      HookPair.createSimpleInOut(radius * 2, radius * 2, direction)
    );
    this.radius = radius;
  }

  protected drawSub() {
    // Draw circle
    this.svgGroup.circle(this.radius * 2)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');
    // Draw inner triangle
    this.svgGroup
      .polygon(TriangleDrawer.getTrianglePoints(this.radius));
    // Draw hooks
    // TODO
  }


}
