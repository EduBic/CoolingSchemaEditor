import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GCompressor } from './GCompressor';
import { Direction } from './Direction';

export interface DCompressor {
  id: number;
  name: string;
}

export class SCompressor {

  private data: DCompressor;
  private graphic: GCompressor;

  constructor(data: DCompressor, origin: Point, svgRef: SVG.G) {
    this.graphic = new GCompressor(origin, svgRef, 10, Direction.RightToLeft);
  }

  public draw() {
    this.graphic.drawAll();
  }

}
