import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { Point } from './Point';

/**
 * SchemaGroup define the base class for SchemaElement that contains other
 * SchemaElement and has a relative origin respected by all children
 * SchemaElment. Extend this class when you need a complex SchemaElement.
 */
export abstract class SchemaGroup extends SchemaElement {

  protected children: SchemaElement[] = [];

  public addChild(child: SchemaElement): SchemaGroup {
    this.children.push(child);
    return this;
  }

  public addChildren(children: SchemaElement[]): SchemaGroup {
    children.forEach(newChild => {
      this.children.push(newChild);
    });
    return this;
  }

  public drawChildren(svg: SVG.G) {
    this.children.forEach(child => {
      child.draw(svg);
    });
  }

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
    // console.log('From getOutCoordinate', this.inOutList);
    if (index) {
      return this.inOutList[index].outCoordinate;
    }
    return this.inOutList[0].outCoordinate;
  }

}
