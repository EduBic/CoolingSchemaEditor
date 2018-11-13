import * as SVG from 'svg.js';
import { SchemaElement } from './SchemaElement';
import { Point } from './Point';
import { InOut } from './InOut';


export class ButterflyEx extends SchemaElement {

  constructor(origin: Point) {
    super(origin, new InOut(0, 0));
  }


  draw(host: SVG.G): void {
    throw new Error('Method not implemented.');
  }

}
