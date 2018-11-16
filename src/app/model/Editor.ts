import * as SVG from 'svg.js';

import { SystemElement } from './SystemElement';
import { Point } from './core/Point';
import { Circle } from './primitive/Circle';
import { ParallelElements } from './layout/ParallelElements';
import { Rect } from './primitive/Rect';
import { Butterfly } from './primitive/Butterfly';
import { ConnectorLine } from './primitive/ConnectorLine';
import { Direction } from './core/HookPair';
import { TestMiniCycle } from './TestMiniCycle';


export class Editor {

  private main: SVG.G;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
  }

  draw() {
    const sys = new SystemElement(new Point(0, 0));
    sys.draw(this.main);

    // Parallel
    // const aCircle = new Circle(new Point(0, 0), 30);
    // const parallel = new ParallelElements(new Point(320, 100), aCircle, 3);

    // parallel.draw(this.main);

    // TEST
    // const testGroup = new TestGroup();
    // testGroup.draw(this.main);

    // const test = new TestMiniCycle();
    // test.draw(this.main);

    // TEST Lines
    // const rect = new Rect(new Point(100, 150), 40, 40, Direction.LeftToRight);
    // const butt = new Butterfly(new Point(300, 100), 50, 25, Direction.LeftToRight);
    // const circle = new Circle(new Point(180, 250), 20, Direction.BottomToTop);

    // rect.draw(this.main);
    // butt.draw(this.main);
    // circle.draw(this.main);

    // const line = new ConnectorLine(rect.getOutHook(), butt.getInHook());
    // line.draw(this.main);

    // const inter = line.findIntersections(circle.getOutHook())[0];
    // console.log(inter);


    // this.main.circle(5)
    //   .move(inter.x - 2.5, inter.y - 2.5)
    //   .attr('fill', '#f44242');

    this.main.transform({
      scale: 1
    });

  }

}
