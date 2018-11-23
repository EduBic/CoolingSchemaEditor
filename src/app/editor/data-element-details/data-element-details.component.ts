import { Component, OnInit } from '@angular/core';
import { StateSelectionService } from '../state-selection.service';
import { SElement } from '../model/schema/SElement';
import { DElement } from '../model/schema/DElement';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-element-details',
  templateUrl: './data-element-details.component.html',
  styleUrls: ['./data-element-details.component.css']
})
export class DataElementDetailsComponent implements OnInit {

  message = 'No element selected';
  keyValuePairs: any[];

  selectDataSub: Subscription;

  constructor(private editor: StateSelectionService) { }

  ngOnInit() {

    console.log('SUB:selectedData$');

    this.selectDataSub = this.editor.selectedData$.subscribe((dataElem: DElement) => {
      console.log('EVENT:selectedData$');

      // reset all
      this.keyValuePairs = [];

      if (dataElem !== null) {
        this.message = 'Machine Component assigned to element';

        Object.keys(dataElem).forEach((key: string) => {
          this.keyValuePairs.push({
              key: key.charAt(0).toUpperCase() + key.slice(1),
              value: dataElem[key]
            });
        });
      } else {
        this.message = 'This Element has no Machine Component assigned';
      }

      // } else {
      //   this.message = 'No Element selected';
      // }

    });
  }

}
