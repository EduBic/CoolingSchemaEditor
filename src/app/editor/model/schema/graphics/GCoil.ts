import * as SVG from 'svg.js';
import { Point } from '../../core/Point';
import { HookPosition } from '../../core/HookPosition';
import { GElement } from './GElement';
import { Gate } from '../Gate';

export enum GCoilPos {
  Left, Right
}

export class GCoil extends GElement {

  private static readonly HOOK_POS_PERCENT = 0.2;
  private static readonly ANGLE = 60 * Math.PI / 180; // radians

  private points: number[];

  constructor(origin: Point, svgParent: SVG.G, height: number, depth: number, pos: GCoilPos) {
    // const height = 80;
    // const depth = 24;
    GCoil.computeRectangle(height, depth, pos);

    if (pos === GCoilPos.Right) {

      const baseBotTriangle = Math.abs(depth * Math.sin(GCoil.ANGLE));
      const heightBotTriangle = Math.abs(depth * Math.cos(GCoil.ANGLE));

      const baseTopTriangle = Math.abs(height * Math.sin(Math.PI / 2 - GCoil.ANGLE));
      const heightTopTriangle = Math.abs(height * Math.cos(Math.PI / 2 - GCoil.ANGLE));

      super(origin, svgParent, baseBotTriangle + baseTopTriangle, heightBotTriangle + heightTopTriangle,
        [
          GCoil.getEntryGate(baseBotTriangle, heightTopTriangle, heightBotTriangle, baseTopTriangle, pos),
          GCoil.getExitGate(baseBotTriangle, heightBotTriangle, heightTopTriangle, baseTopTriangle, pos),
        ]
      );

      // this.disableGateDraw();

      // from bottom to left to top to right
      this.points = [
        baseBotTriangle, heightTopTriangle + heightBotTriangle, // A
        0, heightTopTriangle, // B
        baseTopTriangle, 0, // C
        baseTopTriangle + baseBotTriangle, heightBotTriangle,  // D
      ];

    } else {
      const baseBotTriangle = Math.abs(height * Math.sin(GCoil.ANGLE / 2));
      const heightBotTriangle = Math.abs(height * Math.cos(GCoil.ANGLE / 2));

      const baseTopTriangle = Math.abs(depth * Math.cos(GCoil.ANGLE / 2));
      const heightTopTriangle = Math.abs(depth * Math.sin(GCoil.ANGLE / 2));

      super(origin, svgParent, baseBotTriangle + baseTopTriangle, heightBotTriangle + heightTopTriangle,
        [
          GCoil.getEntryGate(baseBotTriangle, heightTopTriangle, heightBotTriangle, baseTopTriangle, pos),
          GCoil.getExitGate(baseBotTriangle, heightBotTriangle, heightTopTriangle, baseTopTriangle, pos),
        ]
      );

      // From bottom to right to top to left
      this.points = [
        // 0, 0, // origin
        0, heightTopTriangle, // A
        baseTopTriangle, 0, // B
        baseTopTriangle + baseBotTriangle, heightBotTriangle, // C
        baseBotTriangle, heightTopTriangle + heightBotTriangle // D
      ];
    }
  }

  private static getEntryGate(baseBotTriangle, heightTopTriangle, heightBotTriangle, baseTopTriangle, pos: GCoilPos): Gate {
    if (pos === GCoilPos.Right) {
      return new Gate(
        new Point(
          GCoil.HOOK_POS_PERCENT * baseBotTriangle,
          heightTopTriangle + GCoil.HOOK_POS_PERCENT * heightBotTriangle
        ),
        HookPosition.Bottom, true
      );
    } else {
      return new Gate(
        new Point(
          baseTopTriangle + baseBotTriangle - GCoil.HOOK_POS_PERCENT * baseTopTriangle,
          heightBotTriangle + GCoil.HOOK_POS_PERCENT * heightTopTriangle
        ),
        HookPosition.Bottom, true
      );
    }
  }

  private static getExitGate(baseBotTriangle, heightBotTriangle, heightTopTriangle, baseTopTriangle, pos: GCoilPos): Gate {
    if (pos === GCoilPos.Right) {
      return new Gate(
        new Point(
          baseBotTriangle - (GCoil.HOOK_POS_PERCENT) * baseBotTriangle,
          (heightTopTriangle + heightBotTriangle) - (GCoil.HOOK_POS_PERCENT) * (heightBotTriangle)
        ),
        HookPosition.Bottom, false
      );
    } else {
      return new Gate(
        new Point(
          baseBotTriangle + GCoil.HOOK_POS_PERCENT * baseTopTriangle,
          (heightBotTriangle + heightTopTriangle) -  GCoil.HOOK_POS_PERCENT * baseTopTriangle
        ),
        HookPosition.Bottom, false
      );
    }
  }

  // DEBUG only
  public static computeRectangle(height: number, depth: number, pos: GCoilPos) {
    console.log('For a correct Coil use the following info');

    if (pos === GCoilPos.Right) {
      const baseBotTriangle = Math.abs(depth * Math.sin(GCoil.ANGLE));
      const heightBotTriangle = Math.abs(depth * Math.cos(GCoil.ANGLE));

      const baseTopTriangle = Math.abs(height * Math.sin(Math.PI / 2 - GCoil.ANGLE));
      const heightTopTriangle = Math.abs(height * Math.cos(Math.PI / 2 - GCoil.ANGLE));

      console.log('Bottom triangle: (B/H)', baseBotTriangle, heightBotTriangle);
      console.log('Top triangle: (B/H)', baseTopTriangle, heightTopTriangle);
      console.log('Total width: ', baseBotTriangle + baseTopTriangle);
      console.log('Total height: ', heightBotTriangle + heightTopTriangle);

    } else {

      const baseBotTriangle = Math.abs(height * Math.sin(GCoil.ANGLE / 2));
      const heightBotTriangle = Math.abs(height * Math.cos(GCoil.ANGLE / 2));

      const baseTopTriangle = Math.abs(depth * Math.cos(GCoil.ANGLE / 2));
      const heightTopTriangle = Math.abs(depth * Math.sin(GCoil.ANGLE / 2));

      console.log('Bottom triangle: (B/H)', baseBotTriangle, heightBotTriangle);
      console.log('Top triangle: (B/H)', baseTopTriangle, heightTopTriangle);
      console.log('Total width: ', baseBotTriangle + baseTopTriangle);
      console.log('Total height: ', heightBotTriangle + heightTopTriangle);
    }

  }

  public drawInternal(): void {
    const rect = this.svgGroup.polygon(this.points);
  }

}
