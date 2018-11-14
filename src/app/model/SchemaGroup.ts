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

  protected getInRelativeCoordinates(index: number = 0): Point {
    // console.log('From getInRelativeCoordinate', this.inOutList[index]);
    return new Point(
      this.inOutList[index].getInCoordinate().x - this.origin.x,
      this.inOutList[index].getInCoordinate().y - this.origin.y
    );
  }

  protected getOutRelativeCoordinates(index: number = 0): Point {
    // console.log('From getOutRelativeCoordinate', this.inOutList[index]);
    return new Point(
      this.inOutList[index].getOutCoordinate().x - this.origin.x,
      this.inOutList[index].getOutCoordinate().y - this.origin.y
    );
  }

  // override
  public drawInputPoint(host: SVG.G) {
    this.inOutList.forEach(inOut => {
      inOut.drawInputPoint(host, this.origin);
    });
  }

  // override
  public drawOutputPoint(host: SVG.G) {
    this.inOutList.forEach(inOut => {
      inOut.drawOutputPoint(host, this.origin);
    });
  }

}
