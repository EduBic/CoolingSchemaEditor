import * as SVG from 'svg.js';
import { GraphicGroup } from './core/GraphicGroup';
import { Point } from './core/Point';
import { Rect } from './primitive/Rect';
import { LinkPair } from './core/Link';
import { HookPosition } from './core/HookPosition';

export class TestGroup extends GraphicGroup {

  constructor() {
    super(new Point(100, 100), 100, 100);

    const myOrigin = new Point(100, 100);

    const aRect = new Rect(new Point(20, 10), 30, 30);
    this.addChild(aRect);

    const entry = new Point(myOrigin.x + 25, myOrigin.y + 50);
    const entryPosFromExt = HookPosition.Bottom;

    const exit = new Point(myOrigin.x + 25, myOrigin.y);
    const exitPosFromInt = HookPosition.Top;

    // const link1 = LinkPair.createLinkPair(
    //   entry, entryPosFromExt,
    //   exit, exitPosFromInt
    // );

    const link2 = LinkPair.createLinkPair(
      new Point(myOrigin.x, myOrigin.y + 40), HookPosition.Left,
      new Point(myOrigin.x + 80, myOrigin.y + 40), HookPosition.Right
    );

    super.setLink(link2);
  }

}
