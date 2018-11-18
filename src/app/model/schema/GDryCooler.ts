import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../core/Point';
import { GFan } from './GFan';
import { GCoil } from './GCoil';
import { GCoilPair } from './GCoilPair';

export class GDryCooler extends GElement {

  private fans: GFan[] = [];
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

    const sideCoverCoilMargin = 20;

    // Side Cover
    const widthSideCover = 60;
    const heightSide = totHeight - fan.getHeight() - topBottomMargin;



    // Coils
    const widthSpaceCoil = totWidth - 2 * widthSideCover - sideCoverCoilMargin * 2;
    const heightSpaceCoil = totHeight - fan.getHeight() - topBottomMargin;

    this.coilPair = new GCoilPair(
      new Point(widthSideCover + sideCoverCoilMargin, bottomOriginY), this.svgGroup, widthSpaceCoil, heightSpaceCoil, 60);

    console.log(fan.getHeight());
  }


  protected drawInternal() {

    this.fans.forEach(fan => {
      fan.drawAll();
    });

    this.coilPair.drawAll();

  }

}
