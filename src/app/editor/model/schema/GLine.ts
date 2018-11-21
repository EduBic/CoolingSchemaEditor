import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../core/Point';
import { Gate } from './Gate';
import { LineDrawer } from '../core/LineDrawer';
import { HookPoint } from '../core/HookPoint';

export class GLine extends GElement {

  private points: Point[];

  private constructor(origin, svgParent: SVG.G, start: Gate, end: Gate, points: Point[]) {
    super(origin, svgParent, 0, 0, [start, end]);

    this.points = points;
  }

  public static connectElems(svgParent: SVG.G, parentOrigin: Point, exitElem: Gate, entryElem: Gate) {
    const points = LineDrawer.createLinePoints(exitElem.toExternalHook(), entryElem.toExternalHook());
    return new GLine(parentOrigin, svgParent, exitElem, entryElem, points);
  }

  public static connectParentToChildEntries(svgParent: SVG.G, parentOrigin: Point, parent: Gate,
    absChild: Gate): GLine {

      const points = LineDrawer.createLinePoints(parent.toInternalHook(), absChild.toExternalHook());
      return new GLine(parentOrigin, svgParent, parent, absChild, points);
  }

  public static connectChildToParentExits(svgParent: SVG.G, parentOrigin: Point, parent: Gate,
    absChild: Gate): GLine {

      const points = LineDrawer.createLinePoints(absChild.toExternalHook(), parent.toInternalHook());
      return new GLine(parentOrigin, svgParent, parent, absChild, points);
  }

  protected drawInternal() {
    this.svgGroup.polyline(this.flatPoints())
      .attr('fill', 'none')
      .attr('class', 'connector-line');
  }

  private flatPoints(): number[] {
    const res: number[] = [];

    this.points.forEach(p => {
      res.push(p.x);
      res.push(p.y);
    });

    return res;
  }

}
