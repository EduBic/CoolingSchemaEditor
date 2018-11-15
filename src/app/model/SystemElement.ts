import * as SVG from 'svg.js';
import {
  MultiRectEx
} from './MultiRectEx';
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
import { InOut } from './InOut';
import { HookPosition } from './HookPosition';

export class SystemElement extends GraphicGroup {

  // private children: SchemaElement[] = [];

  private condenser: BigRect;
  private compressors: MultiRectEx[] = [];
  private expansionValves: Butterfly[] = [];
  private evaporator: BigRect;

  constructor(origin: Point) {
    super(origin);

    this.compressors.push(
      new MultiRectEx(new Point(320, 100), 3, 60, 60, 6), // Right
      new MultiRectEx(new Point(120, 100), 3, 60, 60, 6)  // Left
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

    const distY = 10;

    this.setHook(
      new InOut(
        condIn.coord.x, condIn.coord.y - distY,
        condOut.coord.x, condOut.coord.y - distY,
        HookPosition.Top, HookPosition.Top),
      new InOut(
        evapIn.coord.x, evapIn.coord.y + distY,
        evapOut.coord.x, evapOut.coord.y + distY,
        HookPosition.Bottom, HookPosition.Bottom)
    );

  }

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

  public getWidth(): number {
    return 0;
  }

  public getHeight(): number {
    return 0;
  }
}
