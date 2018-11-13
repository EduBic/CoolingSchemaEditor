import { Component, OnInit } from '@angular/core';

import * as SVG from 'svg.js';


@Component({
  selector: 'app-pure-svg-editor',
  templateUrl: './pure-svg-editor.component.html',
  styleUrls: ['./pure-svg-editor.component.css']
})
export class PureSvgEditorComponent implements OnInit {

  svg: SVG.G;

  constructor() { }

  ngOnInit() {


    const cols = document.querySelectorAll('#columns .column');
    [].forEach.call(cols, function(col) {
      col.addEventListener('dragstart', (e) => {
        this.style.opacity = '0.4';  // this / e.target is the source node.
      }, false);
    });

    const centerX = 300;
    const centerY = 300;

    this.svg = SVG.get('main') as SVG.G;

    this.svg.rect(100, 100)
      .move(centerX, centerY);

    const rect = this.svg.rect(100, 60)
      .move(100, 200);

    rect.on('mouseup', (e) => {
      console.log('drop', e);
    });
  }

  drag(event) {
    console.log('start drag', event);
  }

}
