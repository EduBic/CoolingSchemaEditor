import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GElement } from '../model/schema/graphics/GElement';
import { Subscription } from 'rxjs';
import { StateSelectionService } from '../state-selection.service';
import { Point } from '../model/core/Point';
import { isNumber } from 'util';

@Component({
  selector: 'app-graphic-element-details',
  templateUrl: './graphic-element-details.component.html',
  styleUrls: ['./graphic-element-details.component.css']
})
export class GraphicElementDetailsComponent implements OnInit {

  graphicSelected: GElement;

  originX = new FormControl();
  originY = new FormControl();

  subOriginX: Subscription;
  subOriginY: Subscription;

  constructor(private selService: StateSelectionService) {}

  ngOnInit() {
    this.selService.selectedGraphic$.subscribe((graphic: GElement) => {
      // console.log('GElem panel before/after', this.graphicSelected, graphic);

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
        console.log('New OriginX', val);

        if (this.isXinputValid()) {
          this.graphicSelected.setOrigin(new Point(val, this.originY.value));
        } else {
          this.originX.setValue(0, { emitEvent: false });
        }
      });

      this.subOriginY = this.originY.valueChanges.subscribe((val: number) => {
        if (this.isYInputValid()) {
          this.graphicSelected.setOrigin(new Point(this.originX.value, val));
        } else {
          this.originY.setValue(0, { emitEvent: false });
        }
      });
    });
  }

  private isXinputValid(): boolean {
    return this.originX.value && isNumber(this.originX.value);
  }

  private isYInputValid() {
    return this.originY.value && isNumber(this.originY.value);
  }

}
