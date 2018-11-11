import { Component, OnInit } from '@angular/core';
import { SVGConfigService } from '../svgconfig.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-custom-shape]',
  templateUrl: './custom-shape.component.html',
  styleUrls: ['./custom-shape.component.css']
})
export class CustomShapeComponent implements OnInit {

  width = 30;
  height = 20;
  points = '0,0 0,20 30,0, 30,20';

  constructor(private svgService: SVGConfigService) { }

  ngOnInit() {
  }

}
