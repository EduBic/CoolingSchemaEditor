import { Component, OnInit, Input } from '@angular/core';
import { SVGConfigService } from '../svgconfig.service';

import * as SVG from 'svg.js';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-custom-shape]',
  templateUrl: './custom-shape.component.html',
  styleUrls: ['./custom-shape.component.css']
})
export class CustomShapeComponent implements OnInit {

  @Input()
  originX: number;

  @Input()
  originY: number;

  svg: SVG.G;

  width = 30;
  height = 20;
  points = '0,0 20,0 0,30  20,30';

  constructor(private svgService: SVGConfigService) { }

  ngOnInit() {
    this.svg = SVG.get('main') as SVG.G;


  }

  getTranslate(): string {
    return 'translate(' + this.originX + ', ' + this.originY + ')';
  }

  dragEnd(e) {
    console.log('drag', this.svgService.getDragData());
  }

}
