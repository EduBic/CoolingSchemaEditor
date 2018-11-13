import { Component, OnInit, Input } from '@angular/core';
import { InOut } from '../model/InOut';

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
  originX: number;

  @Input()
  originY: number;

  outputX: number;
  outputY: number;

  width = 250;
  height = 50;

  inOuts: InOut[] = [];

  constructor() {

    const topleft = { x: 0, y: 0 };
    const topRight = { x: this.width, y: 0 };
    const bottomRight = { x: this.width, y: this.height };
    const bottomLeft = { x: 0, y: this.height };

    this.inOuts.push(
      new InOut(
        Math.abs(topleft.x - topRight.x) / 2, topleft.y,
        Math.abs(topleft.x - topRight.x) / 2, topleft.y
      ),
      new InOut(
        bottomLeft.x , bottomLeft.y,
        bottomLeft.x, bottomLeft.y
      ),
      new InOut(
        bottomRight.x , bottomRight.y,
        bottomRight.x, bottomRight.y
      )
    );

  }

  ngOnInit() {
  }

}
