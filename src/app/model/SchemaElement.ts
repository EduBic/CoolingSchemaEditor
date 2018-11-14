import * as SVG from 'svg.js';
import { Point } from './Point';
import { InOut, HangPosition } from './InOut';

export abstract class SchemaElement {
  protected readonly origin: Point;
  protected readonly inOutList: InOut[] = [];

  constructor(origin: Point, ...inOut: InOut[]) {
    this.origin = origin;
    this.inOutList = inOut;
  }

  abstract draw(host: SVG.G): void;

  public getInCoordinates(index?: number): Point {
    if (index) {
      return this.inOutList[index].inCoordinate;
    }
    return this.inOutList[0].inCoordinate;
  }

  public getOutCoordinates(index?: number): Point {
    console.log('From getOutCoordinate', this.inOutList);
    if (index) {
      return this.inOutList[index].outCoordinate;
    }
    return this.inOutList[0].outCoordinate;
  }

  public getOutHangPosition(index?: number): HangPosition {
    if (index) {
      return this.inOutList[index].outPosition;
    }
    return this.inOutList[0].outPosition;
  }

  public getInHangPosition(index?: number): HangPosition {
    if (index) {
      return this.inOutList[index].inPosition;
    }
    return this.inOutList[0].inPosition;
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
