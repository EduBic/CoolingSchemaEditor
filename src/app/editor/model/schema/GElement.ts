import * as SVG from 'svg.js';
import { Point } from '../core/Point';
import { Gate } from './Gate';
import { HookPoint } from '../core/HookPoint';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  click$: Observable<GElement>;
  gateClick$: Observable<MouseEvent>;
  pointerUp$: Observable<MouseEvent>;

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
      this.setInteractions();
    }

    if (this.selectRect) {
      this.containerRect = this.svgGroup.rect(this.totWidth, this.totHeight)
          .fill('transparent')
          .stroke('transparent');

      this.click$ = fromEvent(this.containerRect, 'click');
      // .pipe(
      //   map(_ => this)
      // );
      this.pointerUp$ = fromEvent(this.containerRect, 'pointerup');
    }


    this.svgGroup.move(this.origin.x, this.origin.y);
  }

  private setInteractions() {

    this.svgGroup.on('mouseenter', (e: MouseEvent) => {

      if (this.selectRect) {
        this.containerRect.stroke('aqua');
      }

      this.gates.forEach(gate => {
        const graphicGate = gate.draw(this.svgGroup);
        this.gateClick$ = fromEvent(graphicGate, 'click');
      });
    });

    this.svgGroup.on('mouseleave', (e: MouseEvent) => {

      this.gates.forEach(gate => {
        gate.remove();
        this.gateClick$ = null;
      });

      if (this.selectRect) {
        this.containerRect.stroke('transparent');
      }
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

  public setVoidStyle(on: boolean) {
    if (on) {
      this.svgGroup.addClass('selement-no-data');
    } else {
      this.svgGroup.removeClass('selement-no-data');
    }
  }

}
