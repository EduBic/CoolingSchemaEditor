import * as SVG from 'svg.js';
import { MultiRectEx } from './MultiRectEx';
import { SystemElement } from './SystemElement';
import { Point } from './Point';


export class Editor {

  main: SVG.G;

  multiRect: MultiRectEx;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
  }

  draw() {
    const sys = new SystemElement(new Point(0, 0));
    sys.draw(this.main);
  }


}
