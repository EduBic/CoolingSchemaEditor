import * as SVG from 'svg.js';
import { Point } from '../../../core/Point';

export class Label {

  private readonly svgElem: SVG.Text;
  private readonly coord: Point;

  constructor(svgParent: SVG.G, coord: Point, text = '') {
    this.coord = coord;

    this.svgElem = svgParent.plain(text)
      .move(this.coord.x, this.coord.y)
      .addClass('text');
  }

  public show() {
    this.svgElem.removeClass('hide-elem');
  }

  public hide() {
    this.svgElem.addClass('hide-elem');
  }

  public setText(text: string) {
    this.svgElem.text(text);
  }

}
