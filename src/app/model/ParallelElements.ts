import * as SVG from 'svg.js';
import { GraphicGroup } from './GraphicGroup';
import { GraphicElement } from './GraphicElement';
import { InOut } from './InOut';
import { Point } from './Point';

export interface ParallelizerElem {
  getWidth(): number;
  getHeight(): number;
  getCopy(origin: Point): GraphicElement;
}

export class ParallelElements extends GraphicGroup {

  private static readonly DIST_ELEM_TO_IN = 50;
  private static readonly DIST_ELEM_TO_OUT = 50;

  private elementWidth: number;
  private elementHeight: number;

  private margin: number;

  constructor(origin: Point, element: ParallelizerElem, total: number) {
    super(origin, InOut.createAutoTopInBottomOut2(
      element.getWidth() * total,
      element.getHeight() * total +
      ParallelElements.DIST_ELEM_TO_IN + ParallelElements.DIST_ELEM_TO_OUT,
      origin
    ));

    this.elementWidth = element.getWidth() * total;
    this.elementHeight = element.getHeight() * total;

    this.margin = 5;

    for (let n = 0; n < total; n++) {
      const newOrigin = new Point(
        (element.getWidth() + this.margin) * n,
        ParallelElements.DIST_ELEM_TO_IN
      );
      const clone = element.getCopy(newOrigin);

      this.addChild(clone);
    }
  }

  // draw(host: SVG.G): void {
  //   super.draw(host);
  // }

  public getWidth(): number {
    return  this.elementWidth * this.getChildrenSize();
  }

  public getHeight(): number {
    return this.elementHeight +
      ParallelElements.DIST_ELEM_TO_IN +
      ParallelElements.DIST_ELEM_TO_OUT;
  }


}
