import { Component, OnInit } from '@angular/core';

import * as SVG from 'svg.js';
import { Editor } from '../model/Editor';


@Component({
  selector: 'app-pure-svg-editor',
  templateUrl: './pure-svg-editor.component.html',
  styleUrls: ['./pure-svg-editor.component.css']
})
export class PureSvgEditorComponent implements OnInit {

  editor: Editor;

  constructor() { }

  ngOnInit() {
    this.editor = new Editor('editor');
    this.editor.draw();
  }

}
