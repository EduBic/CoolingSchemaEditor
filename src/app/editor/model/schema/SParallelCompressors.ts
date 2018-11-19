import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GCompressor } from './GCompressor';
import { Direction } from './Direction';
import { DCompressor } from './SCompressor';
import { GParallelWrapper } from './GParallelWrapper';

export class SParallelCompressor {

  private data: DCompressor;
  private graphic: GParallelWrapper;

  constructor(data: DCompressor, origin: Point, svgRef: SVG.G, comprNum: number) {

    const xMargin = 5;
    const yMargin = 10;

    // info
    const direction = Direction.BottomToTop;
    const radius = 10;

    // Graphic
    const carbonCopy = new GCompressor(origin, svgRef, radius, direction);

    this.graphic = new GParallelWrapper(origin, svgRef, carbonCopy, comprNum);
  }

  public draw() {
    this.graphic.drawAll();
  }

}
