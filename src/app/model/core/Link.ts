import * as SVG from 'svg.js';
import { Point } from './Point';
import { HookPosition } from './HookPosition';
import { LinkHook } from './LinkHook';

export class LinkPair {
  private readonly entry: LinkHook;
  private readonly exit: LinkHook;

  constructor(entry: LinkHook, exit: LinkHook) {
    this.entry = entry;
    this.exit = exit;
  }

  /**
   * Create a link pair that for abilitate the connection from a GraphicGroup
   * with other GraphicElement. N. B. Use absolute coordinate.
   * @param entryAbsPoint coordinate of link that enter in the GraphicGroup.
   * @param entryPositionFromExt position of link with respect of GraphicGroup seen as
   * a black box.
   * @param exitAbsPoint coordinate of link that exit from the GraphicGroup.
   * @param exitPositionFromExt position of link with respect of GraphicGroup seen as
   * a black box.
   */
  public static createLinkPair(
    entryAbsPoint: Point, entryPositionFromExt: HookPosition,
    exitAbsPoint: Point, exitPositionFromExt: HookPosition) {

      const entryExtPos = entryPositionFromExt;
      const entryIntPos = LinkPair.getOppositePosition(entryPositionFromExt);

      const exitExtPos = exitPositionFromExt;
      const exitIntPos = LinkPair.getOppositePosition(exitPositionFromExt);

      return new LinkPair(
        new LinkHook(entryAbsPoint, entryIntPos, entryExtPos),
        new LinkHook(exitAbsPoint, exitIntPos, exitExtPos)
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
    const side = 10;
    const angle = Math.PI / 3;  // 60 DEG
    const halfSide = side / 2;

    const h = halfSide * Math.tan(angle / 2);
    const totHeight = halfSide * Math.tan(angle);
    const H = totHeight - h;

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

    console.log('exit from external: ', this.exit.posFromExt);

    if (this.exit.posFromExt === HookPosition.Top) {
      exitPoints = this.upTriangle(exitRelativeCoord, H, h, halfSide);

    } else if (this.exit.posFromExt === HookPosition.Bottom) {
      exitPoints = this.downTriangle(exitRelativeCoord, H, h, halfSide);

    } else if (this.exit.posFromExt === HookPosition.Right) {
      exitPoints =  this.rightTriangle(exitRelativeCoord, H, h, halfSide);

    } else if (this.exit.posFromExt === HookPosition.Left) {
      exitPoints = this.leftTriangle(exitRelativeCoord, H, h, halfSide);
    }


    console.log('entry from external: ', this.entry.posFromExt);

    switch (this.entry.posFromExt) {
      case HookPosition.Top:
        entryPoints = this.downTriangle(entryRelativeCoord, H, h, halfSide);
        break;
      case HookPosition.Bottom:
        entryPoints = this.upTriangle(entryRelativeCoord, H, h, halfSide);
        break;
      case HookPosition.Right:
        entryPoints = this.leftTriangle(entryRelativeCoord, H, h, halfSide);
        break;
      case HookPosition.Left:
        entryPoints = this.rightTriangle(entryRelativeCoord, H, h, halfSide);
        break;
    }

    svg.polygon(entryPoints).fill({color: 'gold'});
    svg.polygon(exitPoints).fill({color: 'limegreen'});
  }

  private upTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // Points from top to right to left
    return [
      hookRelCoord.x, hookRelCoord.y - H,
      hookRelCoord.x + halfSide, hookRelCoord.y + h,
      hookRelCoord.x - halfSide, hookRelCoord.y + h
    ];
  }

  private downTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // From right to bottom to left
    return [
      hookRelCoord.x + halfSide, hookRelCoord.y - h,
      hookRelCoord.x, hookRelCoord.y + H,
      hookRelCoord.x - halfSide, hookRelCoord.y - h
    ];
  }

  private rightTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // From top to right to bottom
    return [
      hookRelCoord.x - h, hookRelCoord.y - halfSide,
      hookRelCoord.x + H, hookRelCoord.y,
      hookRelCoord.x - h, hookRelCoord.y + halfSide
    ];
  }

  private leftTriangle(hookRelCoord: Point, H: number, h: number, halfSide: number): number[] {
    // From top to bottom to left
    return [
      hookRelCoord.x + h, hookRelCoord.y - halfSide,
      hookRelCoord.x + h, hookRelCoord.y + halfSide,
      hookRelCoord.x - H, hookRelCoord.y
    ];
  }

}
