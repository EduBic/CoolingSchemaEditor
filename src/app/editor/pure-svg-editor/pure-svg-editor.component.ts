import { Component, OnInit, HostListener } from '@angular/core';

import * as SVG from 'svg.js';
import { Editor } from '../model/Editor';
import { DElement } from '../model/schema/DElement';


@Component({
  selector: 'app-pure-svg-editor',
  templateUrl: './pure-svg-editor.component.html',
  styleUrls: ['./pure-svg-editor.component.css']
})
export class PureSvgEditorComponent implements OnInit {

  editor: Editor;

  elemDragged: DElement;

  constructor() { }

  ngOnInit() {
    this.editor = new Editor('editor');
    this.editor.draw();
  }

  dragElem(elem: DElement) {
    // console.log('editor.comp', elem);
    this.editor.startListenerDrop(elem);
  }

  dropElem(event: MouseEvent) {
    // console.log('editor.comp - end drag');
    this.editor.stopListenerDrop();
  }

}
