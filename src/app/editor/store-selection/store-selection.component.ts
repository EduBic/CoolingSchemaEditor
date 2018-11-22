import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { DElement } from '../model/schema/DElement';
import { fromEvent } from 'rxjs';
import { first, count } from 'rxjs/operators';
import { Valve } from '../model/schema/Valve';

@Component({
  selector: 'app-store-selection',
  templateUrl: './store-selection.component.html',
  styleUrls: ['./store-selection.component.css']
})
export class StoreSelectionComponent implements OnInit {

  elements: DElement[] = [
    new Valve(0, 'valve0'),
    new Valve(1, 'valve1'),
    new Valve(2, 'valve2')
  ];

  // ghost management
  private ghost: HTMLElement;
  private offsetX = 0;
  private offsetY = 0;

  @Output()
  elemDragStart = new EventEmitter<DElement>();
  @Output()
  elemDragEnd = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {

  }

  dragStart(event: MouseEvent, elem: DElement) {
    event.preventDefault();
    // console.log(event, elem);
    this.elemDragStart.emit(elem);
  }

  dragEnd(event: MouseEvent, elem: DElement) {
    this.elemDragEnd.emit(event);
  }

  startDrag(e: MouseEvent, elem: DElement) {
    e.preventDefault();
    // console.log('event/elem', e, elem);

    // Comunicate with other components
    this.elemDragStart.emit(elem);

    // init ghost
    this.ghost = document.getElementById(elem.id.toString());
    this.offsetX = e.x - (e.target as HTMLImageElement).x;
    this.offsetY = e.y - (e.target as HTMLImageElement).y;
    this.ghost.style.top = (e.y - this.offsetY) + 'px';
    this.ghost.style.left = (e.x - this.offsetX) + 'px';
    this.ghost.classList.remove('disable-ghost');

    const dragging$ = fromEvent(document, 'pointermove').subscribe((ev: MouseEvent) => {
      ev.preventDefault();
      // console.log('ghost:pointermove:', 'dragging', ev.x, ev.y);

      this.ghost.style.top = (ev.y - this.offsetY) + 'px';
      this.ghost.style.left = (ev.x - this.offsetX) + 'px';
    });

    const drop$ = fromEvent(document, 'pointerup')
      .pipe(first())
      .subscribe((ev: MouseEvent) => {

        // console.log('ghost:pointerup:', 'drop');
        this.ghost.classList.add('disable-ghost');

        dragging$.unsubscribe();

        this.elemDragEnd.emit(ev);
    });
  }



}
