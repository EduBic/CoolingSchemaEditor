import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

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

  private static readonly speedPan = 0.8;

  @ViewChild('mainSvg')
  mainSvg: ElementRef;

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

    // hot listener
    fromEvent(this.mainSvg.nativeElement, 'pointerdown').subscribe((e: MouseEvent) => {
      console.log('pointerdown', e);

      this.pointerOrigin = {
        x: e.clientX, y: e.clientY, time: e.timeStamp
      };

      this.mainSvg.nativeElement.classList.add('moving');

      this.pointerMove = fromEvent(this.mainSvg.nativeElement, 'pointermove').subscribe((ev: MouseEvent) => {
        ev.preventDefault();

        // const spaceX = ev.clientX - this.pointerOrigin.x;
        // const spaceY = ev.clientY - this.pointerOrigin.y;
        // const timeDiff = ev.timeStamp - this.pointerOrigin.time;
        // const speed2 = Math.min( 0.2 * Math.sqrt( Math.pow(spaceX, 2) + Math.pow(spaceY, 2)), 4); // / timeDiff;

        this.editor.pan(
          (ev.clientX - this.pointerOrigin.x) * PureSvgEditorComponent.speedPan,
          (ev.clientY - this.pointerOrigin.y) * PureSvgEditorComponent.speedPan
        );

        this.pointerOrigin.x = ev.clientX;
        this.pointerOrigin.y = ev.clientY;
        this.pointerOrigin.time = ev.timeStamp;
      });

      this.pointerUp = fromEvent(this.mainSvg.nativeElement, 'pointerup').subscribe((ev: MouseEvent) => {
        console.log('pointerup');

        this.mainSvg.nativeElement.classList.remove('moving');
        this.pointerMove.unsubscribe();
        this.pointerUp.unsubscribe();
        this.pointerLeave.unsubscribe();
      });
      this.pointerLeave = fromEvent(this.mainSvg.nativeElement, 'pointerleave').subscribe((ev: MouseEvent) => {
        console.log('pointerleave');

        this.mainSvg.nativeElement.classList.remove('moving');
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
