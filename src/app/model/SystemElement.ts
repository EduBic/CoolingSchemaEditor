import { Butterfly } from './primitive/Butterfly';
import { Point } from './core/Point';
import { BigRect } from './primitive/BigRect';
import { GraphicGroup } from './core/GraphicGroup';
import { HookPosition } from './core/HookPosition';
import { Circle } from './primitive/Circle';
import { ParallelElements } from './layout/ParallelElements';
import { LinkPair } from './core/Link';
import { ConnectorLine } from './primitive/ConnectorLine';
import { Direction } from './core/InOut';

export class SystemElement extends GraphicGroup {

  private static readonly DIST_LINK = 30;

  private condenser: BigRect;
  private compressors: GraphicGroup[] = [];
  private expansionValves: Butterfly[] = [];
  private evaporator: BigRect;

  constructor(origin: Point, width: number = 500, height: number = 500) {
    super(origin,
      width, height,
      LinkPair.createLinkPair(
        // TODO: SystemElement.DIST_LINK distance doesn't consider the height and with of group
        new Point(width / 4, - SystemElement.DIST_LINK), HookPosition.Top,
        new Point(width * 3 / 4, - SystemElement.DIST_LINK), HookPosition.Top
      ),
      LinkPair.createLinkPair(
        new Point(width / 4, height + SystemElement.DIST_LINK), HookPosition.Bottom,
        new Point(width * 3 / 4, height + SystemElement.DIST_LINK), HookPosition.Bottom
      )
    );

    // TODO: construct Children based to width and height of parent group

    const aCircle = new Circle(new Point(0, 0), 25, Direction.BottomToTop);

    this.compressors.push(
      new ParallelElements(new Point(320, 120), aCircle, 3, 5),
      new ParallelElements(new Point(120, 120), aCircle, 3, 5)
    );

    this.expansionValves.push(
      new Butterfly(new Point(540, 160), 30, 50, Direction.BottomToTop), // Right
      new Butterfly(new Point(60, 160), 30, 50, Direction.BottomToTop)   // Left
    );

    this.condenser = new BigRect(
      new Point(200, 10),
      200, 60, 0.1, false
    );

    this.evaporator = new BigRect(
      new Point(200, 400),
      200, 60, 0.1, true
    );

    this.addChildren(this.compressors)
      .addChildren(this.expansionValves)
      .addChild(this.condenser)
      .addChild(this.evaporator);

    // init my InOut
    const condIn = this.condenser.getInHook(0);
    const condOut = this.condenser.getOutHook(0);

    const evapIn = this.evaporator.getInHook(0);
    const evapOut = this.evaporator.getOutHook(0);

    this.setLink(
      LinkPair.createLinkPair(
        new Point(condIn.coord.x, condIn.coord.y - SystemElement.DIST_LINK),
        HookPosition.Top,
        new Point(condOut.coord.x, condOut.coord.y - SystemElement.DIST_LINK),
        HookPosition.Top
      ),
      LinkPair.createLinkPair(
        new Point(evapIn.coord.x, evapIn.coord.y + SystemElement.DIST_LINK),
        HookPosition.Bottom,
        new Point(evapOut.coord.x, evapOut.coord.y + SystemElement.DIST_LINK),
        HookPosition.Bottom
      )
    );

    this.generateConnections();
  }


  protected generateConnections() {
    const circuits = Math.min(this.compressors.length, this.expansionValves.length);

    for (let i = 0; i < circuits; i++) {

      this.addChild(ConnectorLine.connect(this.compressors[i], 0, this.condenser, i + 1));
      this.addChild(ConnectorLine.connect(this.condenser, i + 1, this.expansionValves[i], 0));
      this.addChild(ConnectorLine.connect(this.expansionValves[i], 0, this.evaporator, i + 1));
      this.addChild(ConnectorLine.connect(this.evaporator, i + 1, this.compressors[i], 0));
    }

    this.addChildren(this.connectElementToGroup(1, this.evaporator));
    this.addChildren(this.connectElementToGroup(0, this.condenser));
  }


}
