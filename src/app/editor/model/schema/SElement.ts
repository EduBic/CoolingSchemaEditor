import { GElement } from './GElement';
import { DElement, DType } from './DElement';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Valve } from './data/Valve';

export class SElement {

  // private graphic: DGraphic;
  private data: DElement;
  private dataType: DType;

  private graphic: GElement;

  // Streams
  click$: Observable<SElement>;
  private pointerUp$: Observable<SElement>;

  private subDrop: Subscription;


  constructor(graphic: GElement, data?: DElement) {
    this.graphic = graphic;
    if (data) {
      this.dataType = data.getType();
    }
    this.setData(data);
  }

  public draw() {
    this.graphic.drawAll();

    // exposes graphic streams
    if (this.graphic.click$) {
      this.click$ = this.graphic.click$.pipe(
        map(_ => this)
      );
    }

    if (this.graphic.pointerUp$) {
      this.pointerUp$ = this.graphic.pointerUp$.pipe(
        map(_ => this)
      );
    }
  }

  public getGraphic(): GElement {
    return this.graphic;
  }

  public getData(): DElement {
    return this.data;
  }

  public setData(data: DElement): boolean {
    if (data) {

      if (data.getType() === this.dataType) {
        this.data = data;
        this.graphic.setVoidStyle(false);
      } else {
        console.log('Data obj is not a ' + this.dataType);
      }

      return true;

    } else {  // data === undefined

      this.graphic.setVoidStyle(true);
      return false;
    }
  }

  public subscribeDrop(newData: DElement) {
    this.subDrop = this.pointerUp$.subscribe(() => {
      this.setData(newData);
    });
  }

  public unsubscribeDrop() {
    this.subDrop.unsubscribe();
  }

}
