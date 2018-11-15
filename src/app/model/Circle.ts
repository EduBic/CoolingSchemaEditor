import * as SVG from 'svg.js';
import { GraphicElement } from './GraphicElement';
import { ParallelizerElem } from './ParallelElements';
import { Point } from './Point';
import { InOut } from './InOut';

export class Circle extends GraphicElement implements ParallelizerElem {

  private radius: number;

  constructor(origin: Point, radius: number) {
    super(origin, InOut.createAutoTopInBottomOut2(
      radius * 2, radius * 2, origin
    ));

    this.radius = radius;
  }

  getCopy(origin: Point): GraphicElement {
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

  public getWidth(): number {
    return this.radius * 2;
  }
  public getHeight(): number {
    throw this.radius * 2;
  }

}
