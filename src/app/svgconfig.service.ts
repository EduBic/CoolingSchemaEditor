import { Injectable } from '@angular/core';

import * as SVG from 'svg.js';

@Injectable({
  providedIn: 'root'
})
export class SVGConfigService {

  mainSvg: SVG.Doc;

  constructor() { }

  public init(ref) {
    this.mainSvg = SVG(ref);
  }


}
