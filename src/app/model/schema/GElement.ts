import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { HookPair } from '../core/HookPair';

export abstract class GElement {

  // SVG drawing
  private origin: Point;
  protected svgGroup: SVG.G;

  // selectable
  private containerRect: SVG.Rect;
  private totWidth: number;
  private totHeight: number;

  // Connection
  private hookPair: HookPair;

  // Event
  onClick = (e) => {};

  constructor(origin: Point, svgRef: SVG.G, totWidth: number, totHeight: number, hookPair: HookPair) {
    this.origin = origin;
    this.svgGroup = svgRef.group();
    this.hookPair = hookPair;

    this.totWidth = totWidth;
    this.totHeight = totHeight;
  }

  public drawAll() {
    this.drawSub();
    this.drawHookPair();

    this.svgGroup.move(this.origin.x, this.origin.y);
  }

  private drawHookPair() {
    this.svgGroup.on('mouseenter', (e: MouseEvent) => {

      this.containerRect = this.svgGroup.rect(this.totWidth, this.totHeight)
        .fill('transparent')
        .stroke('aqua');

      this.hookPair.drawInputPoint(this.svgGroup);
      this.hookPair.drawOutputPoint(this.svgGroup);
    });

    this.svgGroup.on('mouseleave', (e: MouseEvent) => {
      this.hookPair.removePoints();
      this.containerRect.remove();
    });

    this.svgGroup.on('click', (e: MouseEvent) => {
      this.onClick(e);
    });
  }

  // Template method
  protected abstract drawSub();

}
