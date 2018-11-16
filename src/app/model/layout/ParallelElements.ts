import { GraphicGroup } from '../core/GraphicGroup';
import { GraphicSingle } from '../core/GraphicSingle';
import { Point } from '../core/Point';
import { LinkPair } from '../core/Link';
import { HookPosition } from '../core/HookPosition';

export interface ParallelizerElem {
  getElemWidth(): number;
  getElemHeight(): number;
  getCopy(origin: Point): GraphicSingle;
}

export class ParallelElements extends GraphicGroup {

  private static readonly DIST_ELEM_TO_IN = 50;
  private static readonly DIST_ELEM_TO_OUT = 50;

  private elementWidth: number;
  private elementHeight: number;

  private margin: number;

  constructor(origin: Point, element: ParallelizerElem, total: number, margin: number = 5) {
    const totWidth = element.getElemWidth() * total + margin * (total - 1);
    const totHeight = element.getElemHeight() + ParallelElements.DIST_ELEM_TO_IN + ParallelElements.DIST_ELEM_TO_OUT;

    super(origin,
      totWidth, totHeight,
      LinkPair.createLinkPair(
        new Point(totWidth / 2 + origin.x, totHeight + origin.y), HookPosition.Bottom,
        new Point(totWidth / 2 + origin.x, origin.y), HookPosition.Top
      )
    );

    this.margin = margin;

    this.elementWidth = element.getElemWidth();
    this.elementHeight = element.getElemHeight() * total;

    this.setWidthAndHeightGroup(
      this.elementWidth  * total + this.margin * (total - 1),
      this.elementHeight * total + ParallelElements.DIST_ELEM_TO_IN + ParallelElements.DIST_ELEM_TO_OUT
    );

    for (let n = 0; n < total; n++) {
      const newOrigin = new Point(
        (element.getElemWidth() + this.margin) * n,
        ParallelElements.DIST_ELEM_TO_IN
      );
      const clone = element.getCopy(newOrigin);

      this.addChild(clone);
    }
  }

}
