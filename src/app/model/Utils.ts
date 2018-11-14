import * as SVG from 'svg.js';
import { Point } from './Point';
import { InOut, HangPosition } from './InOut';
import { Input } from '@angular/core';

export class Utils {

  public static EXAMPLE_END_POINTS = [
    { x: 300 + 200, y: 300 + 50 },
    { x: 300 + 200, y: 300 - 50 },
    { x: 300 - 200, y: 300 + 50 },
    { x: 300 - 200, y: 300 - 50 },
    { x: 300 + 50, y: 300 + 200 },
    { x: 300 + 50, y: 300 - 200 },
    { x: 300 - 50, y: 300 + 200 },
    { x: 300 - 50, y: 300 - 200 },
  ];

  public static computeElbow(startPoint: Point, endPoint: Point): Point[] {
    const log = console.log;

    // horizontal case
    if (Math.abs(startPoint.x - endPoint.x) >= Math.abs(startPoint.y - endPoint.y)) {
      log('Horizontal');

      const m1y = startPoint.y;
      const m2y = endPoint.y;
      const mx = Math.min(startPoint.x, endPoint.x) + Math.abs(startPoint.x - endPoint.x) / 2;

      return [
        new Point(mx, m1y),
        new Point(mx, m2y)
      ];
    }

    // vertical case
    if (Math.abs(startPoint.x - endPoint.x) < Math.abs(startPoint.y - endPoint.y)) {

      const m1x = startPoint.x;
      const m2x = endPoint.x;
      const my = Math.min(startPoint.y, endPoint.y) + Math.abs(startPoint.y - endPoint.y) / 2;

      return [
        new Point(m1x, my),
        new Point(m2x, my)
      ];
    }
  }

  public static drawDirectPolyline(start: Point, end: Point, svg: SVG.G) {
    let middle: Point;

    if (start.y < end.y && start.x >= end.x) {
      // middle point is left top
      middle = new Point(Math.min(start.x, end.x), Math.min(start.y, end.y));
    } else if (start.y < end.y && start.x < end.x) {
      // middle point is left bottom
      middle = new Point(Math.min(start.x, end.x), Math.max(start.y, end.y));
    } else if (start.y >= end.y && start.x >= end.x) {
      // middle point is right top
      middle = new Point(Math.max(start.x, end.x), Math.min(start.y, end.y));
    } else if (start.y >= end.y && start.x < end.x) {
      // middle point is right bottom
      middle = new Point(Math.max(start.x, end.x), Math.max(start.y, end.y));
    }

    svg.polyline([
      start.x, start.y,
      middle.x, middle.y,
      end.x, end.y
    ]).attr('fill', 'none')
    .attr('stroke', 'blue');
  }

  public static drawSingleElbowPolyline(_out: InOut, _in: InOut, svg: SVG.G) {
    // N.B. the flow is: out -> in
    const log = console.log;
    const inPoint = _in.inCoordinate;
    const inPos = _in.inPosition;
    const outPoint = _out.outCoordinate;
    const outPos = _out.outPosition;

    log('drawSingleElbow', outPos, '->', inPos);

    if (inPoint.x < outPoint.x && inPoint.y < outPoint.y) {
      // output right bottom
      log('Output bottom right', inPos, outPos);
      if (inPos === HangPosition.Bottom && outPos === HangPosition.Left) { // L shape
        const middle = new Point(Math.min(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      } else if (inPos === HangPosition.Bottom && outPos === HangPosition.Top) {
        Utils.drawElbowPolyline(inPoint, outPoint, svg);
      }

    } else if (inPoint.x > outPoint.x && inPoint.y < outPoint.y) {
      // output left bottom
      log('output bottom left');
      if (inPos === HangPosition.Bottom && outPos === HangPosition.Right) {

        const middle = new Point(Math.max(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      } else if (outPos === HangPosition.Top && inPos === HangPosition.Bottom) {
        Utils.drawElbowPolyline(inPoint, outPoint, svg);
      }


    } else if (inPoint.x > outPoint.x && inPoint.y > outPoint.y) {
      // output left top
      log('output top left');
      if (outPos === HangPosition.Bottom && inPos === HangPosition.Left) {
        const middle = new Point(Math.min(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      }

    } else if (inPoint.x < outPoint.x && inPoint.y > outPoint.y) {
      // output right top
      log('output top right');
      if (inPos === HangPosition.Left && outPos === HangPosition.Top) {
        const middle = new Point(Math.min(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      }
    }
  }


  public static drawElbowPolyline(start: Point, end: Point, svg: SVG.G) {
    // important to maintaine the start and end point
    const points = Utils.computeElbow(start, end);

    svg.polyline([
      start.x, start.y,
      points[0].x, points[0].y,
      points[1].x, points[1].y,
      end.x, end.y
    ]).attr('fill', 'none')
      .attr('stroke', 'blue');
  }


  public static drawMyLine(outPoint: Point, outPos: HangPosition, inPoint: Point, inPos: HangPosition, svg: SVG.G) {
    const log = console.log;

    const distanceY = 5;
    const distanceX = 5;

    log(outPos + ' -> ');
    switch (outPos) {
      case HangPosition.Top:
        Utils.drawLine(svg, Utils.getOutTopPoints(outPoint, inPoint, inPos, distanceX, distanceY));
        break;
      case HangPosition.Right:
        Utils.drawLine(svg, Utils.getOutRightPoints(outPoint, inPoint, inPos, distanceX, distanceY));
        break;
      case HangPosition.Bottom:
        Utils.drawLine(svg, Utils.getOutBottomPoints(outPoint, inPoint, inPos, distanceX, distanceY));
        break;
      case HangPosition.Left:
        Utils.drawLine(svg, Utils.getOutLeftPoints(outPoint, inPoint, inPos, distanceX, distanceY));
        break;
    }
  }

  private static getOutTopPoints(outPoint: Point, inPoint: Point, inPos: HangPosition, distanceX: number, distanceY: number): Point[] {

    const points: Point[] = [];
    points.push(outPoint);

    console.log(inPos);

    switch (inPos) {
      case HangPosition.Top: {
        if (inPoint.isTopRightOf(outPoint) ||
            inPoint.isTopLeftOf(outPoint) ||
            inPoint.isBottomRightOf(outPoint) ||
            inPoint.isBottomLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, Math.min(outPoint.y, inPoint.y) - distanceY);
          const m2 = new Point(inPoint.x, m1.y);
          points.push(m1, m2);

        }
        break;
      }
      case HangPosition.Right: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y - distanceY);
          const m3 = new Point(inPoint.x + distanceX, inPoint.y);
          const m2 = new Point(m3.x, m1.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {

          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(outPoint.x, outPoint.y - distanceY);
          const m2 = new Point(halfX, m1.y);
          const m3 = new Point(halfX, inPoint.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isTopLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        }
        break;
      }
      case HangPosition.Bottom: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isTopLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y - distanceY);
          const m2 = new Point(inPoint.x, m1.y);

          points.push(m1, m2);

        } else if (inPoint.isBottomRightOf(outPoint) || inPoint.isBottomLeftOf(outPoint)) {

          const halfX = Math.min(inPoint.x, outPoint.x) + Math.abs(outPoint.x - inPoint.x) / 2;

          const m1 = new Point(outPoint.x, outPoint.y - distanceY);
          const m4 = new Point(inPoint.x, inPoint.y + distanceY);
          const m2 = new Point(halfX, m1.y);
          const m3 = new Point(halfX, m4.y);

          points.push(m1, m2, m3, m4);
        }
        break;
      }
      case HangPosition.Left: {
        if (inPoint.isTopRightOf(outPoint)) {

          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        } else if (inPoint.isBottomRightOf(outPoint) ||
                  inPoint.isBottomLeftOf(outPoint) ||
                  inPoint.isTopLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y - distanceY);
          const m3 = new Point(inPoint.x - distanceX, inPoint.y);
          const m2 = new Point(m3.x, m1.y);
          points.push(m1, m2, m3);

        }
        break;
      }
    }

    points.push(inPoint);
    return points;
  }

  private static getOutBottomPoints(outPoint: Point, inPoint: Point, inPos: HangPosition, distanceX: number, distanceY: number): Point[] {
    const points: Point[] = [];
    points.push(outPoint);

    console.log(inPos);

    switch (inPos) {
      case HangPosition.Top: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isTopLeftOf(outPoint)) {

          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m4 = new Point(inPoint.x, inPoint.y - distanceY);
          const m2 = new Point(halfX , m1.y);
          const m3 = new Point(halfX, m4.y);
          points.push(m1, m2, m3, m4);

        } else if (inPoint.isBottomRightOf(outPoint) || inPoint.isBottomLeftOf(outPoint)) {

          const halfY = Utils.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x, halfY);
          const m2 = new Point(inPoint.x, halfY);
          points.push(m1, m2);

        }
        break;
      }
      case HangPosition.Right: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m3 = new Point(inPoint.x + distanceX, inPoint.y);
          const m2 = new Point(m3.x, m1.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        } else if (inPoint.isTopLeftOf(outPoint)) {

          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m2 = new Point(halfX, m1.y);
          const m3 = new Point(halfX, inPoint.y);
          points.push(m1, m2, m3);

        }

        break;
      }
      case HangPosition.Bottom: {
        // TODO: can remove this if
        if (inPoint.isTopRightOf(outPoint) ||
            inPoint.isBottomRightOf(outPoint) ||
            inPoint.isBottomLeftOf(outPoint) ||
            inPoint.isTopLeftOf(outPoint)) {
          // U shape
          const m1 = new Point(outPoint.x, Math.max(outPoint.y, inPoint.y) + distanceY);
          const m2 = new Point(inPoint.x, m1.y);
          points.push(m1, m2);
        }
        break;
      }
      case HangPosition.Left: {
        if (inPoint.isTopRightOf(outPoint) ||
            inPoint.isBottomLeftOf(outPoint) ||
            inPoint.isTopLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m3 = new Point(inPoint.x - distanceX, inPoint.y);
          const m2 = new Point(m3.x, m1.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomRightOf(outPoint)) {

          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        }
        break;
      }
    }

    points.push(inPoint);
    return points;
  }

  private static getOutRightPoints(outPoint: Point, inPoint: Point, inPos: HangPosition, distanceX: number, distanceY: number): Point[] {
    const points: Point[] = [];
    points.push(outPoint);

    console.log(inPos);

    switch (inPos) {
      case HangPosition.Top: {
        if (inPoint.isTopRightOf(outPoint)) {
          // G shape
          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.y);
          const m3 = new Point(inPoint.x, inPoint.y - distanceY);
          const m2 = new Point(halfX, m3.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomRightOf(outPoint)) {
          // L shape
          const m1 = new Point(inPoint.x, outPoint.y);
          points.push(m1);

        } else if (inPoint.isBottomLeftOf(outPoint)) {
          // G shape
          const halfY = Utils.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x + distanceX, outPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(inPoint.x, halfY);
          points.push(m1, m2, m3);

        } else if (inPoint.isTopLeftOf(outPoint)) {
          // C shape
          const m1 = new Point(outPoint.x + distanceX, outPoint.y);
          const m3 = new Point(inPoint.x, inPoint.y - distanceY);
          const m2 = new Point(m1.x, m3.y);
          points.push(m1, m2, m3);
        }
        break;
      }
      case HangPosition.Right: {
        if (inPoint.isTopRightOf(outPoint) ||
            inPoint.isBottomRightOf(outPoint) ||
            inPoint.isBottomLeftOf(outPoint) ||
            inPoint.isTopLeftOf(outPoint)) {
          // U shape
          const m1 = new Point(Math.max(outPoint.x, inPoint.x) + distanceX, outPoint.y);
          const m2 = new Point(m1.x, inPoint.y);
          points.push(m1, m2);
        }
        break;
      }
      case HangPosition.Bottom: {
        if (inPoint.isTopRightOf(outPoint)) {
          // L shape
          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        } else if (inPoint.isBottomRightOf(outPoint)) {
          // G shape
          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.y);
          const m3 = new Point(inPoint.x, inPoint.y + distanceY);
          const m2 = new Point(halfX, m3.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {
          // C shape
          const m1 = new Point(outPoint.x + distanceX, outPoint.y);
          const m3 = new Point(inPoint.x, inPoint.y + distanceY);
          const m2 = new Point(m1.x, m3.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isTopLeftOf(outPoint)) {
          // G shape
          const halfY = Utils.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x + distanceX, outPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(inPoint.x, halfY);
          points.push(m1, m2, m3);
        }
        break;
      }
      case HangPosition.Left: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {
          // Z shape
          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.x);
          const m2 = new Point(halfX, inPoint.x);
          points.push(m1, m2);

        } else if (inPoint.isBottomLeftOf(outPoint) || inPoint.isTopLeftOf(outPoint)) {
          // S shape
          const halfY = Utils.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x + distanceX, outPoint.y);
          const m4 = new Point(inPoint.x - distanceX, inPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(m4.x, halfY);
          points.push(m1, m2, m3, m4);
        }
        break;
      }
    }

    points.push(inPoint);
    return points;
  }

  private static getOutLeftPoints(outPoint: Point, inPoint: Point, inPos: HangPosition, distanceX: number, distanceY: number): Point[] {
    const points: Point[] = [];
    points.push(outPoint);

    console.log(inPos);

    switch (inPos) {
      case HangPosition.Top: {
        if (inPoint.isTopRightOf(outPoint)) {
          // C shape

          const m1 = new Point(outPoint.x - distanceX, outPoint.y);
          const m2 = new Point(m1.x, Math.min(outPoint.y, inPoint.y) - distanceY);
          const m3 = new Point(inPoint.x, m2.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomRightOf(outPoint)) {
          // G shape horizontal
          const halfY = Utils.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x - distanceX, outPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(inPoint.x, halfY);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {
          // L shape
          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        } else if (inPoint.isTopLeftOf(outPoint)) {
          // G shape vertical
          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.y);
          const m2 = new Point(halfX, inPoint.y - distanceY);
          const m3 = new Point(inPoint.x, m2.y);
          points.push(m1, m2, m3);
        }
        break;
      }
      case HangPosition.Right: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {
          // S shape horizontal
          const halfY = Utils.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x - distanceX, outPoint.y);
          const m4 = new Point(inPoint.x + distanceX, inPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(m4.x, halfY);
          points.push(m1, m2, m3, m4);

        } else if (inPoint.isBottomLeftOf(outPoint) || inPoint.isTopLeftOf(outPoint)) {
          // Z shape
          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.y);
          const m2 = new Point(halfX, inPoint.y);
          points.push(m1, m2);

        }
        break;
      }
      case HangPosition.Bottom: {
        if (inPoint.isTopRightOf(outPoint)) {
          // G shape horizontal
          const halfY = Utils.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x - distanceX, outPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(inPoint.x, halfY);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomRightOf(outPoint)) {
          // C shape
          const m1 = new Point(outPoint.x - distanceX, inPoint.y);
          const m2 = new Point(m1.x, inPoint.y + distanceY);
          const m3 = new Point(inPoint.x, m2.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {
          // G shape vertical
          const halfX = Utils.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.y);
          const m2 = new Point(halfX, inPoint.y + distanceY);
          const m3 = new Point(inPoint.x, m2.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isTopLeftOf(outPoint)) {
          // L shape
          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);
        }
        break;
      }
      case HangPosition.Left: {
        if (inPoint.isTopRightOf(outPoint) ||
            inPoint.isBottomRightOf(outPoint) ||
            inPoint.isBottomLeftOf(outPoint) ||
            inPoint.isTopLeftOf(outPoint)) {
          // U shape
          const m1 = new Point(Math.min(outPoint.x, inPoint.x) - distanceX, outPoint.y);
          const m2 = new Point(m1.x, inPoint.y);
          points.push(m1, m2);
        }
        break;
      }
    }

    points.push(inPoint);
    return points;
  }

  private static getHalfY(outPoint: Point, inPoint: Point) {
    return Math.min(outPoint.y, inPoint.y) + Math.abs(outPoint.y - inPoint.y) / 2;
  }

  private static getHalfX(outPoint: Point, inPoint: Point) {
    return Math.min(outPoint.x, inPoint.x) + Math.abs(outPoint.x - inPoint.x) / 2;
  }

  private static drawLine(svg: SVG.G, points: Point[]) {
    const nums: number[] = [];

    points.forEach(p => {
      nums.push(p.x);
      nums.push(p.y);
    });

    svg.polyline(nums)
      .attr('fill', 'none')
      .attr('stroke', 'salmon');
  }


}
