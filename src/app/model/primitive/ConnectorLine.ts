import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { HookPoint } from '../core/HookPoint';
import { LineDrawer } from '../core/LineDrawer';
import { GraphicSingle } from '../core/GraphicSingle';
import { InOut, Direction } from '../core/InOut';
import { GraphicElement } from '../core/GraphicElement';
import { HookPosition } from '../core/HookPosition';

export class ConnectorLine extends GraphicSingle {

  private points: Point[] = [];

  constructor(start: HookPoint, end: HookPoint) {
    super(new Point(0, 0),
      ConnectorLine.getDirection(start.position, end.position),
      InOut.createFromHooks(start, end)
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

  public static connect(thisElement: GraphicElement, thisIndex: number,
    otherElement, otherIndex: number): ConnectorLine {

    return new ConnectorLine(
      thisElement.getOutHook(thisIndex),
      otherElement.getInHook(otherIndex)
    );
  }

  draw(host: SVG.G): void {

    this.svgElement = host.polyline(this.flatPoints())
      .attr('fill', 'none')
      .attr('class', 'connector-line');

    this.svgElement.on('mouseover', (e) => {
      this.drawInputPoint(host);
      this.drawOutputPoint(host);
    });

    this.svgElement.on('mouseleave', (e) => {
      this.removePoints();
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

}
