import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

import { Editor } from '../model/Editor';
import { DElement } from '../model/schema/DElement';
import { SElement } from '../model/schema/SElement';
import { GElement } from '../model/schema/graphics/GElement';
import { StateSelectionService } from '../state-selection.service';


@Component({
  selector: 'app-pure-svg-editor',
  templateUrl: './pure-svg-editor.component.html',
  styleUrls: ['./pure-svg-editor.component.css']
})
export class PureSvgEditorComponent implements OnInit {

  editor: Editor;
  svgWidth = 600;
  svgHeight = 400;
  isFocusOnSvg = true;

  constructor(private selService: StateSelectionService) { }

  ngOnInit() {
    this.editor = this.selService.initEditor('editor', this.svgWidth, this.svgHeight);
    this.editor.zoom(0.5);
    this.editor.pan(-90, -90);
    // window.addEventListener('resize', this.resizeSvg, false);
  }

  // resizeSvg() {
  //   const proportion = 3 / 5;
  //   // this.mainSvg.setAttribute('viewBox', '0 0 ' + window.innerWidth * proportion  + ' ' + window.innerHeight);
  // }

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
    if (this.isFocusOnSvg) {
      this.editor.zoom(1.25);
    }
  }

  @HostListener('document:keydown.A', ['$event'])
  zoomOut(event: KeyboardEvent) {
    if (this.isFocusOnSvg) {
      this.editor.zoom(0.75);
    }
  }

  setFocusOnSvg(e: MouseEvent, on: boolean) {
    e.stopPropagation();
    this.isFocusOnSvg = on;
    // console.log('pan set to:', this.isPanEnable);
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  goLeft(event: KeyboardEvent) {
    if (this.isFocusOnSvg) {
      this.editor.pan(1, 0);
    }
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  goRight(event: KeyboardEvent) {
    if (this.isFocusOnSvg) {
      this.editor.pan(-1, 0);
    }
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  goAhead(event: KeyboardEvent) {
    if (this.isFocusOnSvg) {
      this.editor.pan(0, +1);
    }
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  goBack(event: KeyboardEvent) {
    if (this.isFocusOnSvg) {
      this.editor.pan(0, -1);
    }
  }

}
