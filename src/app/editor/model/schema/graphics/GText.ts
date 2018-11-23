import * as SVG from 'svg.js';
import { Point } from '../../core/Point';

export class GText {

  private svgElem: SVG.Text;
  private coord: Point;

  private readonly text: string;

  constructor(coord: Point, text: string) {
    this.coord = coord;
    this.text = text;
  }

  public draw(host: SVG.G): SVG.Shape {
    console.log('DRAW-Label');

    this.svgElem = host.plain(this.text)
      .move(this.coord.x, this.coord.y)
      .addClass('text');

    return this.svgElem;
  }

  public remove() {
    this.svgElem.remove();
    this.svgElem = null;
  }

}
