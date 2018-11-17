import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GPump } from './GPump';
import { Direction } from './Direction';

interface DPump {
  id: number;
  name: string;
  total: number;
}

export class SPump {

  private data: DPump;
  private graphic: GPump;

  constructor(data: DPump, origin: Point, svgRef: SVG.G) {
    // build graphic pump
    this.graphic = new GPump(origin, svgRef, 10, Direction.BottomToTop);

    // Interaction management
    this.graphic.onClick = (e) => {
      console.log(e);
    };

    this.data = data;
  }

  draw() {
    this.graphic.drawAll();
  }



}
