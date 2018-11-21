import { GElement } from './GElement';
import { DElement } from './DElement';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SElement {

  // private graphic: DGraphic;
  private data: DElement;
  private graphic: GElement;

  // Streams
  click$: Observable<DElement>;


  constructor(graphic: GElement, data?: DElement) {
    this.graphic = graphic;
    this.data = data;
  }

  public draw() {
    this.graphic.drawAll();

    this.click$ = this.graphic.click$.pipe(
      map(_ => this.data)
    );
  }

  public setData(data: DElement) {
    this.data = data;
  }

  public getGraphic(): GElement {
    return this.graphic;
  }

}
