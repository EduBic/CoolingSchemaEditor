import { Component, OnInit } from '@angular/core';
import { StateSelectionService } from '../state-selection.service';
import { SElement } from '../model/schema/SElement';

@Component({
  selector: 'app-data-element-details',
  templateUrl: './data-element-details.component.html',
  styleUrls: ['./data-element-details.component.css']
})
export class DataElementDetailsComponent implements OnInit {

  keyValuePairs: any[] = [];

  constructor(private editor: StateSelectionService) { }

  ngOnInit() {

    this.editor.selectedElement$.subscribe((selection: SElement) => {

      const data = selection.getData();

      Object.keys(data).forEach((key: string) => {
        this.keyValuePairs.push({
            key: key.charAt(0).toUpperCase() + key.slice(1),
            value: data[key]
          });
      });

    });
  }

}
