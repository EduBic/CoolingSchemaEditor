import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { GCompressor } from './graphics/GCompressor';
import { Direction } from './graphics/utils/Direction';
import { GParallelWrapper } from './graphics/GParallelWrapper';
import { SElement } from './SElement';
import { DType } from './DElement';

export class ParallelComprBuilder {

  public static create(origin: Point, svgParent: SVG.G, comprNum: number): SElement {

    const xMargin = 5;
    const yMargin = 10;

    // info
    const direction = Direction.BottomToTop;
    const radius = 10;

    // Graphic
    const carbonCopy = new GCompressor(origin, svgParent, radius, direction);
    const graphic = new GParallelWrapper(origin, svgParent, carbonCopy, comprNum);

    return new SElement(graphic, DType.Compressor);
  }

}
