import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../../core/Point';
import { Gate } from './utils/Gate';
import { HookPosition } from '../../core/HookPosition';
import { TriangleDrawer } from './utils/TriangleDrawer';

export class GPoint extends GElement {

  private directionPos: HookPosition;
  private isEntry: boolean;

  constructor(origin: Point, svgParent: SVG.G, gatePosition: HookPosition, isEntry: boolean) {
    super(origin, svgParent, 0, 0, [
      new Gate(new Point(0, 0), gatePosition, isEntry)
    ]);

    this.directionPos = gatePosition;
    this.isEntry = isEntry;

    super.disableGateDraw();
    super.disableSelectRect();
  }




  protected drawInternal() {
    // circle
    const sizeCircle = 15;
    const half = sizeCircle / 2;

    // const point = this.svgGroup.circle(sizeCircle)
    //   .move(-half, -half)
    //   .addClass('gpoint');

    // triangle
    const side = 16;
    const angle = Math.PI / 3;  // 60 DEG
    const halfSide = side / 2;

    const h = halfSide * Math.tan(angle / 2);
    const totHeight = halfSide * Math.tan(angle);
    const H = totHeight - h;

    let trianglePoints: number[] = [];
    switch (this.directionPos) {
      case HookPosition.Top:
        if (this.isEntry) {
          trianglePoints = TriangleDrawer.downTriangle(new Point(0, 0), H, h, halfSide);
        } else {
          trianglePoints = TriangleDrawer.upTriangle(new Point(0, 0), H, h, halfSide);
        }
        break;
      case HookPosition.Bottom:
        if (this.isEntry) {
          // point down
        } else {
          // point top
        }
        break;
      case HookPosition.Left:
        if (this.isEntry) {

        } else {

        }
        break;
      case HookPosition.Right:
        if (this.isEntry) {

        } else {

        }
        break;
    }

    this.svgGroup.polygon(trianglePoints).addClass('gpoint');
  }

}
