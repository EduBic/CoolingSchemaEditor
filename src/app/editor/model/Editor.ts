import * as SVG from 'svg.js';

import { SystemElement } from './layout/SystemElement';
import { Point } from './core/Point';
import { Circle } from './primitive/Circle';
import { ParallelElements } from './layout/ParallelElements';
import { Rect } from './primitive/Rect';
import { Butterfly } from './primitive/Butterfly';
import { ConnectorLine } from './primitive/ConnectorLine';
import { GSideCover } from './schema/graphics/GSideCover';
import { GFan } from './schema/graphics/GFan';
import { GParallelWrapper } from './schema/graphics/GParallelWrapper';
import { GPump } from './schema/graphics/GPump';
import { Direction } from './schema/graphics/utils/Direction';
import { GLine } from './schema/graphics/GLine';
import { GCompressor } from './schema/graphics/GCompressor';
import { ParallelComprBuilder } from './schema/ParallelComprBuilder';
import { GCoil, GCoilPos } from './schema/graphics/GCoil';
import { GDryCooler } from './schema/graphics/GDryCooler';
import { GCoilPair } from './schema/graphics/GCoilPair';
import { GValve } from './schema/graphics/GValve';
import { SElement } from './schema/SElement';
import { DElement, DType } from './schema/DElement';

import { Subscription, merge as staticMerge, Observable } from 'rxjs';
import { first, merge, tap, map, flatMap, switchMap, shareReplay } from 'rxjs/operators';

import { GElement } from './schema/graphics/GElement';
import { DryCoolerBuilder } from './schema/DryCoolerBuilder';
import { Valve, ValveActuator } from './schema/data/Valve';
import { LineDrawer } from './core/LineDrawer';
import { WaterLine } from './schema/data/WaterLine';
import { GText } from './schema/graphics/GText';


export class Editor {

  private main: SVG.G;
  private currScale = 1;
  private currTransX = 0;
  private currTransY = 0;

  private children: SElement[] = [];

  private myValve: SElement;
  private myValve2: SElement;
  private myDc: SElement[];

  private select$: Observable<SElement>;
  public dataSelectedChange$: Observable<DElement>;
  public graphicSelectedChange$: Observable<GElement>;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
    const container = SVG.get('container') as SVG.Doc;
  }

  buildChildren() {
    const mainOrigin = new Point(150, 100);

    // this.myDc = DryCoolerBuilder.create(new Point(200, 200), this.main, 200, 150);

    const valve = new GValve(mainOrigin, this.main, 30, 60, Direction.BottomToTop);
    this.myValve = new SElement(valve, DType.Valve, new Valve(42, 'super', 10, ValveActuator.OnOff));

    const valve2 = new GValve(new Point(200, 200), this.main, 20, 50, Direction.BottomToTop);

    this.myValve2 = new SElement(valve2, DType.Valve);

    // // connect some lines
    // const line = GLine.connectElems(this.main, new Point(0, 0),
    //   this.myDc[3].getGraphic().getAbsoluteGate(0), this.myValve.getGraphic().getAbsoluteGate(0));
    // const schemaLine = new SElement(line, DType.WaterLine, new WaterLine(20, 'a water line'));

    // add child
    // this.children.push(schemaLine);
    this.children.push(this.myValve, this.myValve2);
    // this.children = this.children.concat(this.myDc);
  }

  draw() {
    this.children.forEach(child => {
      child.draw();
    });

    this.select$ = staticMerge(...this.children.map(x => x.click$));
      // .pipe(tap(_ => console.log('EVENT:select$')));
    this.dataSelectedChange$ = this.select$.pipe(
        // tap(_ => console.log('EVENT:dataSelectedChange$ BEFORE')),
        switchMap(elem => elem.changeData$),
        // tap(_ => console.log('EVENT:dataSelectedChange$ AFTER'))
      );
    this.graphicSelectedChange$ = this.select$.pipe(
        // tap(_ => console.log('EVENT:graphicSelectedChange$ BEFORE')),
        map(elem => elem.getGraphic()),
        // tap(_ => console.log('EVENT:graphicSelectedChange$ AFTER'))
      );
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
