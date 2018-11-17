import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GElement } from './GElement';

export class GFan extends GElement {

  private centerRadius: number;
  private bladeWidth: number;
  private marginCircle = 2;

  private children: SVG.Shape[] = [];

  constructor(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number) {
    super(origin, svgParent, totWidth, totHeight);

    this.centerRadius = totHeight / 2 - this.marginCircle;
    this.bladeWidth = (totWidth - this.centerRadius) / 2;
  }


  public drawInternal(): void {

    // Draw center
    const center = this.svgGroup
      .circle(2 * this.centerRadius)
      .move(this.bladeWidth, this.marginCircle);

    // Draw blades
    const rightBlade = this.svgGroup
      .ellipse(this.bladeWidth, this.totHeight)
      .move(this.bladeWidth + 2 * this.centerRadius, 0);

    const leftBlade = this.svgGroup
      .ellipse(this.bladeWidth, this.totHeight);

    this.children.push(center, rightBlade, leftBlade);
  }


}
