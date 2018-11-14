import { Point } from './Point';
import { HookPosition } from './HookPosition';
import { HookPoint } from './HookPoint';

export class LineDrawer {

  private static readonly DEBUG = false;


  public static createLinePoints(_out: HookPoint, _in: HookPoint): Point[] {

    const outPoint: Point = _out.coord,
          outPos: HookPosition = _out.position,
          inPoint: Point = _in.coord,
          inPos: HookPosition = _in.position;

    const distanceY = 5;
    const distanceX = 5;

    if (LineDrawer.DEBUG) {
      console.log(outPos + ' -> ');
    }
    switch (outPos) {
      case HookPosition.Top:
        return LineDrawer.getOutTopPoints(outPoint, inPoint, inPos, distanceX, distanceY);
      case HookPosition.Right:
        return LineDrawer.getOutRightPoints(outPoint, inPoint, inPos, distanceX, distanceY);
      case HookPosition.Bottom:
        return LineDrawer.getOutBottomPoints(outPoint, inPoint, inPos, distanceX, distanceY);
      case HookPosition.Left:
        return LineDrawer.getOutLeftPoints(outPoint, inPoint, inPos, distanceX, distanceY);
    }
  }

  private static getOutTopPoints(outPoint: Point, inPoint: Point, inPos: HookPosition, distanceX: number, distanceY: number): Point[] {

    const points: Point[] = [];
    points.push(outPoint);

    if (LineDrawer.DEBUG) {
      console.log(inPos);
    }

    switch (inPos) {
      case HookPosition.Top: {
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
      case HookPosition.Right: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y - distanceY);
          const m3 = new Point(inPoint.x + distanceX, inPoint.y);
          const m2 = new Point(m3.x, m1.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {

          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

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
      case HookPosition.Bottom: {
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
      case HookPosition.Left: {
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

  private static getOutBottomPoints(outPoint: Point, inPoint: Point, inPos: HookPosition, distanceX: number, distanceY: number): Point[] {
    const points: Point[] = [];
    points.push(outPoint);

    if (LineDrawer.DEBUG) {
      console.log(inPos);
      // console.log('Points Out/In', outPoint, inPoint);
    }

    switch (inPos) {
      case HookPosition.Top: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isTopLeftOf(outPoint)) {
          // S shape vertical

          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m2 = new Point(halfX, m1.y);
          const m3 = new Point(halfX, inPoint.y - distanceY);
          const m4 = new Point(inPoint.x, m3.y);
          points.push(m1, m2, m3, m4);

        } else if (inPoint.isBottomRightOf(outPoint) || inPoint.isBottomLeftOf(outPoint)) {

          const halfY = LineDrawer.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x, halfY);
          const m2 = new Point(inPoint.x, halfY);
          points.push(m1, m2);

        }
        break;
      }
      case HookPosition.Right: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m3 = new Point(inPoint.x + distanceX, inPoint.y);
          const m2 = new Point(m3.x, m1.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        } else if (inPoint.isTopLeftOf(outPoint)) {

          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m2 = new Point(halfX, m1.y);
          const m3 = new Point(halfX, inPoint.y);
          points.push(m1, m2, m3);

        }

        break;
      }
      case HookPosition.Bottom: {
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
      case HookPosition.Left: {
        if (inPoint.isTopRightOf(outPoint) ||
            inPoint.isBottomLeftOf(outPoint) ||
            inPoint.isTopLeftOf(outPoint)) {

          const m1 = new Point(outPoint.x, outPoint.y + distanceY);
          const m3 = new Point(inPoint.x - distanceX, inPoint.y);
          const m2 = new Point(m3.x, m1.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomRightOf(outPoint)) {
          // L shape
          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        }
        break;
      }
    }

    points.push(inPoint);
    return points;
  }

  private static getOutRightPoints(outPoint: Point, inPoint: Point, inPos: HookPosition, distanceX: number, distanceY: number): Point[] {
    const points: Point[] = [];
    points.push(outPoint);

    if (LineDrawer.DEBUG) {
      console.log(inPos);
    }

    switch (inPos) {
      case HookPosition.Top: {
        if (inPoint.isTopRightOf(outPoint)) {
          // G shape
          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

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
          const halfY = LineDrawer.getHalfY(outPoint, inPoint);

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
      case HookPosition.Right: {
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
      case HookPosition.Bottom: {
        if (inPoint.isTopRightOf(outPoint)) {
          // L shape
          const m1 = new Point(outPoint.x, inPoint.y);
          points.push(m1);

        } else if (inPoint.isBottomRightOf(outPoint)) {
          // G shape
          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

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
          const halfY = LineDrawer.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x + distanceX, outPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(inPoint.x, halfY);
          points.push(m1, m2, m3);
        }
        break;
      }
      case HookPosition.Left: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {
          // Z shape
          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.x);
          const m2 = new Point(halfX, inPoint.x);
          points.push(m1, m2);

        } else if (inPoint.isBottomLeftOf(outPoint) || inPoint.isTopLeftOf(outPoint)) {
          // S shape
          const halfY = LineDrawer.getHalfY(outPoint, inPoint);

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

  private static getOutLeftPoints(outPoint: Point, inPoint: Point, inPos: HookPosition, distanceX: number, distanceY: number): Point[] {
    const points: Point[] = [];
    points.push(outPoint);

    if (LineDrawer.DEBUG) {
      console.log(inPos);
    }
    // console.log('Points Out/In', outPoint, inPoint);

    switch (inPos) {
      case HookPosition.Top: {
        if (inPoint.isTopRightOf(outPoint)) {
          // C shape

          const m1 = new Point(outPoint.x - distanceX, outPoint.y);
          const m2 = new Point(m1.x, Math.min(outPoint.y, inPoint.y) - distanceY);
          const m3 = new Point(inPoint.x, m2.y);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomRightOf(outPoint)) {
          // G shape horizontal
          const halfY = LineDrawer.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x - distanceX, outPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(inPoint.x, halfY);
          points.push(m1, m2, m3);

        } else if (inPoint.isBottomLeftOf(outPoint)) {
          // L shape
          const m1 = new Point(inPoint.x, outPoint.y);
          points.push(m1);

        } else if (inPoint.isTopLeftOf(outPoint)) {
          // G shape vertical
          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.y);
          const m2 = new Point(halfX, inPoint.y - distanceY);
          const m3 = new Point(inPoint.x, m2.y);
          points.push(m1, m2, m3);
        }
        break;
      }
      case HookPosition.Right: {
        if (inPoint.isTopRightOf(outPoint) || inPoint.isBottomRightOf(outPoint)) {
          // S shape horizontal
          const halfY = LineDrawer.getHalfY(outPoint, inPoint);

          const m1 = new Point(outPoint.x - distanceX, outPoint.y);
          const m4 = new Point(inPoint.x + distanceX, inPoint.y);
          const m2 = new Point(m1.x, halfY);
          const m3 = new Point(m4.x, halfY);
          points.push(m1, m2, m3, m4);

        } else if (inPoint.isBottomLeftOf(outPoint) || inPoint.isTopLeftOf(outPoint)) {
          // Z shape
          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

          const m1 = new Point(halfX, outPoint.y);
          const m2 = new Point(halfX, inPoint.y);
          points.push(m1, m2);

        }
        break;
      }
      case HookPosition.Bottom: {
        if (inPoint.isTopRightOf(outPoint)) {
          // G shape horizontal
          const halfY = LineDrawer.getHalfY(outPoint, inPoint);

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
          const halfX = LineDrawer.getHalfX(outPoint, inPoint);

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
      case HookPosition.Left: {
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


}
