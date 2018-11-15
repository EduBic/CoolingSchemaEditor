import * as SVG from 'svg.js';
import { GraphicSingleElement } from './GraphicSingleElement';
import { Point } from './Point';
import { LineDrawer } from './LineDrawer';
import { HookPoint } from './HookPoint';
import { LinkPair, LinkHook } from './Link';
import { GraphicElement } from './GraphicElement';

/**
 * SchemaGroup define the base class for SchemaElement that contains
 * other SchemaElement and has a relative origin respected by all children
 * SchemaElment. Extend this class when you need a complex SchemaElement,
 * override methods to specialize operations.
 */
export abstract class GraphicGroup extends GraphicElement {

  private groupLinkPairs: LinkPair[] = [];

  private children: GraphicElement[] = [];
  protected svgGroup: SVG.G;

  private widthGroup: number;
  private heightGroup: number;

  constructor(origin: Point, width: number, height: number, ...linkPairs: LinkPair[]) {
    super(origin);

    this.groupLinkPairs = linkPairs;
    this.widthGroup = width;
    this.heightGroup = height;
  }

  // Draw

  public draw(host: SVG.G) {
    // console.log('GraphicGroup draw()');

    this.svgGroup = host.group()
      .move(this.origin.x, this.origin.y);

    this.drawChildren(this.svgGroup);

    this.drawConnectChildrenTo();

    this.drawLinks(this.svgGroup);

    this.drawDebugRect();
  }

  private drawChildren(svg: SVG.G) {
    this.children.forEach(child => {
      child.draw(svg);
    });
  }

  protected drawConnectChildrenTo() {
    // console.log('Draw standard Connection with children');
    this.children.forEach(child => {

      this.drawPolyline(LineDrawer.createLinePoints(
          child.getOutHook(), this.getRelativeIntExitLinkHook()));

      this.drawPolyline(LineDrawer.createLinePoints(
        this.getRelativeIntEntryHook(), child.getInHook()));
    });
  }

  private drawDebugRect() {
    // this.svgGroup.rect();
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

  // Hooks

  private getRelativeIntExitLinkHook(): HookPoint {
    return this.getRelativeIntHookFrom(this.groupLinkPairs[0].getExitLinkHook());
  }

  private getRelativeIntEntryHook(): HookPoint {
    return this.getRelativeIntHookFrom(this.groupLinkPairs[0].getEntryLinkHook());
  }

  private getRelativeIntHookFrom(hook: LinkHook): HookPoint {
    return new HookPoint(
      new Point(hook.coord.x - this.origin.x, hook.coord.y - this.origin.y),
      hook.fromIntPos
    );
  }


  // Children

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

  // protected getInRelativeCoordinates(index: number = 0): Point {
  //   // console.log('From getInRelativeCoordinate', this.inOutList[index]);
  //   return new Point(
  //     this.groupLinkPairs[index].getInCoordinate().x - this.origin.x,
  //     this.groupLinkPairs[index].getInCoordinate().y - this.origin.y
  //   );
  // }

  // protected getOutRelativeCoordinates(index: number = 0): Point {
  //   // console.log('From getOutRelativeCoordinate', this.inOutList[index]);
  //   return new Point(
  //     this.groupLinkPairs[index].getOutCoordinate().x - this.origin.x,
  //     this.groupLinkPairs[index].getOutCoordinate().y - this.origin.y
  //   );
  // }

  protected setWidthAndHeightGroup(width: number, height: number) {
    this.widthGroup = width;
    this.heightGroup = height;
  }

  public drawLinks(host: SVG.G) {
    this.groupLinkPairs.forEach(linkPair => {
      linkPair.draw(host, this.origin);
    });
  }

  /**
   * Set new Links and delete the previous ones.
   * @param inOuts: the new links for the GraphicGroup
   */
  public setLink(...links: LinkPair[]): void {
    this.groupLinkPairs = links;
  }

  public getInHook(index: number = 0): HookPoint {
    return this.getAbsoluteExtHookFrom(this.groupLinkPairs[index].getEntryLinkHook());
  }

  public getOutHook(index: number = 0): HookPoint {
    return this.getAbsoluteExtHookFrom(this.groupLinkPairs[index].getExitLinkHook());
  }

  private getAbsoluteExtHookFrom(hook: LinkHook): HookPoint {
    return new HookPoint(
      new Point(hook.coord.x, hook.coord.y),
      hook.fromExtPos
    );
  }

}
