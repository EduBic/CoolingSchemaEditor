import * as SVG from 'svg.js';
import { SystemElement } from './SystemElement';
import { Point } from './core/Point';
import { Circle } from './primitive/Circle';
import { ParallelElements } from './layout/ParallelElements';
import { TestGroup } from './TestGroup';
import { Rect } from './primitive/Rect';
import { Butterfly } from './primitive/Butterfly';


export class Editor {

  main: SVG.G;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
  }

  draw() {
    const sys = new SystemElement(new Point(0, 0));
    // sys.draw(this.main);

    const aCircle = new Circle(new Point(0, 0), 30);
    const parallel = new ParallelElements(new Point(320, 100), aCircle, 3);

    // console.log('Parallel hook', parallel.getHook());

    // parallel.draw(this.main);

    // TEST
    // const testGroup = new TestGroup();
    // testGroup.draw(this.main);

    // TEST Lines
    const rect = new Rect(new Point(100, 150), 40, 40);
    const butt = new Butterfly(new Point(200, 150), 50, 25, false);
    const circle = new Circle(new Point(300, 150), 30);

    rect.draw(this.main);
    butt.draw(this.main);
    circle.draw(this.main);

  }


}
