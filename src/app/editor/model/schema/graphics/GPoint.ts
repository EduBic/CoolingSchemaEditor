import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../../core/Point';
import { Gate } from './utils/Gate';
import { HookPosition } from '../../core/HookPosition';

export class GPoint extends GElement {


  constructor(origin: Point, svgParent: SVG.G, gatePosition: HookPosition, isEntry: boolean) {
    super(origin, svgParent, 0, 0, [
      new Gate(new Point(0, 0), gatePosition, isEntry)
    ]);

    super.disableGateDraw();
    super.disableSelectRect();
  }




  protected drawInternal() {
    const sizeCircle = 15;
    const half = sizeCircle / 2;

    const point = this.svgGroup.circle(sizeCircle)
      .move(-half, -half)
      .addClass('gpoint');
  }

}
