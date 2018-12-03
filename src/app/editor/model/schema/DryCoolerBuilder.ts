import * as SVG from 'svg.js';
import { GElement } from './graphics/GElement';
import { Point } from '../core/Point';
import { GFan } from './graphics/GFan';
import { GCoilPair } from './graphics/GCoilPair';
import { GSideCover } from './graphics/GSideCover';
import { SElement } from './SElement';
import { DElement, DType } from './DElement';


export class DryCoolerBuilder {

  public static create(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number): SElement[] {
      // super(origin, svgParent, totWidth, totHeight, []);
      const res: SElement[] = [];

      const svgGroup = svgParent.group(); // .move(origin.x, origin.y);

      // create Fans
      const fanMarginX = 10;
      const fanMarginCenterX = 10;
      const fanWidth = (totWidth - 2 * fanMarginX - fanMarginCenterX) / 2;

      const fan = new GFan(
        DryCoolerBuilder.getOrigin(origin, new Point(fanMarginX, 0)),
        svgGroup, fanWidth);
      const fan2 = new GFan(
        DryCoolerBuilder.getOrigin(origin, new Point(fanMarginX + fanWidth + fanMarginCenterX, 0)),
        svgGroup, fanWidth
      );

      // fans.push(fan, fan2);


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

      const sideCover = new GSideCover(
        DryCoolerBuilder.getOrigin(origin, new Point(0, bottomOriginY)), svgGroup, totWidth, bottomHeight, totWidthCoil
      );

      // Coils elem
      const coilPair = new GCoilPair(
        DryCoolerBuilder.getOrigin(origin, new Point(widthOneSideCover + sideCoverCoilMargin, bottomOriginY)),
        svgGroup, totWidthCoilWithMargin, totHeightCoil, 60);


      // Build elements


      res.push(
        new SElement(fan, DType.Fan, null, 'Fan'),
        new SElement(fan2, DType.Fan, null, 'Fan'),
        new SElement(sideCover, DType.SideCover, null, 'Side Cover'),
        new SElement(coilPair, DType.Coil, null, 'Coils')
      );

      // console.log(fan.getHeight());
      return res;
  }

  private static getOrigin(groupOrigin: Point, elemOrigin: Point): Point {
    return new Point(groupOrigin.x + elemOrigin.x, groupOrigin.y + elemOrigin.y);
  }

}
