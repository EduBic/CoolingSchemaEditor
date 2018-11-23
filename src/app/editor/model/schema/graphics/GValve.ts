import * as SVG from 'svg.js';
import { fromEvent } from 'rxjs';

import { GElement } from './GElement';
import { Point } from '../../core/Point';
import { Direction } from '../Direction';
import { Gate } from '../Gate';

export class GValve extends GElement {

  private points: number[];

  constructor(origin: Point, svgParent: SVG.G, width: number, height: number, direction: Direction) {
    super(origin, svgParent, width, height, Gate.createSimple(width, height, direction));

    if (direction === Direction.BottomToTop || direction === Direction.TopToBottom) {
      this.points = [
        0, 0,
        width, 0,
        0, height,
        width, height
      ];
    } else {
      this.points = [
        0, 0,
        0, height,
        width, 0,
        width, height
      ];
    }
  }


  protected drawInternal() {
    this.svgGroup.polygon(this.points);
  }

}
