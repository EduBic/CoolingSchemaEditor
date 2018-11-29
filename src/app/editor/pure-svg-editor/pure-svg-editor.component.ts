import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

import { Editor } from '../model/Editor';
import { DElement } from '../model/schema/DElement';
import { SElement } from '../model/schema/SElement';
import { GElement } from '../model/schema/graphics/GElement';
import { StateSelectionService } from '../state-selection.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



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

  private pointerUp: Subscription;
  private pointerMove: Subscription;
  private pointerLeave: Subscription;

  private pointerOrigin;

  constructor(private selService: StateSelectionService) { }

  ngOnInit() {
    this.editor = this.selService.initEditor('editor', this.svgWidth, this.svgHeight);
    this.editor.pan(-this.svgWidth / 2, -this.svgHeight / 2);
    this.editor.zoom(0.5);

    const domEditor = document.getElementById('main-svg');

    // hot lisener
    fromEvent(domEditor, 'pointerdown').subscribe((e: MouseEvent) => {
      console.log('pointerdown', e);

      this.pointerOrigin = {
        x: e.clientX, y: e.clientY
      };

      domEditor.classList.add('moving');

      this.pointerMove = fromEvent(domEditor, 'pointermove')
        // .pipe(debounceTime(5))
        .subscribe((ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();

        const currPointerX = ev.clientX;
        const currPointerY = ev.clientY;

        const speed = 0.6;

        this.editor.pan(
          (currPointerX - this.pointerOrigin.x) * speed,
          (currPointerY - this.pointerOrigin.y) * speed
        );

        this.pointerOrigin = {
          x: ev.clientX, y: ev.clientY
        };

        // console.log('pointermove', e);
      });

      this.pointerUp = fromEvent(domEditor, 'pointerup').subscribe((ev: MouseEvent) => {
        console.log('pointerup');

        domEditor.classList.remove('moving');
        this.pointerMove.unsubscribe();
        this.pointerUp.unsubscribe();
        this.pointerLeave.unsubscribe();
      });
      this.pointerLeave = fromEvent(domEditor, 'pointerleave').subscribe((ev: MouseEvent) => {
        console.log('pointerleave');

        domEditor.classList.remove('moving');
        this.pointerMove.unsubscribe();
        this.pointerUp.unsubscribe();
        this.pointerLeave.unsubscribe();
      });

    });

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
