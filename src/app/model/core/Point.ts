export class Point {
  public readonly x: number;
  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public isTopRightOf(point: Point): boolean {
    return this.x >= point.x && this.y <= point.y;
  }

  public isBottomRightOf(point: Point): boolean {
    return this.x >= point.x && this.y >= point.y;
  }

  public isBottomLeftOf(point: Point): boolean {
    return this.x <= point.x && this.y >= point.y;
  }

  public isTopLeftOf(point: Point): boolean {
    return this.x <= point.x && this.y <= point.y;
  }
}
