import * as SVG from 'svg.js';
import { GraphicGroup } from './core/GraphicGroup';
import { Point } from './core/Point';
import { Rect } from './primitive/Rect';
import { Direction } from './core/HookPair';
import { ConnectorLine } from './primitive/ConnectorLine';
import { Butterfly } from './primitive/Butterfly';

export class TestMiniCycle extends GraphicGroup {

  static readonly testOrigin: Point = new Point(60, 200);

  rectLeft: Rect;
  rectRight: Rect;
  valve: Butterfly;

  constructor() {
    super(
      TestMiniCycle.testOrigin,
      400, 400
    );

    this.rectLeft = new Rect(new Point(this.origin.x, this.origin.y), 50, 50, Direction.LeftToRight);

    this.valve = new Butterfly(new Point(this.origin.x + 100, this.origin.y - 50), 20, 40, Direction.BottomToTop);

    this.rectRight = new Rect(new Point(this.origin.x + 300, this.origin.y - 180), 40, 40, Direction.LeftToRight);

    this.addChildren([
      this.rectLeft, this.valve, this.rectRight
    ]);

    this.generateConnections();

  }

  public generateConnections() {

    const innerConn = ConnectorLine.connect(this.rectLeft, 0, this.rectRight, 0);
    const outerConn = ConnectorLine.connect(this.rectRight, 0, this.rectLeft, 0);

    const topNestConn = outerConn.connectWithOutputOf(this.valve);
    const bottomNestConn = innerConn.connectWithInputOf(this.valve);
    // innerConn.connectWith(this.valve);

    this.addChildren([innerConn, bottomNestConn, outerConn, topNestConn]);


  }

}
