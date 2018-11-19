import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { Gate } from './Gate';
import { HookPoint } from '../core/HookPoint';
import { fromEvent, Observable } from 'rxjs';

export abstract class GElement {

  // SVG drawing
  private origin: Point;
  protected svgGroup: SVG.G;

  // selectable
  private containerRect: SVG.Rect;
  protected readonly totWidth: number;
  protected readonly totHeight: number;

  // Configuration (on/off)
  private gateConf = true;
  private selectRect = true;

  // Connection
  private gates: Gate[];

  // Event stream
  click$: Observable<MouseEvent>;

  // Event
  onClick = (e) => {};

  constructor(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number, gates: Gate[] = []) {
    this.origin = origin;
    this.svgGroup = svgParent.group();

    this.gates = gates;

    this.totWidth = totWidth;
    this.totHeight = totHeight;
  }

  public drawAll() {
    this.drawInternal();
    if (this.gateConf) {
      this.drawGates();
    }

    if (this.selectRect) {
      this.containerRect = this.svgGroup.rect(this.totWidth, this.totHeight)
          .fill('transparent')
          .stroke('transparent');

      this.click$ = fromEvent(this.containerRect, 'click');
    }

    this.svgGroup.move(this.origin.x, this.origin.y);
  }

  private drawGates() {
    this.svgGroup.on('mouseenter', (e: MouseEvent) => {

      if (this.selectRect) {
        this.containerRect.stroke('aqua');
      }

      this.gates.forEach(gate => {
        gate.draw(this.svgGroup);
      });
    });

    this.svgGroup.on('mouseleave', (e: MouseEvent) => {

      this.gates.forEach(gate => {
        gate.remove();
      });

      if (this.selectRect) {
        this.containerRect.stroke('transparent');
      }
    });

    this.svgGroup.on('click', (e: MouseEvent) => {
      this.onClick(e);
    });
  }

  // Template method
  protected abstract drawInternal();

  /**
   * Change default behaviour of GElement base class. Call this method inside
   * the constructor of a class that need this.
   */
  public disableGateDraw() {
    this.gateConf = false;
  }

  public disableSelectRect() {
    this.selectRect = false;
  }

  public getGate(index: number): Gate {
    return this.gates[index];
  }

  public getAbsoluteGate(index: number): Gate {
    return this.gates[index].getAbsoluteGate(this.origin);
  }

  public getWidth(): number {
    return this.totWidth;
  }

  public getHeight(): number {
    return this.totHeight;
  }

}
