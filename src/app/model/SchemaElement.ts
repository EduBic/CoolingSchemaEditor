import * as SVG from 'svg.js';
import { Point } from './Point';
import { InOut } from './InOut';

export abstract class SchemaElement {
  protected readonly origin: Point;
  protected readonly inOut: InOut;

  constructor(origin: Point, inOut: InOut) {
    this.origin = origin;
    this.inOut = inOut;
  }

  abstract draw(host: SVG.G): void;
}
