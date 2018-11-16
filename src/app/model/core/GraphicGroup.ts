import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPoint } from './HookPoint';
import { LinkPair } from './LinkPair';
import { LinkHook } from './LinkHook';
import { GraphicElement } from './GraphicElement';
import { ConnectorLine } from '../primitive/ConnectorLine';

/**
 * SchemaGroup define the base class for SchemaElement that contains
 * other SchemaElement and has a relative origin respected by all children
 * SchemaElment. Extend this class when you need a complex SchemaElement,
 * override methods to specialize operations.
 */
export abstract class GraphicGroup extends GraphicElement {

  private groupLinkPairs: LinkPair[] = [];

  private children: GraphicElement[] = [];
  private connections: GraphicElement[] = [];

  private svgGroup: SVG.G;

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

    this.drawConnectionsAndChildren();
    this.drawLinks();
    this.drawDebugRect();
  }

  private drawConnectionsAndChildren() {
    this.connections.forEach(conn => {
      // console.log('Draw Connection', conn);
      conn.draw(this.svgGroup);
    });

    this.children.forEach(child => {
      // console.log('Draw Children', child);
      child.draw(this.svgGroup);
    });
  }

  private drawLinks() {
    this.groupLinkPairs.forEach(linkPair => {
      linkPair.draw(this.svgGroup, this.origin);
    });
  }

  private drawDebugRect() {
    // this.svgGroup.rect();
  }

  /**
   * Sandbox method for generate automatically ConnectorLines for simple
   * GraphicGroup. Override it or define a new method if your GraphicGroup is
   * complex. Remeber to call it in the constructor subclass.
   */
  protected generateConnections() {
    // console.log('Draw standard Connection with children');
    this.children.forEach(child => {

      const exitConnLine = new ConnectorLine(
        child.getOutHook(), this.getRelativeIntExitLinkHook()
      );
      this.connections.push(exitConnLine);

      const entryConnLine = new ConnectorLine(
        this.getRelativeIntEntryHook(), child.getInHook()
      );
      this.connections.push(entryConnLine);

    });
  }

  public connectElementToGroup(indexGroup: number, element: GraphicElement, indexElem = 0): ConnectorLine[] {
    const res: ConnectorLine[] = [];
    res.push(
      new ConnectorLine(element.getOutHook(indexElem), this.getRelativeIntExitLinkHook(indexGroup))
    );
    res.push(
      new ConnectorLine(this.getRelativeIntEntryHook(indexGroup), element.getInHook(indexElem))
    );

    return res;
  }

  // Internal Hooks

  private getRelativeIntExitLinkHook(index = 0): HookPoint {
    return this.getRelativeIntHookFrom(this.groupLinkPairs[index].getExitLinkHook());
  }

  private getRelativeIntEntryHook(index = 0): HookPoint {
    return this.getRelativeIntHookFrom(this.groupLinkPairs[index].getEntryLinkHook());
  }

  private getRelativeIntHookFrom(hook: LinkHook): HookPoint {
    return new HookPoint(
      new Point(hook.coord.x - this.origin.x, hook.coord.y - this.origin.y),
      hook.posFromInt
    );
  }


  // Children

  public addChild(child: GraphicElement): GraphicGroup {
    if (child instanceof ConnectorLine) {
      this.addConn(child);
    } else {
      this.children.push(child);
    }
    return this;
  }

  public addChildren(children: GraphicElement[]): GraphicGroup {
    children.forEach(newChild => {
      this.addChild(newChild);
    });
    return this;
  }

  private addConn(conn: GraphicElement) {
    this.connections.push(conn);
  }


  protected setWidthAndHeightGroup(width: number, height: number) {
    this.widthGroup = width;
    this.heightGroup = height;
  }

  /**
   * Set new Links and delete the previous ones.
   * @param inOuts: the new links for the GraphicGroup
   */
  protected setLink(...links: LinkPair[]): void {
    this.groupLinkPairs = links;
  }

  // External Hooks

  /**
   * Get Input Hook of GraphicGroup view as a black box. Use this method only
   * for operation with external GraphicElements, not for children.
   * @param index index of Link of the GraphicGroup. If no index is set,
   * 0 is taken as index.
   */
  public getInHook(index?: number): HookPoint {
    let link;
    if (index) {
      link = this.groupLinkPairs[index].getEntryLinkHook();
    } else {
      link = this.groupLinkPairs[0].getEntryLinkHook();
    }
    return this.getAbsoluteExtHookFrom(link);
  }

   /**
   * Get Output Hook of GraphicGroup view as a black box. Use this method only
   * for operation with external GraphicElements, not for children.
   * @param index index of Link of the GraphicGroup. If no index is set,
   * 0 is taken as index.
   */
  public getOutHook(index?: number): HookPoint {
    let link;
    if (index) {
      link = this.groupLinkPairs[index].getExitLinkHook();
    } else {
      link = this.groupLinkPairs[0].getExitLinkHook();
    }
    return this.getAbsoluteExtHookFrom(link);
  }

  private getAbsoluteExtHookFrom(hook: LinkHook): HookPoint {
    return new HookPoint(
      new Point(hook.coord.x, hook.coord.y),
      hook.posFromExt
    );
  }


  public getTotalWidth(): number {
    return this.widthGroup;
  }

  public getTotalHeight(): number {
    return this.heightGroup;
  }

}
