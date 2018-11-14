import { SchemaElement } from './SchemaElement';
import { Point } from './Point';

export abstract class SchemaGroup extends SchemaElement {

  public getOutCoordinates(index?: number): Point {
    if (index) {
      return new Point(
        this.inOutList[index].outCoordinate.x + this.origin.x,
        this.inOutList[index].outCoordinate.y + this.origin.y
      );
    }

    return new Point(
      this.inOutList[0].outCoordinate.x + this.origin.x,
      this.inOutList[0].outCoordinate.y + this.origin.y
    );
  }

  public getInCoordinates(index?: number): Point {
    console.log('Call override');
    if (index) {
      return new Point(
        this.inOutList[index].inCoordinate.x + this.origin.x,
        this.inOutList[index].inCoordinate.y + this.origin.y
      );
    }

    return new Point(
      this.inOutList[0].inCoordinate.x + this.origin.x,
      this.inOutList[0].inCoordinate.y + this.origin.y
    );
  }

  public getInRelativeCoordinates(index?: number): Point {
    if (index) {
      return this.inOutList[index].inCoordinate;
    }
    return this.inOutList[0].inCoordinate;
  }

  public getOutRelativeCoordinates(index?: number): Point {
    console.log('From getOutCoordinate', this.inOutList);
    if (index) {
      return this.inOutList[index].outCoordinate;
    }
    return this.inOutList[0].outCoordinate;
  }

}
