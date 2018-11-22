import { Component, OnInit, Input } from '@angular/core';
import { GElement } from '../model/schema/GElement';

@Component({
  selector: 'app-gelement-panel-options',
  templateUrl: './gelement-panel-options.component.html',
  styleUrls: ['./gelement-panel-options.component.css']
})
export class GElementPanelOptionsComponent implements OnInit {

  @Input()
  graphicSelected: GElement;

  constructor() { }

  ngOnInit() {
    console.log(this.graphicSelected);
  }

}
