import * as SVG from 'svg.js';
import { Point } from './Point';
import { InOut } from './InOut';

export abstract class SchemaElement {
  protected readonly origin: Point;
  protected readonly inOutList: InOut[] = [];

  constructor(origin: Point, ...inOut: InOut[]) {
    this.origin = origin;
    this.inOutList = inOut;
  }

  abstract draw(host: SVG.G): void;

  public getInCoordinates(index: number): Point {
    return this.inOutList[index].inCoordinate;
  }

  public getOutCoordinates(index: number): Point {
    return this.inOutList[index].outCoordinate;
  }

  public drawInputPoint(host: SVG.G) {
    this.inOutList.forEach(inOut => {
      inOut.drawInputPoint(host);
    });
  }

  public drawOutputPoint(host: SVG.G) {
    this.inOutList.forEach(inOut => {
      inOut.drawOutputPoint(host);
    });
  }

  public removePoints() {
    this.inOutList.forEach(inOut => {
      inOut.removePoints();
    });
  }
}
