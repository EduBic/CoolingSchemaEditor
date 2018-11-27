import * as SVG from 'svg.js';
import { GElement } from './GElement';
import { Point } from '../../core/Point';
import { Gate } from './utils/Gate';
import { HookPosition } from '../../core/HookPosition';

export class GFluidTransformer extends GElement {

  private static readonly RECT_HEIGHT = 30;
  private static readonly RECT_WIDTH = 120;

  private static readonly PERCENT = 0.1;

  constructor(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number,  position: HookPosition) {
    super(origin, svgParent,
      totWidth, totHeight,
      GFluidTransformer.getExternalGates(position, totWidth, totHeight)
        .concat(GFluidTransformer.getInternalGates(HookPosition.Right, position, totWidth, totHeight))
        .concat(GFluidTransformer.getInternalGates(HookPosition.Left, position, totWidth, totHeight))
    );
  }

  private static getExternalGates(position: HookPosition, width: number, height: number): Gate[] {
    const percent = GFluidTransformer.PERCENT;
    // const width = GFluidTransformer.RECT_WIDTH;
    // const height = GFluidTransformer.RECT_HEIGHT;

    let exitPoint;
    let entryPoint;

    switch (position) {
      case HookPosition.Bottom:
        exitPoint = new Point((1 - percent) * width, height);
        entryPoint = new Point(percent * width, height);
        break;

      case HookPosition.Top:
        exitPoint = new Point(percent * width, 0);
        entryPoint = new Point((1 - percent) * width, 0);
        break;
      default:
        throw Error('GFluidTransformer: position ' + position + ' is not supported');
    }

    return [
      new Gate(exitPoint, position, false),
      new Gate(entryPoint, position, true)
    ];
  }

  private static getInternalGates(position: HookPosition, toExtPosition: HookPosition, width: number, height: number): Gate[] {
    const percent = GFluidTransformer.PERCENT * 2;
    // const width = GFluidTransformer.RECT_WIDTH;
    // const height = GFluidTransformer.RECT_HEIGHT;

    let entryPoint;
    let exitPoint;

    switch (position) {
      case HookPosition.Left:
        if (toExtPosition === HookPosition.Top) {
          entryPoint = new Point(percent * width, height);

        } else if (toExtPosition === HookPosition.Bottom) {
          entryPoint = new Point(percent * width, 0);

        } else {
          console.log('GFluidTransformer: toExtPosition must be Top or Bottom');
        }
        exitPoint = new Point(0, height / 2);
        break;

      case HookPosition.Right:
        if (toExtPosition === HookPosition.Top) {
          entryPoint = new Point((1 - percent) * width, height);

        } else if (toExtPosition === HookPosition.Bottom) {
          entryPoint = new Point((1 - percent) * width, 0);

        } else {
          console.log('GFluidTransformer: toExtPosition must be Top or Bottom');
        }
        exitPoint = new Point(width, height / 2);
        break;

      default:
        throw Error('GFluidTransformer: position ' + position +
                    ' for internal gates is not supported');
    }

    if (toExtPosition === HookPosition.Bottom) {
      return [  // invert entry with exit
        new Gate(entryPoint, HookPosition.Bottom, false),
        new Gate(exitPoint, position, true)
      ];
    } else if (toExtPosition === HookPosition.Top) {
      return [
        new Gate(entryPoint, HookPosition.Bottom, true),
        new Gate(exitPoint, position, false)
      ];
    } else {
      console.log('GFluidTransformer: position: ' + toExtPosition + ' not supported');
      return [];
    }
  }


  protected drawInternal() {
    const rect = this.svgGroup
      .rect(this.totWidth, this.totHeight);
  }



}
