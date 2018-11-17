import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { HookPair } from '../core/HookPair';
import { Direction } from '../core/Direction';
import { HookPosition } from '../core/HookPosition';
import { GElement } from './GElement';
import { Gate } from './Gate';

export class GCoil extends GElement {

  private static readonly HOOK_POS_PERCENT = 0.2;

  private height: number;
  private depth: number;

  constructor(origin: Point, svgParent: SVG.G, height: number, depth: number) {
    super(origin, svgParent, depth, height,
      [
        new Gate(new Point(GCoil.HOOK_POS_PERCENT * depth, height), HookPosition.Bottom, true),
        new Gate(new Point((1 - GCoil.HOOK_POS_PERCENT) * depth, height), HookPosition.Bottom, false)
      ]
    );

    this.height = height;
    this.depth = depth;
  }


  public drawInternal(): void {
    this.svgGroup.rect(this.depth, this.height);
    this.svgGroup.rotate(35);
  }



}
