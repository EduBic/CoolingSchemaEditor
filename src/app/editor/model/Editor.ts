import * as SVG from 'svg.js';

import { SystemElement } from './layout/SystemElement';
import { Point } from './core/Point';
import { Circle } from './primitive/Circle';
import { ParallelElements } from './layout/ParallelElements';
import { Rect } from './primitive/Rect';
import { Butterfly } from './primitive/Butterfly';
import { ConnectorLine } from './primitive/ConnectorLine';
import { GSideCover } from './schema/GSideCover';
import { GFan } from './schema/GFan';
import { SPump } from './schema/SPump';
import { SCompressor } from './schema/SCompressor';
import { GParallelWrapper } from './schema/GParallelWrapper';
import { GPump } from './schema/GPump';
import { Direction } from './schema/Direction';
import { GLine } from './schema/GLine';
import { GCompressor } from './schema/GCompressor';
import { SParallelCompressor } from './schema/SParallelCompressors';
import { GCoil, GCoilPos } from './schema/GCoil';
import { GDryCooler } from './schema/GDryCooler';
import { GCoilPair } from './schema/GCoilPair';
import { GValve } from './schema/GValve';
import { SElement } from './schema/SElement';
import { DElement, DType } from './schema/DElement';

import { Subscription, merge as staticMerge, Observable } from 'rxjs';
import { first, merge, tap } from 'rxjs/operators';

import { GElement } from './schema/GElement';
import { DryCoolerBuilder } from './schema/DryCoolerBuilder';
import { Valve, ValveActuator } from './schema/data/Valve';
import { LineDrawer } from './core/LineDrawer';
import { WaterLine } from './schema/data/WaterLine';


export class Editor {

  private main: SVG.G;
  private currScale = 1;
  private currTransX = 0;
  private currTransY = 0;

  private children: SElement[] = [];

  private myValve: SElement;
  private myComprs: SElement;
  private myDc: SElement[];

  public select$: Observable<SElement>;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
    const container = SVG.get('container') as SVG.Doc;
  }

  buildChildren() {
    const mainOrigin = new Point(150, 100);

    this.myDc = DryCoolerBuilder.create(new Point(200, 200), this.main, 200, 150);

    const valve = new GValve(mainOrigin, this.main, 30, 60, Direction.BottomToTop);
    this.myValve = new SElement(valve, new Valve(42, 'super', 10, ValveActuator.OnOff));

    // connect some lines
    const line = GLine.connectElems(this.main, new Point(0, 0),
      this.myDc[3].getGraphic().getAbsoluteGate(0), this.myValve.getGraphic().getAbsoluteGate(0));
    const schemaLine = new SElement(line, new WaterLine(20, 'a water line'));

    // add child
    this.children.push(schemaLine);
    this.children.push(this.myValve);
    this.children = this.children.concat(this.myDc);
  }

  draw() {
    this.children.forEach(child => {
      child.draw();
    });

    this.select$ = staticMerge(...this.children.map(x => x.click$));
  }


  public startListenerDrop(newData: DElement) {
    this.children.forEach(child => {
      child.subscribeDrop(newData);
    });
  }

  public stopListenerDrop() {
    this.children.forEach(child => {
      child.unsubscribeDrop();
    });
  }

  // Manipolate main svg

  public zoom(percent: number) {
    this.currScale += percent;
    this.main.transform({ scale: this.currScale });
  }

  public pan(dx: number, sx: number) {
    this.currTransX += dx;
    this.currTransY += sx;
    this.main.translate(this.currTransX, this.currTransY);
  }

}
