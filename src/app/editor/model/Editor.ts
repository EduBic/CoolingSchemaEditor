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
import { first, merge } from 'rxjs/operators';

import { GElement } from './schema/GElement';
import { DryCoolerBuilder } from './schema/DryCoolerFactory';
import { Valve } from './schema/Valve';


export class Editor {

  private main: SVG.G;
  private currScale = 1;
  private currTransX = 0;
  private currTransY = 0;

  private children: SElement[] = [];

  private myValve: SElement;
  private myComprs: SElement;
  private myDc: SElement[];

  public select$: Observable<DElement>;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
    const container = SVG.get('container') as SVG.Doc;

  }

  draw() {
    const mainOrigin = new Point(150, 100);

    // const p = new SPump({id: 1, name: 'pump', total: 2}, mainOrigin, this.main);
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

    const valve = new GValve(mainOrigin, this.main, 30, 60, Direction.BottomToTop);
    this.myValve = new SElement(valve, Valve.dtype, new Valve(42, 'super'));
    this.myValve.draw();


    // const elemClone = new GCompressor(new Point(0,0), this.main, 14, Direction.BottomToTop);
    // const parallel = new GParallelWrapper(new Point(200, 50), this.main, elemClone, 3);

    // this.myComprs = new SElement(parallel, { id: 43, name: 'comprs parallel' });
    // this.myComprs.draw();

    // this.myComprs.click$.subscribe((elem: DElement) => {
    //   console.log('click comprs', elem);
    // });

    this.myDc = DryCoolerBuilder.create(new Point(200, 200), this.main, 200, 150);
    // this.myDc.forEach(child => {
    //   child.draw();

    //   child.click$.subscribe((elem: DElement) => {
    //     console.log(elem);
    //   });

    // });

    this.children.push(this.myValve);
    this.children = this.children.concat(this.myDc);

    this.children.forEach(child => {
      child.draw();
    });

    this.select$ = staticMerge(...this.children.map(x => x.click$));
  }


  public startListenerDrop(newData: DElement) {
    // for SElement listen 'pointerup' event
    // TODO: merge all stream from element inside screen
    // subscribe and unsubscribe to that stream
    // const allObs = [this.myValve.pointerUp$];

    // this.myDc.forEach(child => {
    //   allObs.push(child.pointerUp$);
    // });

    this.children.forEach(child => {
      child.subscribeDrop(newData);
    });

    // this.dropSub = this.myValve.pointerUp$
    //   .pipe(
    //     merge(this.myDc[0].pointerUp$)
    //   )
    //   .subscribe(
    //     (e) => { console.log('elem', e); },
    //     (err) => {console.log('error'); },
    //     () => {console.log('completed'); }
    //   );

    // this.dropSub = merge(
    //   this.myValve.pointerUp$,
    //   this.myDc[0].pointerUp$
    // ).subscribe(
    //   (elem) => { console.log('drop on', elem); elem.setData(newData); }
    // );
  }

  public stopListenerDrop() {
    // this.dropSub.unsubscribe();
    this.children.forEach(child => {
      child.unsubscribeDrop();
    });
  }

  public subSelected(callback) {
    this.children.forEach(child => {
      child.click$.subscribe((elem: DElement) => {
        callback(elem);
      });
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
