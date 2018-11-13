import { Point } from './Point';

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
        {
          x: mx,
          y: m1y
        },
        {
          x: mx,
          y: m2y
        }
      ];
    }

    // vertical case
    if (Math.abs(startPoint.x - endPoint.x) < Math.abs(startPoint.y - endPoint.y)) {

      const m1x = startPoint.x;
      const m2x = endPoint.x;
      const my = Math.min(startPoint.y, endPoint.y) + Math.abs(startPoint.y - endPoint.y) / 2;

      return [{
          x: m1x,
          y: my
        },
        {
          x: m2x,
          y: my
        }
      ];
    }

  }

}
