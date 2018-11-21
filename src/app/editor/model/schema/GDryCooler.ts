import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../core/Point';
import { GFan } from './GFan';
import { GCoil } from './GCoil';
import { GCoilPair } from './GCoilPair';
import { GSideCover } from './GSideCover';

export class GDryCooler extends GElement {

  private fans: GFan[] = [];
  private sideCover: GSideCover;
  private coilPair: GCoilPair;

  constructor(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number) {
    super(origin, svgParent, totWidth, totHeight, []);

    this.disableGateDraw();
    this.disableSelectRect();

    // Fans
    const fanMarginX = 10;
    const fanMarginCenterX = 10;
    const fanWidth = (totWidth - 2 * fanMarginX - fanMarginCenterX) / 2;

    const fan = new GFan(
      new Point(fanMarginX, 0), this.svgGroup, fanWidth);
    const fan2 = new GFan(
      new Point(fanMarginX + fanWidth + fanMarginCenterX, 0),
      this.svgGroup, fanWidth
    );

    this.fans.push(fan, fan2);


    const topBottomMargin = 20;
    const bottomHeight = totHeight - fan.getHeight() - topBottomMargin;
    const bottomOriginY = fan.getHeight() + topBottomMargin;


    // Coils data
    const sideCoverCoilMargin = 30;
    const totWidthCoil = totWidth * 3 / 4;
    const totWidthCoilWithMargin = totWidthCoil - sideCoverCoilMargin * 2;
    const totHeightCoil = totHeight - fan.getHeight() - topBottomMargin;

    // Side Cover
    const widthOneSideCover = (totWidth - totWidthCoil) / 2;

    this.sideCover = new GSideCover(
      new Point(0, bottomOriginY), this.svgGroup, totWidth, bottomHeight, totWidthCoil
    );

    // Coils elem
    this.coilPair = new GCoilPair(
      new Point(widthOneSideCover + sideCoverCoilMargin, bottomOriginY), this.svgGroup, totWidthCoilWithMargin, totHeightCoil, 60);

    // console.log(fan.getHeight());
  }


  protected drawInternal() {

    this.fans.forEach(fan => {
      fan.drawAll();
    });

    this.coilPair.drawAll();
    this.sideCover.drawAll();
  }

}
