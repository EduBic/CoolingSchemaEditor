import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GCompressor } from './GCompressor';
import { Direction } from './Direction';
import { DCompressor } from './SCompressor';

export class SCompressor {

  private data: DCompressor;
  private graphics: GCompressor[];

  constructor(data: DCompressor, origin: Point, svgRef: SVG.G, comprNum: number) {

    const xMargin = 5;
    const yMargin = 10;

    // info
    const direction = Direction.BottomToTop;
    const radius = 10;

    for (let i = 0; i < comprNum; i++) {
      this.graphics.push(
        new GCompressor(origin, svgRef, radius, direction),
      );
    }

  }

  public draw() {
    this.graphics.forEach(graphic => {
      graphic.drawAll();
    });
  }

}
