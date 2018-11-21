import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { HookPoint } from '../core/HookPoint';
import { LineDrawer } from '../core/LineDrawer';
import { GraphicSingle } from '../core/GraphicSingle';
import { HookPair } from '../core/HookPair';
import { Direction } from '../core/Direction';
import { GraphicElement } from '../core/GraphicElement';
import { HookPosition } from '../core/HookPosition';

export class ConnectorLine extends GraphicSingle {

  private points: Point[] = [];

  private intersections: Point[] = [];  // Mainly for debug
  private svgIntersections: SVG.Path[] = [];

  constructor(start: HookPoint, end: HookPoint) {
    super(new Point(0, 0),
      ConnectorLine.getDirection(start.position, end.position),
      HookPair.createFromHooks(start, end)
    );
    this.points = LineDrawer.createLinePoints(start, end);
  }

  private static getDirection(start: HookPosition, end: HookPosition): Direction {
    if (start === HookPosition.Top && end === HookPosition.Bottom) {
      return Direction.TopToBottom;
    } else if (start === HookPosition.Bottom && end === HookPosition.Top) {
      return Direction.BottomToTop;
    } else if (start === HookPosition.Right && end === HookPosition.Left) {
      return Direction.RightToLeft;
    } else if (start === HookPosition.Left && end === HookPosition.Right) {
      return Direction.LeftToRight;
    }
  }

  public static connect(firstElement: GraphicElement, firstIndex: number,
    secondElement, secondIndex: number): ConnectorLine {

    return new ConnectorLine(
      firstElement.getOutHook(firstIndex),
      secondElement.getInHook(secondIndex)
    );
  }

  draw(host: SVG.G): void {

    this.svgElement = host.polyline(this.flatPoints())
      .attr('fill', 'none')
      .attr('class', 'connector-line');


    this.svgElement.on('mouseover', (e) => {
      this.drawInOutPoint(host);
      this.drawIntersections(host);
    });

    this.svgElement.on('mouseleave', (e) => {
      this.removePoints();
      this.removeIntersectionShapes();
    });
  }

  private flatPoints(): number[] {
    const res: number[] = [];

    this.points.forEach(p => {
      res.push(p.x);
      res.push(p.y);
    });

    return res;
  }

  private getCrossShapePoints(intersection: Point): Point[] {
    const res: Point[] = [];
    const size = 5;

    res.push(new Point(intersection.x - size, intersection.y - size));
    res.push(new Point(intersection.x + size, intersection.y + size));
    res.push(new Point(intersection.x - size, intersection.y + size));
    res.push(new Point(intersection.x + size, intersection.y - size));

    return res;
  }

  private drawIntersections(host: SVG.G) {
    this.intersections.forEach((intersection: Point) => {
      const ps = this.getCrossShapePoints(intersection);

      this.svgIntersections.push(
        host.path(
          'M' + ' ' + ps[0].x + ' ' + ps[0].y + ' ' + ps[1].x + ' ' + ps[1].y + ' ' +
          'M' + ' ' + ps[2].x + ' ' + ps[2].y + ' ' + ps[3].x + ' ' + ps[3].y
        ).addClass('intersection-point')
      );
    });
  }

  private removeIntersectionShapes() {
    this.svgIntersections.forEach((svgIntersection: SVG.Path) => {
      svgIntersection.remove();
    });
  }

  public connectWithOutputOf(element: GraphicElement): ConnectorLine {
    const outHookElem = element.getOutHook();
    const intersection = this.findIntersections(outHookElem)[0];
    this.intersections.push(intersection);

    return new ConnectorLine(
      new HookPoint(outHookElem.coord, outHookElem.position),
      new HookPoint(intersection, outHookElem.getOppositePosition())
    );
  }

  public connectWithInputOf(element: GraphicElement): ConnectorLine {
    const inHookElem = element.getInHook();
    const intersection = this.findIntersections(inHookElem)[0];
    this.intersections.push(intersection);

    return new ConnectorLine(
      new HookPoint(intersection, inHookElem.getOppositePosition()),
      new HookPoint(inHookElem.coord, inHookElem.position)
    );
  }

  private findIntersections(outPoint: HookPoint): Point[] {

    const segments = this.takeSegment();
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

  private takeSegment(): Point[][] {
    const lines: Point[][] = [];

    // take segment between the points
    const max = this.points.length % 2 === 0 ? this.points.length : this.points.length - 1;
    for (let i = 0; i < max - 1; i++) {
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


  private computeIntersection(outPoint: Point, segStart: Point, segEnd: Point): Point {

    // intersection with horizontal
    if (segEnd.y - segStart.y === 0) {
      console.log('No intersection with horizontal line');
    } else {
      const interX = (outPoint.y - segStart.y) / (segEnd.y - segStart.y) * (segEnd.x - segStart.x) + segStart.x;
      const interY = outPoint.y;

      return new Point(interX, interY);
    }

    // intersection with vertical
    if (segEnd.x - segStart.y === 0) {
      console.log('No intersection with vertical line');
    } else {
      const interX = outPoint.x;
      const interY = (outPoint.x - segStart.x) / (segEnd.x - segStart.x) * (segEnd.y - segStart.y) + segStart.y;

      return new Point(interX, interY);
    }

    return null;
  }

}
