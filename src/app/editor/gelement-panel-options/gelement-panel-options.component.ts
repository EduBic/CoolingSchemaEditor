import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GElement } from '../model/schema/graphics/GElement';
import { Point } from '../model/core/Point';
import { FormControl } from '@angular/forms';
import { StateSelectionService } from '../state-selection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gelement-panel-options',
  templateUrl: './gelement-panel-options.component.html',
  styleUrls: ['./gelement-panel-options.component.css']
})
export class GElementPanelOptionsComponent implements OnInit {

  graphicSelected: GElement;

  originX = new FormControl();
  originY = new FormControl();

  subOriginX: Subscription;
  subOriginY: Subscription;

  constructor(private selService: StateSelectionService) { }

  ngOnInit() {
    this.selService.selectedGraphic$.subscribe((graphic: GElement) => {
      // console.log('GElem panel before/after', this.graphicSelected, selection.getGraphic());

      if (this.subOriginX) {
        this.subOriginX.unsubscribe();
      }
      if (this.subOriginY) {
        this.subOriginY.unsubscribe();
      }

      this.graphicSelected = graphic;

      this.originX.setValue(this.graphicSelected.getOrigin().x);
      this.originY.setValue(this.graphicSelected.getOrigin().y);

      this.subOriginX = this.originX.valueChanges.subscribe((val: number) => {
        if (this.isInputValid()) {
          this.graphicSelected.setOrigin(new Point(val, this.originY.value));
        } else {
          this.originX.setValue(0, {emitEvent: false});
        }
      });

      this.subOriginY = this.originY.valueChanges.subscribe((val: number) => {
        if (this.isInputValid()) {
          this.graphicSelected.setOrigin(new Point(this.originX.value, val));
        } else {
          this.originY.setValue(0, {emitEvent: false});
        }
      });
    });
  }

  private isInputValid() {
    return this.originX.value && this.originY.value;
  }

  // ngAfterViewInit() {
  //   console.log('ngAfterViewInit', this.graphicSelected);
  //   if (this.graphicSelected) {
  //     this.originForm.setValue(this.graphicSelected.getOrigin().x);

  //     // this.originForm.valueChanges.subscribe((x: number) => {
  //     //   console.log('form changed', x);
  //     //   this.graphicSelected.setOrigin(new Point(30, x));
  //     // });
  //   }
  // }

  // getOrigin(): Point {
  //   console.log('getOrigin');
  //   if (this.graphicSelected) {
  //     return this.graphicSelected.getOrigin();
  //   } else {
  //     return null;
  //   }
  // }

}
