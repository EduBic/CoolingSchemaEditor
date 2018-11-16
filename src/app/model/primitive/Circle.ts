import * as SVG from 'svg.js';
import { GraphicSingle } from '../core/GraphicSingle';
import { ParallelizerElem } from '../layout/ParallelElements';
import { Point } from '../core/Point';
import { InOut } from '../core/InOut';

export class Circle extends GraphicSingle implements  ParallelizerElem  {

  private radius: number;

  constructor(origin: Point, radius: number) {
    super(origin, InOut.createAutoBottomInTopOut(
      radius * 2, radius * 2, origin
    ));

    this.radius = radius;
  }

  getCopy(origin: Point): GraphicSingle {
    return new Circle(origin, this.radius);
  }

  draw(host: SVG.G): void {
    this.svgElement = host.circle(this.radius * 2)
      .move(this.origin.x, this.origin.y)
      .addClass('circle');

    this.svgElement.on('mouseover', (e) => {
      this.drawInputPoint(host);
      this.drawOutputPoint(host);
    });

    this.svgElement.on('mouseleave', (e) => {
      this.removePoints();
    });

  }

  public getElemWidth(): number {
    return this.radius * 2;
  }
  public getElemHeight(): number {
    return this.radius * 2;
  }

}