import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { HookPoint } from '../core/HookPoint';
import { LineDrawer } from '../core/LineDrawer';
import { GraphicSingle } from '../core/GraphicSingle';
import { InOut } from '../core/InOut';
import { GraphicElement } from '../core/GraphicElement';

export class ConnectorLine extends GraphicSingle {

  constructor(start: HookPoint, end: HookPoint) {
    super(new Point(0, 0), InOut.createFromHooks(start, end));
    this.points = LineDrawer.createLinePoints(start, end);
  }

  private points: Point[] = [];

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
