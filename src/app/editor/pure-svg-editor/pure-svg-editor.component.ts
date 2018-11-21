import { Component, OnInit, HostListener } from '@angular/core';

import { Editor } from '../model/Editor';
import { DElement } from '../model/schema/DElement';
import { SElement } from '../model/schema/SElement';


@Component({
  selector: 'app-pure-svg-editor',
  templateUrl: './pure-svg-editor.component.html',
  styleUrls: ['./pure-svg-editor.component.css']
})
export class PureSvgEditorComponent implements OnInit {

  editor: Editor;
  selected: DElement;

  constructor() { }

  ngOnInit() {
    this.editor = new Editor('editor');
    this.editor.draw();

    this.editor.select$.subscribe((elem) => {
      this.selected = elem;
    });
  }

  dragElem(elem: DElement) {
    // console.log('editor.comp', elem);
    this.editor.startListenerDrop(elem);
  }

  dropElem(event: MouseEvent) {
    // console.log('editor.comp - end drag');
    this.editor.stopListenerDrop();
  }

  @HostListener('document:keydown.Q', ['$event'])
  zoomIn(event: KeyboardEvent) {
    this.editor.zoom(0.1);
  }

  @HostListener('document:keydown.A', ['$event'])
  zoomOut(event: KeyboardEvent) {
    this.editor.zoom(-0.1);
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  goLeft(event: KeyboardEvent) {
    this.editor.pan(1, 0);
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  goRight(event: KeyboardEvent) {
    this.editor.pan(-1, 0);
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  goAhead(event: KeyboardEvent) {
    this.editor.pan(0, +1);
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  goBack(event: KeyboardEvent) {
    this.editor.pan(0, -1);
  }

}
