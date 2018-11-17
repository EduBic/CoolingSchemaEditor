import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GElement } from './GElement';

export class GSideCover extends GElement {

  private static readonly WIDTH = 30;
  private static readonly HEIGHT = 50;
  private static readonly MARGIN_Y = 10;

  private marginX: number;
  private marginY: number;
  private rectNum: number;

  private children: SVG.Shape[] = [];

  constructor(origin: Point, svgParent: SVG.G, centerDistance: number) {
    super(origin, svgParent,
      GSideCover.WIDTH * 2 + centerDistance,
      GSideCover.HEIGHT * 2 + GSideCover.MARGIN_Y
    );

    this.marginX = centerDistance;
    this.marginY = GSideCover.MARGIN_Y;
    // N.B. support only 4 rectNumber
    // TODO: extends support to more rect
    this.rectNum = 4;
  }

  public drawInternal() {
    const halfRectNum = this.rectNum / 2;

    for (let i = 0; i < halfRectNum; i++) {
      for (let k = 0; k < halfRectNum; k++) {

        const rect = this.svgGroup.rect(GSideCover.WIDTH, GSideCover.HEIGHT)
          .move(i * (GSideCover.WIDTH + this.marginX), k * (this.marginY + GSideCover.HEIGHT))
          .addClass('side-cover');

        this.children.push(rect);
      }
    }

    // N.B. no connection for this element
  }

}
