import { Point } from '../../../core/Point';

export class TriangleDrawer {

  public static getTrianglePointsIntoCircle(radius: number): number[] {

    const halfAngleT = 60 * Math.PI / 180 / 2; // radian
    const sideT = radius * Math.sqrt(3);
    const heightT = sideT * Math.cos(halfAngleT);
    const halfBaseT = sideT * Math.sin(halfAngleT);

    // console.log('radius', this.radius);
    // console.log('half angle', halfAngleT);
    // console.log('side', sideT);
    // console.log('h', heightT);
    // console.log('B/2', halfBaseT);
    return [
      radius - halfBaseT, heightT,
      radius, 0,
      radius + halfBaseT, heightT
    ];
  }

  public static upTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // Points from top to right to left
    return [
      hookRelCoord.x, hookRelCoord.y - H,
      hookRelCoord.x + halfSide, hookRelCoord.y + h,
      hookRelCoord.x - halfSide, hookRelCoord.y + h
    ];
  }

  public static downTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // From right to bottom to left
    return [
      hookRelCoord.x + halfSide, hookRelCoord.y - h,
      hookRelCoord.x, hookRelCoord.y + H,
      hookRelCoord.x - halfSide, hookRelCoord.y - h
    ];
  }

  public static rightTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // From top to right to bottom
    return [
      hookRelCoord.x - h, hookRelCoord.y - halfSide,
      hookRelCoord.x + H, hookRelCoord.y,
      hookRelCoord.x - h, hookRelCoord.y + halfSide
    ];
  }

  public static leftTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // From top to bottom to left
    return [
      hookRelCoord.x + h, hookRelCoord.y - halfSide,
      hookRelCoord.x + h, hookRelCoord.y + halfSide,
      hookRelCoord.x - H, hookRelCoord.y
    ];
  }

}
