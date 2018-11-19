import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DElement } from '../model/schema/DElement';

@Component({
  selector: 'app-store-selection',
  templateUrl: './store-selection.component.html',
  styleUrls: ['./store-selection.component.css']
})
export class StoreSelectionComponent implements OnInit {

  elements: DElement[] = [
    { id: 0, name: 'valve1'},
    { id: 1, name: 'valve2'},
    { id: 2, name: 'valve3'}
  ];

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

}
