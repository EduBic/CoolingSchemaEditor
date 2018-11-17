import * as SVG from 'svg.js';

import { SystemElement } from './layout/SystemElement';
import { Point } from './core/Point';
import { Circle } from './primitive/Circle';
import { ParallelElements } from './layout/ParallelElements';
import { Rect } from './primitive/Rect';
import { Butterfly } from './primitive/Butterfly';
import { ConnectorLine } from './primitive/ConnectorLine';
import { TestMiniCycle } from './TestMiniCycle';
import { GDryCooler } from './layout/GDryCooler';
import { GSideCover } from './layout/GSideCover';
import { GFan } from './layout/GFan';
import { GCoil } from './layout/GCoil';
import { SPump } from './schema/SPump';
import { SCompressor } from './schema/SCompressor';
import { GParallelWrapper } from './schema/GParallelWrapper';
import { GPump } from './schema/GPump';
import { Direction } from './schema/Direction';
import { GLine } from './schema/GLine';
import { GCompressor } from './schema/GCompressor';
import { SParallelCompressor } from './schema/SParallelCompressors';


export class Editor {

  private main: SVG.G;

  constructor(svgId: string) {
    this.main = SVG.get(svgId) as SVG.G;
  }

  draw() {
    const mainOrigin = new Point(100, 100);

    const p = new SPump({id: 1, name: 'pump', total: 2}, mainOrigin, this.main);
    p.draw();

    const c = new SCompressor(null, new Point(30, 30), this.main);
    c.draw();

    const cs = new SParallelCompressor(null, new Point(210, 50), this.main, 3);
    cs.draw();
    // const elem = new GCompressor(new Point(0,0), this.main, 14, Direction.LeftToRight);
    // const parallel = new GParallelWrapper(new Point(200, 50), this.main, elem, 3);
    // parallel.drawAll();

    this.main.transform({
      scale: 1
    });

  }

  private drawOldLib() {
    // // const sys = new SystemElement(new Point(0, 0));
    // // sys.draw(this.main);

    // // const dc = new GraphicDryCooler(new Point(0, 0), );
    // const sideCover = new GSideCover(mainOrigin, 100, 4);
    // // sideCover.draw(this.main);

  }

}
