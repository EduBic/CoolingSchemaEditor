import {
  Butterfly
} from './Butterfly';
import {
  Point
} from './Point';
import {
  BigRect
} from './BigRect';
import {
  LineDrawer
} from './LineDrawer';
import { GraphicGroup } from './GraphicGroup';
import { HookPosition } from './HookPosition';
import { Circle } from './Circle';
import { ParallelElements } from './ParallelElements';
import { LinkPair } from './Link';

export class SystemElement extends GraphicGroup {

  private static readonly DIST_LINK = 5;

  private condenser: BigRect;
  private compressors: GraphicGroup[] = [];
  private expansionValves: Butterfly[] = [];
  private evaporator: BigRect;

  constructor(origin: Point, width: number = 500, height: number = 500) {
    super(origin,
      width, height,
      LinkPair.createLink(
        new Point(width / 4, 0), HookPosition.Top,
        new Point(width * 3 / 4, 0), HookPosition.Top
      ),
      LinkPair.createLink(
        new Point(width / 4, height), HookPosition.Bottom,
        new Point(width * 3 / 4, height), HookPosition.Bottom
      )
    );

    // TODO: construct Children based to width and height of parent group

    const aCircle = new Circle(new Point(0, 0), 30);

    this.compressors.push(
      new ParallelElements(new Point(320, 100), aCircle, 3, 5),
      new ParallelElements(new Point(120, 100), aCircle, 3, 5),
      // new MultiRectEx(new Point(320, 100), 3, 60, 60, 6), // Right
      // new MultiRectEx(new Point(120, 100), 3, 60, 60, 6)  // Left
    );

    this.expansionValves.push(
      new Butterfly(new Point(540, 160), 30, 60), // Right
      new Butterfly(new Point(60, 160), 30, 60)   // Left
    );

    this.condenser = new BigRect(
      new Point(80, 10),
      200, 60, 0.1, false
    );

    this.evaporator = new BigRect(
      new Point(80, 400),
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

    // TODO: remove the update of hook from children
    this.setLink(
      LinkPair.createLink(
        new Point(condIn.coord.x, condIn.coord.y - SystemElement.DIST_LINK),
        HookPosition.Top,
        new Point(condOut.coord.x, condOut.coord.y - SystemElement.DIST_LINK),
        HookPosition.Top
      ),
      LinkPair.createLink(
        new Point(evapIn.coord.x, evapIn.coord.y + SystemElement.DIST_LINK),
        HookPosition.Bottom,
        new Point(evapOut.coord.x, evapOut.coord.y + SystemElement.DIST_LINK),
        HookPosition.Bottom
      )
    );

  }

  // Template method
  protected drawConnectChildrenTo() {
    // console.log('connect condenser with my inOUT Top');
    // console.log('connect evaporator with my inOUT Bottom');
    const circuits = Math.min(this.compressors.length, this.expansionValves.length);

    for (let i = 0; i < circuits; i++) {

      super.drawPolyline(LineDrawer.createLinePoints(this.compressors[i].getOutHook(), this.condenser.getInHook(i + 1)));

      super.drawPolyline(LineDrawer.createLinePoints(this.condenser.getOutHook(i + 1), this.expansionValves[i].getInHook()));

      super.drawPolyline(LineDrawer.createLinePoints(this.expansionValves[i].getOutHook(), this.evaporator.getInHook(i + 1)));

      super.drawPolyline(LineDrawer.createLinePoints(this.evaporator.getOutHook(i + 1), this.compressors[i].getInHook()));
    }
  }

}
