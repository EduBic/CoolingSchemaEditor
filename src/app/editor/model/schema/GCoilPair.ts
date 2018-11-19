import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../core/Point';
import { GCoil } from './GCoil';
import { Gate } from './Gate';
import { HookPosition } from '../core/HookPosition';

export class GCoilPair extends GElement {

  private coilWidth: number;
  private centerDistance: number;

  private coils: GCoil[] = [];

  constructor(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number, centerDistance: number) {
    super(origin, svgParent, totWidth, totHeight,
      [
        new Gate(new Point(totWidth / 2 - 0.1 * totWidth, totHeight), HookPosition.Top, false),   // left output
        new Gate(new Point(totWidth / 2, totHeight), HookPosition.Bottom, true),                  // center input
        new Gate(new Point(totWidth / 2 + 0.1 * totWidth, totHeight), HookPosition.Bottom, false) // right output
      ]
    );

    this.coilWidth = (totWidth - centerDistance) / 2;
    this.centerDistance = centerDistance;

    // const coilLeft = new GCoil(
    //   new Point(0, 0),
    //   this.svgGroup, 80, 20, GCoilPos.Left
    // );

    // const coilRight = new GCoil(
    //   new Point(coilLeft.getWidth() + centerDistance, 0),
    //   this.svgGroup, 80, 20, GCoilPos.Right
    // );

    // this.coils.push(coilLeft, coilRight);

    // update total width and height
    // this.totWidth = coilLeft.getWidth() + centerDistance + coilRight.getWidth();
    // this.totHeight = Math.max(coilLeft.getHeight(), coilRight.getHeight());

  }

  protected drawInternal() {
    // this.coils.forEach(child => {
    //   child.drawAll();
    // });
    this.svgGroup.rect(this.coilWidth, this.totHeight);
    this.svgGroup.rect(this.coilWidth, this.totHeight)
      .move(this.coilWidth + this.centerDistance, 0);
  }

}
