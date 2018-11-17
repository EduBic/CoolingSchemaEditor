import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GCompressor } from './GCompressor';
import { Direction } from './Direction';
import { DCompressor } from './SCompressor';

export class SCompressor {

  private data: DCompressor;
  private graphics: GCompressor[];

  constructor(data: DCompressor, origin: Point, svgRef: SVG.G) {
    this.graphics.push(
      new GCompressor(origin, svgRef, 10, Direction.BottomToTop)
    );
  }

  public draw() {
    this.graphic.drawAll();
  }

}
