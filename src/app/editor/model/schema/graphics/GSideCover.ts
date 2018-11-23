import * as SVG from 'svg.js';
import { Point } from '../../core/Point';
import { GElement } from './GElement';

export class GSideCover extends GElement {

  private static readonly WIDTH = 30;
  private static readonly HEIGHT = 50;
  private static readonly MARGIN_Y = 10;

  private sideCoverWidth: number;
  private sideCoverHeight: number;

  private marginX: number;
  private marginY: number;
  private rectNum: number;

  private children: SVG.Shape[] = [];

  constructor(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number, centerDistance: number) {
    super(origin, svgParent, totWidth, totHeight);

    // N.B. support only 4 rectNumber
    // TODO: extends support to more rect
    const totNum = 4;

    if (totNum % 2 !== 0) {
      throw Error('GSideCover support only even number of side covers');
    }

    this.sideCoverWidth = (totWidth - centerDistance) / 2;
    this.sideCoverHeight = (totHeight - GSideCover.MARGIN_Y * (totNum / 2 - 1)) / (totNum / 2);

    this.marginX = centerDistance;
    this.marginY = GSideCover.MARGIN_Y;

    this.rectNum = totNum;
  }

  public drawInternal() {
    const halfRectNum = this.rectNum / 2;

    for (let i = 0; i < halfRectNum; i++) {
      for (let k = 0; k < halfRectNum; k++) {

        const rect = this.svgGroup.rect(this.sideCoverWidth, this.sideCoverHeight)
          .move(i * (this.sideCoverWidth + this.marginX), k * (this.marginY + this.sideCoverHeight))
          .addClass('side-cover');

        this.children.push(rect);
      }
    }

    // N.B. no connection for this element
  }

}
