import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../core/Point';
import { Gate } from './Gate';
import { HookPosition } from '../core/HookPosition';
import { Direction, UtilDirection } from './Direction';

export interface GParallelElement {
  getCopy(newOrigin: Point, svgParent: SVG.G, direction: Direction): GElement;
  getWidth(): number;
  getHeight(): number;
}

export class GParallelWrapper extends GElement {

  private static readonly DIST_ELEM_TO_IN = 50;
  private static readonly DIST_ELEM_TO_OUT = 50;

  //
  private children: GElement[] = [];

  private margin: number;

  constructor(origin: Point, svgRef: SVG.G, element: GParallelElement, total: number, direction: Direction, margin: number = 5) {
    super(origin, svgRef,
      element.getWidth() * total + margin * (total - 1),  // totWidth
      element.getHeight() + GParallelWrapper.DIST_ELEM_TO_IN + GParallelWrapper.DIST_ELEM_TO_OUT, // TotHeight
      GParallelWrapper.getGates(
        element.getWidth() * total + margin * (total - 1),
        element.getHeight() + GParallelWrapper.DIST_ELEM_TO_IN + GParallelWrapper.DIST_ELEM_TO_OUT,
        direction
      )
    );

    this.margin = margin;

    for (let n = 0; n < total; n++) {
      const newOrigin = new Point(
        (element.getWidth() + this.margin) * n,
        GParallelWrapper.DIST_ELEM_TO_IN
      );
      const clone = element.getCopy(newOrigin, this.svgGroup, direction);

      this.children.push(clone);
    }

    // super.generateStandardConnections();
  }

  private static getGates(totWidth: number, TotHeight: number, direction: Direction): Gate[] {

    const positions = UtilDirection.getPosition(direction);
    return [
      new Gate( new Point(totWidth / 2, TotHeight), positions[0], true),
      new Gate(new Point(totWidth / 2, 0), positions[1], false)
    ];
  }

  protected drawSub() {
    this.children.forEach(child => {
      child.drawAll();
    });
  }

}
