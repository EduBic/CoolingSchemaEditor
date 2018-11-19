import { GElement } from './GElement';
import { DElement } from './DElement';

export class SElement {

  // private graphic: DGraphic;
  private data: DElement;
  private graphic: GElement;



  constructor() {
    // Build graphic element group

    // set data element from Injection
  }

  public setData(data: DElement) {
    this.data = data;
  }

  public setGraphic(graphic: GElement) {
    this.graphic = graphic;
  }

}
