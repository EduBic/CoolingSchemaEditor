import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { Gate } from './Gate';
import { HookPoint } from '../core/HookPoint';

export abstract class GElement {

  // SVG drawing
  private origin: Point;
  protected svgGroup: SVG.G;

  // selectable
  private containerRect: SVG.Rect;
  protected readonly totWidth: number;
  protected readonly totHeight: number;

  // Configuration
  private drawGateConf = true;

  // Connection
  private gates: Gate[];

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
    if (this.drawGateConf) {
      this.drawGates();
    }

    this.containerRect = this.svgGroup.rect(this.totWidth, this.totHeight)
        .fill('transparent')
        .stroke('transparent');

    this.svgGroup.move(this.origin.x, this.origin.y);
  }

  private drawGates() {
    this.svgGroup.on('mouseenter', (e: MouseEvent) => {

      this.containerRect.stroke('aqua');

      this.gates.forEach(gate => {
        gate.draw(this.svgGroup);
      });
    });

    this.svgGroup.on('mouseleave', (e: MouseEvent) => {

      this.gates.forEach(gate => {
        gate.remove();
      });

      this.containerRect.stroke('transparent');
    });

    this.svgGroup.on('click', (e: MouseEvent) => {
      this.onClick(e);
    });
  }

  // Template method
  protected abstract drawInternal();

  public disableGateDraw() {
    this.drawGateConf = false;
  }

  public getGate(index: number): Gate {
    return this.gates[index];
  }

  public getAbsoluteGate(index: number): Gate {
    return this.gates[index].getAbsoluteGate(this.origin);
  }

}
