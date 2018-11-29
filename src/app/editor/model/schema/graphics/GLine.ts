import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../../core/Point';
import { Gate } from './utils/Gate';
import { LineDrawer } from '../../core/LineDrawer';
import { HookPoint } from '../../core/HookPoint';
import { HookPosition } from '../../core/HookPosition';
import { UtilDirection } from './utils/Direction';

export class GLine extends GElement {

  private points: Point[];

  private constructor(origin, svgParent: SVG.G, start: Gate, end: Gate, points: Point[]) {
    super(origin, svgParent, 0, 0, [start, end]);

    // this.disableGateDraw();
    this.disableSelectRect();

    this.points = points;
  }

  public static connectElems(svgParent: SVG.G, parentOrigin: Point, exitElem: Gate, entryElem: Gate) {
    const points = LineDrawer.createLinePoints(exitElem.toExternalHook(), entryElem.toExternalHook());
    return new GLine(parentOrigin, svgParent, exitElem, entryElem, points);
  }

  public static connectParentToChildEntries(svgParent: SVG.G, lineOrigin: Point, parent: Gate,
    absChild: Gate): GLine {

      const points = LineDrawer.createLinePoints(parent.toInternalHook(), absChild.toExternalHook());
      return new GLine(lineOrigin, svgParent, parent, absChild, points);
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

  // Intersection management

  public intersectWithOutputOf(svgParent: SVG.G, parentOrigin: Point, startGate: Gate): GLine {
    const startPos = startGate.getPosition();

    const intersections = this.findIntersections(startGate.toExternalHook());
    const intersection = this.minDistance(intersections, startGate.toExternalHook().coord);
    const interPos = UtilDirection.getOppositePosition(startPos);

    const points = LineDrawer.createLinePoints(startGate.toExternalHook(), new HookPoint(intersection, interPos));

    return new GLine(parentOrigin, svgParent, startGate, new Gate(intersection, HookPosition.Bottom, true), points);
  }

  private minDistance(inters: Point[], start: Point): Point {
    let res = inters[0];
    let minDist = Math.sqrt( Math.pow(res.x - start.x, 2) + Math.pow(res.y - start.y, 2) );

    for (let i = 1; i < inters.length; i++) {
      const interDist = Math.sqrt( Math.pow(inters[i].x - start.x, 2) + Math.pow(inters[i].y - start.y, 2) );

      // console.log('Inters X/Y', interDist, 'inters min ', minDist);

      if (interDist < minDist) {
        minDist = interDist;
        res = inters[i];
      }
    }

    return res;

  }

  // public connectWithInputOf(element: GElement, svgParent: SVG.G): GLine {
  //   const inHookElem = element.getInHook();
  //   const intersection = this.findIntersections(inHookElem)[0];

  //   return new GLine(
  //     new HookPoint(intersection, inHookElem.getOppositePosition()),
  //     new HookPoint(inHookElem.coord, inHookElem.position)
  //   );
  // }

  private findIntersections(outPoint: HookPoint): Point[] {

    const segments = this.takeSegments();
    const intersectionsFound: Point[] = [];

    // Search FIRST intersection with lines
    segments.forEach((segment: Point[]) => {

      let intersection: Point;

      if (this.lineIsHorizontal(segment)) {
        intersection = new Point(segment[0].x, outPoint.coord.y);
      } else if (this.lineIsVertical(segment)) {
        intersection = new Point(outPoint.coord.x, segment[0].y);
      }

      if (intersection.isIntoSegment(segment[0], segment[1])) {
        intersectionsFound.push(intersection);
      }
    });

    return intersectionsFound;
  }

  private takeSegments(): Point[][] {
    const lines: Point[][] = [];

    // take segment between the points
    for (let i = 0; i < this.points.length - 1; i++) {
      lines.push([ this.points[i], this.points[i + 1] ]);
    }

    return lines;
  }

  private lineIsHorizontal(twoPoints: Point[]): boolean {
    if (twoPoints.length > 2) {
      console.log('Max points is 2!');
    }
    return twoPoints[0].x === twoPoints[1].x;
  }

  private lineIsVertical(twoPoints: Point[]): boolean {
    if (twoPoints.length > 2) {
      console.log('Max points is 2!');
    }
    return twoPoints[0].y === twoPoints[1].y;
  }

}
