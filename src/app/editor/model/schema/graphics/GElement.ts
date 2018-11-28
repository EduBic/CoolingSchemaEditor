import * as SVG from 'svg.js';
import { Point } from '../../core/Point';
import { Gate } from './utils/Gate';
import { fromEvent, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Label } from './utils/Label';

export abstract class GElement {

  // DEBUG
  private drawCounter = 0;

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
  private gates: Gate[] = [];

  // Decoration Text
  private label: Label;

  // Event stream
  click$: Observable<MouseEvent> = new Observable();
  gateClick$: Observable<MouseEvent> = new Observable();
  pointerUp$: Observable<MouseEvent> = new Observable();

  constructor(origin: Point, svgParent: SVG.G, totWidth: number, totHeight: number, gates: Gate[] = []) {
    this.origin = origin;
    this.svgGroup = svgParent.group();

    this.gates = gates;

    this.totWidth = totWidth;
    this.totHeight = totHeight;
  }

  public drawAll() {
    if (this.drawCounter === 0) {
      this.drawCounter++;

      this.drawInternal();

      this.drawBoxRect();

      this.drawGates();

      this.drawLabels();

      this.svgGroup.move(this.origin.x, this.origin.y);
    } else {
      throw Error('GElement ' + this.getId() + ' is drawed more times!');
    }

  }

  // Template method
  protected abstract drawInternal();

  private drawGates() {
    if (this.gateConf) {
      this.gates.forEach(gate => {
        gate.draw(this.svgGroup);
        gate.hide();
        // this.gateClick$ = fromEvent(graphicGate, 'click');
      });

      this.setInteractions();
    }
  }

  private setInteractions() {

    this.svgGroup.on('mouseenter', (e: MouseEvent) => {

      if (this.selectRect) {
        this.containerRect.stroke('aqua');
      }

      this.gates.forEach(gate => gate.show());

      if (this.label) {
        this.label.show();
      }
    });

    this.svgGroup.on('mouseleave', (e: MouseEvent) => {

      this.gates.forEach(gate => gate.hide() );

      if (this.selectRect) {
        this.containerRect.stroke('transparent');
      }

      if (this.label) {
        this.label.hide();
      }
    });
  }

  private drawBoxRect() {
    if (this.selectRect) {
      this.containerRect = this.svgGroup.rect(this.totWidth, this.totHeight)
          .fill('transparent')
          .stroke('transparent');

      this.click$ = fromEvent<MouseEvent>(this.containerRect, 'click');
        // .pipe(tap(_ => console.log('EVENT:click$')));
      this.pointerUp$ = fromEvent(this.containerRect, 'pointerup');
    }
  }

  private drawLabels() {
    if (this.label) {
      this.label.draw(this.svgGroup);
      this.label.hide();
    }
  }

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

  public getOrigin(): Point {
    return this.origin;
  }

  public setOrigin(newOrigin: Point) {
    this.origin = newOrigin;
    this.svgGroup.move(this.origin.x, this.origin.y);
  }

  public getId(): string {
    return this.svgGroup.id();
  }

  /**
   * Set the label, call when you are initializing the GElement.
   * If you want change the label use @updateLabel() instead.
   * @param labels the string to show
   */
  public setLabel(text: string) {
    if (this.label) {
      this.label.remove();
    }

    this.label = new Label(new Point(this.totWidth, 0), text);
  }

  public updateLabel(text: string) {
    this.setLabel(text);
    this.drawLabels();
  }

  public removeLabel() {
    this.label.remove();
  }

}
