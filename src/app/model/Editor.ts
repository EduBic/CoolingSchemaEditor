
import * as SVG from 'svg.js';
import { MultiRectEx } from './MultiRectEx';
import { Rect } from './Rect';
import { InOut } from './InOut';


export class Editor {

  main: SVG.G;

  multiRect: MultiRectEx;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;

    // this.multiRect = new MultiRectEx({ x: 0, y: 0 }, 3, 60, 60);
  }

  draw() {
    const aRect = new Rect(
      {x: 100, y: 100},
      60, 60
    );

    aRect.draw(this.main);

    const multiRect = new MultiRectEx(
      {x: 200, y: 200 },
      3, 60, 60);

    multiRect.draw(this.main);
  }


}
