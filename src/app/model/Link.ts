import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPosition } from './HookPosition';
import { HookPoint } from './HookPoint';

export class LinkHook {
  readonly coord: Point;
  readonly postFromInt: HookPosition;  // connect to children
  readonly posFromExt: HookPosition;  // connect to external element

  constructor(coord: Point, intPos: HookPosition, extPos: HookPosition) {
    this.coord = coord;
    this.postFromInt = intPos;
    this.posFromExt = extPos;
  }
}

export class LinkPair {
  private readonly entry: LinkHook;
  private readonly exit: LinkHook;

  constructor(entry: LinkHook, exit: LinkHook) {
    this.entry = entry;
    this.exit = exit;
  }

  /**
   * Create a link pair that for abilitate the connection from a GraphicGroup
   * with other GraphicElement.
   * @param entryPoint coordinate of link that enter in the GraphicGroup.
   * @param entryPosition position of link with respect of GraphicGroup seen as
   * a black box.
   * @param exitPoint coordinate of link that exit from the GraphicGroup.
   * @param exitPosition position of link with respect of GraphicGroup seen as
   * a black box.
   */
  public static createLink(entryPoint: Point, entryPosition: HookPosition,
    exitPoint: Point, exitPosition: HookPosition) {

      const entryExtPos = entryPosition;
      const entryIntPos = LinkPair.getOppositePosition(entryPosition);

      const exitExtPos = exitPosition;
      const exitIntPos = LinkPair.getOppositePosition(exitPosition);

      return new LinkPair(
        new LinkHook(entryPoint, entryIntPos, entryExtPos),
        new LinkHook(exitPoint, exitIntPos, exitExtPos)
    );
  }

  private static getOppositePosition(position: HookPosition): HookPosition {
    switch (position) {
      case HookPosition.Top: {
        return HookPosition.Bottom;
      }
      case HookPosition.Right: {
        return HookPosition.Left;
      }
      case HookPosition.Bottom: {
        return HookPosition.Top;
      }
      case HookPosition.Left: {
        return HookPosition.Right;
      }
    }
  }

  getEntryLinkHook(): LinkHook {
    return this.entry;
  }

  getExitLinkHook(): LinkHook {
    return this.exit;
  }

  public draw(svg: SVG.G, origin: Point) {
    // Equilater Triangle parameters
    const side = 4;
    const angle = 60;
    const halfSide = side / 2;

    const bottomH = halfSide * Math.tan(angle);
    const totalH = halfSide * Math.tan(angle / 2);
    const upH = totalH - bottomH;

    // Triangle points
    let exitPoints: number[];
    let entryPoints: number[];

    // Need relative HookPoint
    const exitRelativeCoord = new Point(
      this.exit.coord.x - origin.x,
      this.exit.coord.y - origin.y
    );
    const entryRelativeCoord = new Point(
      this.entry.coord.x - origin.x,
      this.entry.coord.y - origin.y
    );

    if (this.fromInternalToExternalTop()) {
      exitPoints = this.upTriangle(exitRelativeCoord, upH, bottomH, halfSide);
      entryPoints = this.downTriangle(entryRelativeCoord, upH, bottomH, halfSide);

    } else if (this.fromInternalToExternalBottom()) {
      exitPoints = this.downTriangle(exitRelativeCoord, upH, bottomH, halfSide);
      entryPoints = this.upTriangle(entryRelativeCoord, upH, bottomH, halfSide);

    } else if (this.fromInternalToExternalRight()) {
      exitPoints =  this.rightTriangle(exitRelativeCoord, upH, bottomH, halfSide);
      entryPoints = this.leftTriangle(entryRelativeCoord, upH, bottomH, halfSide);

    } else if (this.fromInternalToExternalLeft()) {
      exitPoints = this.leftTriangle(exitRelativeCoord, upH, bottomH, halfSide);
      entryPoints = this.rightTriangle(entryRelativeCoord, upH, bottomH, halfSide);
    }

    svg.polygon(exitPoints).fill({color: 'orange'});
    svg.polygon(entryPoints).fill({color: 'orange'});
  }

  private upTriangle(hookRelCoord: Point, upH: number, bottomH: number, halfSide: number): number[] {
    // Points from top to right to left
    return [
      hookRelCoord.x, hookRelCoord.y - upH,
      hookRelCoord.x + halfSide, hookRelCoord.y + bottomH,
      hookRelCoord.x - halfSide, hookRelCoord.y + bottomH
    ];
  }

  private downTriangle(hookRelCoord: Point, upH: number, bottomH: number, halfSide: number): number[] {
    // From right to bottom to left
    return [
      hookRelCoord.x + halfSide, hookRelCoord.y - bottomH,
      hookRelCoord.x, hookRelCoord.y + upH,
      hookRelCoord.x - halfSide, hookRelCoord.y - bottomH
    ];
  }

  private rightTriangle(hookRelCoord: Point, upH: number, bottomH: number, halfSide: number): number[] {
    // From top to right to bottom
    return [
      hookRelCoord.x - bottomH, hookRelCoord.y - halfSide,
      hookRelCoord.x + upH, hookRelCoord.y,
      hookRelCoord.x - bottomH, hookRelCoord.y + halfSide
    ];
  }

  private leftTriangle(hookRelCoord: Point, upH: number, bottomH: number, halfSide: number): number[] {
    // From top to bottom to left
    return [
      hookRelCoord.x + bottomH, hookRelCoord.y - halfSide,
      hookRelCoord.x + bottomH, hookRelCoord.y + halfSide,
      hookRelCoord.x - upH, hookRelCoord.y
    ];
  }


  private fromInternalToExternalTop(): boolean {
    return this.exit.posFromExt === HookPosition.Top;
  }

  private fromInternalToExternalBottom(): boolean {
    return this.exit.posFromExt === HookPosition.Bottom;
  }

  private fromInternalToExternalRight(): boolean {
    return this.exit.posFromExt === HookPosition.Right;
  }

  private fromInternalToExternalLeft(): boolean {
    return this.exit.posFromExt === HookPosition.Left;
  }

}
