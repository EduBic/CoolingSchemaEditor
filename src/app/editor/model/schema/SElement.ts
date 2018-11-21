import { GElement } from './GElement';
import { DElement } from './DElement';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export class SElement {

  // private graphic: DGraphic;
  private data: DElement;
  private graphic: GElement;

  // Streams
  click$: Observable<DElement>;
  private pointerUp$: Observable<SElement>;

  private subDrop: Subscription;


  constructor(graphic: GElement, data?: DElement) {
    this.graphic = graphic;
    this.setData(data);
  }

  public draw() {
    this.graphic.drawAll();

    // exposes graphic streams
    if (this.graphic.click$) {
      this.click$ = this.graphic.click$.pipe(
        map(_ => this.data)
      );
    }

    if (this.graphic.pointerUp$) {
      this.pointerUp$ = this.graphic.pointerUp$.pipe(
        map(_ => this)
      );
    }

  }

  public setData(data: DElement) {
    this.data = data;

    if (!this.data) {
      this.graphic.setVoidStyle(true);
    } else {
      this.graphic.setVoidStyle(false);
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
