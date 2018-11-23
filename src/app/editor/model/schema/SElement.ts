import { GElement } from './GElement';
import { DElement, DType } from './DElement';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Valve } from './data/Valve';

export class SElement {


  private id: string;

  // private graphic: DGraphic;
  private data: DElement = null;
  private readonly dataType: DType;

  private graphic: GElement = null;

  // Streams
  click$: Observable<SElement>;
  changeData$: BehaviorSubject<DElement>;

  // Drag&Drop stream
  private pointerUp$: Observable<SElement>;
  private subDrop: Subscription;


  constructor(graphic: GElement, dataType: DType, data: DElement = null) {
    this.id = graphic.getId();

    this.graphic = graphic;
    this.dataType = dataType;

    if (data === null) {
      this.data = null;
      this.initChangeData();
      this.graphic.setVoidStyle(true);
    } else {

      if (data.getType() === dataType) {
        this.data = data;
        this.initChangeData();
        this.graphic.setVoidStyle(false);
      } else {
        throw Error('DElement type doesn\' match with dataType');
      }
    }
  }

  public draw() {
    this.graphic.drawAll();

    // exposes graphic streams
    if (this.graphic.click$) {
      this.click$ = this.graphic.click$.pipe(
        map(_ => this),
        // tap(_ => console.log('EVENT:click$'))
      );
    }

    if (this.graphic.pointerUp$) {
      this.pointerUp$ = this.graphic.pointerUp$.pipe(
        map(_ => this),
        // tap(_ => console.log('graphic pointerUp$'))
      );
    }
  }

  public getGraphic(): GElement {
    return this.graphic;
  }

  public getData(): DElement {
    return this.data;
  }

  public setData(data: DElement) {
    console.log('SetData');
    if (data !== null && data !== undefined) {

      if (data.getType() === this.dataType) {
        this.data = data;
        this.graphic.setVoidStyle(false);
        this.changeData$.next(this.data);
      } else {
        console.log('Data obj is not a ' + this.dataType);
      }

    } else {  // data === null || undefined
      this.data = data;
      this.graphic.setVoidStyle(true);
      this.changeData$.next(this.data);
    }
  }

  private initChangeData() {
    console.log('SUB:changeData$');
    this.changeData$ = new BehaviorSubject(this.data);
    // this.changeData$.subscribe(val => {
    //   console.log('EVENT:changeData$', 'SElement: ' + this.id + ' change DElement with', val);
    // });
  }

  public subscribeDrop(newData: DElement) {
    // console.log('SUB', 'drop');
    this.subDrop = this.pointerUp$
      .pipe(
        // tap(_ => console.log('EVENT', 'drop'))
      )
      .subscribe(() => {
        this.setData(newData);
      });
  }

  public unsubscribeDrop() {
    // console.log('UNSUB', 'drop');
    this.subDrop.unsubscribe();
  }

}
