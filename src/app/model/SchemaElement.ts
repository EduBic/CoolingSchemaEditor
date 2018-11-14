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
    // console.log('From getInCoordinate', this.inOutList);
    return this.inOutList[index].inCoordinate;
  }

  public getOutCoordinates(index: number): Point {
    // console.log('From getOutCoordinate', this.inOutList);
    return this.inOutList[index].outCoordinate;
  }

  public getAbsoluteOutCoordinates(index: number): Point {
    return new Point(
      this.inOutList[index].outCoordinate.x + this.origin.x,
      this.inOutList[index].outCoordinate.y + this.origin.y
    );
  }

  public getAbsoluteInCoordinates(index: number): Point {
    return new Point(
      this.inOutList[index].inCoordinate.x + this.origin.x,
      this.inOutList[index].inCoordinate.y + this.origin.y
    );
  }

  public getInOut(index: number): InOut {
    console.log('InOut', this.inOutList);
    return this.inOutList[index];
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
