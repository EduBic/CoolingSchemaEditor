import * as SVG from 'svg.js';

import { SystemElement } from './layout/SystemElement';
import { Point } from './core/Point';
import { Circle } from './primitive/Circle';
import { ParallelElements } from './layout/ParallelElements';
import { Rect } from './primitive/Rect';
import { Butterfly } from './primitive/Butterfly';
import { ConnectorLine } from './primitive/ConnectorLine';
import { TestMiniCycle } from './TestMiniCycle';
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
import { DElement } from './schema/DElement';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


export class Editor {

  private main: SVG.G;

  private myValve: GValve;

  private dropSub: Subscription;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
    const container = SVG.get('container') as SVG.Doc;

    // this.pointerLeave$ =
    // fromEvent(container, 'pointerup')
    //   .subscribe((e) => {
    //     console.log('Editor svg listener', e);
    //   });
  }

  draw() {
    const mainOrigin = new Point(150, 100);

    const p = new SPump({id: 1, name: 'pump', total: 2}, mainOrigin, this.main);
    // p.draw();

    const c = new SCompressor(null, new Point(200, 200), this.main);
    // c.draw();

    const cs = new SParallelCompressor(null, new Point(210, 50), this.main, 3);
    // cs.draw();

    const f = new GFan(mainOrigin, this.main, 80);
    // f.drawAll();

    // const cl = new GCoil(new Point(50, 50), this.main, 80, 20, GCoilPos.Right);
    // cl.drawAll();

    // const coilPair = new GCoilPair(mainOrigin, this.main, 100, 80, 60);
    // coilPair.drawAll();

    // const sc = new GSideCover(mainOrigin, this.main, 100);
    // sc.drawAll();

    const dc = new GDryCooler(mainOrigin, this.main, 340, 200);
    // dc.drawAll();

    this.myValve = new GValve(mainOrigin, this.main, 30, 60, Direction.BottomToTop);
    this.myValve.drawAll();
    // v.pointerUp$.subscribe(console.log);
    // v.gateClick$.subscribe(console.log);

    // const elem = new GCompressor(new Point(0,0), this.main, 14, Direction.LeftToRight);
    // const parallel = new GParallelWrapper(new Point(200, 50), this.main, elem, 3);
    // parallel.drawAll();

    this.main.transform({
      scale: 1
    });

  }


  public startListenerDrop(newData: DElement) {
    // for SElement listen 'pointerup' event
    this.dropSub = this.myValve.pointerUp$.pipe(first()).subscribe((e) => {
      console.log('myValve change data to', newData);
    });
  }

  public stopListenerDrop() {
    this.dropSub.unsubscribe();
  }

}
