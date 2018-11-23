import * as SVG from 'svg.js';
import { Point } from '../../core/Point';
import { GElement } from './GElement';

export class GFan extends GElement {

  private static readonly PROPORTION = 0.18;

  private centerRadius: number;
  private bladeWidth: number;
  private marginCircle = 2;

  private children: SVG.Shape[] = [];

  constructor(origin: Point, svgParent: SVG.G, width: number) {
    super(origin, svgParent, width, width * GFan.PROPORTION);

    this.centerRadius = (width * GFan.PROPORTION) / 2 - this.marginCircle;
    this.bladeWidth = (width - this.centerRadius * 2) / 2;
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

  public getHeight(): number {
    return this.totHeight;
  }

  public getWidth(): number {
    return this.totWidth;
  }

}
