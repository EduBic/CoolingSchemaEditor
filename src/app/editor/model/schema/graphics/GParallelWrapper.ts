import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../../core/Point';
import { Gate } from './utils/Gate';
import { HookPosition } from '../../core/HookPosition';
import { Direction, UtilDirection } from './utils/Direction';
import { GLine } from './GLine';

export interface GParallelElement {
  getCopy(newOrigin: Point, svgParent: SVG.G, direction: Direction): GElement;
  getWidth(): number;
  getHeight(): number;
  getDirection(): Direction;
}

// TODO: test support to different total number of element
export class GParallelWrapper extends GElement {

  private static readonly DIST_ELEM_TO_IN = 50;
  private static readonly DIST_ELEM_TO_OUT = 50;

  private children: GElement[] = [];

  private margin: number;


  constructor(origin: Point, svgParent: SVG.G, element: GParallelElement, total: number, margin = 5) {

    super(origin, svgParent,
      element.getWidth() * total + margin * (total - 1),  // totWidth
      element.getHeight() + GParallelWrapper.DIST_ELEM_TO_IN + GParallelWrapper.DIST_ELEM_TO_OUT, // TotHeight
      GParallelWrapper.getGates(
        element.getWidth() * total + margin * (total - 1),
        element.getHeight() + GParallelWrapper.DIST_ELEM_TO_IN + GParallelWrapper.DIST_ELEM_TO_OUT,
        element.getDirection()
      )
    );

    this.margin = margin;

    for (let n = 0; n < total; n++) {
      const newOrigin = new Point(
        (element.getWidth() + this.margin) * n,
        GParallelWrapper.DIST_ELEM_TO_IN
      );
      const clone = element.getCopy(newOrigin, this.svgGroup, element.getDirection());

      this.children.push(clone);
    }

    // this.createConnections();
    // TODO move out from here

    // const line = new GLine(origin, svgParent, this.getGate(0), this.children[0].getGate(0), true);

    this.children.forEach(child => {
      for (let i = 0; i < 2; i++) {

        const line = GLine.connectParentToChildEntries(
          svgParent, origin, this.getGate(i), child.getAbsoluteGate(i)
        );

        line.disableGateDraw();

        this.children.push(line);
      }
    });
  }

  private static getGates(totWidth: number, TotHeight: number, direction: Direction): Gate[] {
    const positions = UtilDirection.getPosition(direction);

    switch (direction) {
      case Direction.BottomToTop:
        return [
          new Gate(new Point(totWidth / 2, TotHeight), positions[0], true),
          new Gate(new Point(totWidth / 2, 0), positions[1], false)
        ];
      case Direction.TopToBottom:
        return [
          new Gate(new Point(totWidth / 2, 0), positions[0], true),
          new Gate(new Point(totWidth / 2, TotHeight), positions[1], false)
        ];
      default:
        // TODO: expands support to all
        throw Error('GParallelWrapper support only BottomToTop direction');
    }
  }

  protected drawInternal() {
    this.children.forEach(child => {
      child.drawAll();
    });
  }

}
