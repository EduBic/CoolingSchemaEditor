import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-rect]',
  templateUrl: './rect.component.html',
  styleUrls: ['./rect.component.css']
})
export class RectComponent implements OnInit {

  @Input()
  content: string;

  @Input()
  x: number;

  @Input()
  y: number;

  @Input()
  width: number;

  @Input()
  height: number;

  constructor() { }

  ngOnInit() {
  }

}
