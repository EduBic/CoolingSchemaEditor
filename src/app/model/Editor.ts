
import * as SVG from 'svg.js';
import { MultiRectEx } from './MultiRectEx';
import { Rect } from './Rect';
import { InOut } from './InOut';
import { ButterflyEx } from './ButterflyEx';
import { BigRectEx } from './BigRecEx';
import { SystemElement } from './SystemElement';


export class Editor {

  main: SVG.G;

  multiRect: MultiRectEx;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;

    // this.multiRect = new MultiRectEx({ x: 0, y: 0 }, 3, 60, 60);
  }

  draw() {
    // const aRect = new Rect(
    //   {x: 100, y: 100},
    //   60, 60
    // );

    // aRect.draw(this.main);

    // const multiRect = new MultiRectEx(
    //   {x: 200, y: 200 },
    //   3, 60, 60);

    // multiRect.draw(this.main);

    // const but = new ButterflyEx(
    //   {x: 100, y: 300},
    //   30, 60
    // );
    // but.draw(this.main);

    // const big = new BigRectEx(
    //   {x: 100, y: 10 },
    //   200, 40
    // );
    // big.draw(this.main);

    const sys = new SystemElement(
      {x: 0, y: 0}
    );
    sys.draw(this.main);

  }


}
