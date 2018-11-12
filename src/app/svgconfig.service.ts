import { Injectable } from '@angular/core';

import * as SVG from 'svg.js';

@Injectable({
  providedIn: 'root'
})
export class SVGConfigService {

  mainSvg: SVG.Doc;
  groupItems: any;

  dragData: any;

  constructor() { }

  public init(ref) {
    this.mainSvg = SVG(ref);
    this.groupItems = SVG.get('group-items');
    console.log('Group Item init:', this.groupItems);
  }


}
