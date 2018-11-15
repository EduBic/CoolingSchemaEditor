import * as SVG from 'svg.js';
import { GraphicElement } from './GraphicElement';
import { Point } from './Point';
import { LineDrawer } from './LineDrawer';

/**
 * SchemaGroup define the Sandbox base class for SchemaElement that contains
 * other SchemaElement and has a relative origin respected by all children
 * SchemaElment. Extend this class when you need a complex SchemaElement.
 */
export abstract class GraphicGroup extends GraphicElement {

  private children: GraphicElement[] = [];
  protected svgGroup: SVG.G;

  public draw(host: SVG.G) {
    // console.log('GraphicGroup draw()');

    this.svgGroup = host.group()
      .move(this.origin.x, this.origin.y);

    this.drawChildren(this.svgGroup);

    this.drawConnectChildrenTo();

    this.drawInputPoint(this.svgGroup);
    this.drawOutputPoint(this.svgGroup);
  }

  public addChild(child: GraphicElement): GraphicGroup {
    this.children.push(child);
    return this;
  }

  public addChildren(children: GraphicElement[]): GraphicGroup {
    children.forEach(newChild => {
      this.children.push(newChild);
    });
    return this;
  }

  public getChildrenSize(): number {
    return this.children.length;
  }

  private drawChildren(svg: SVG.G) {
    this.children.forEach(child => {
      child.draw(svg);
    });
  }

  protected drawConnectChildrenTo() {
    console.log('Draw standard Connection with children');
    this.children.forEach(child => {

      this.drawPolyline(LineDrawer.createLinePoints(
          child.getOutHook(), this.getInHook()));

      this.drawPolyline(LineDrawer.createLinePoints(
        this.getOutHook(), child.getInHook()));
    });
  }

  protected drawPolyline(points: Point[]) {
    const nums: number[] = [];

    points.forEach(p => {
      nums.push(p.x);
      nums.push(p.y);
    });

    this.svgGroup.polyline(nums)
      .attr('fill', 'none')
      .attr('stroke', '#0077be');
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
