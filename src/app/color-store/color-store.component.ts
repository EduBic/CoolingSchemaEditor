import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-store',
  templateUrl: './color-store.component.html',
  styleUrls: ['./color-store.component.css']
})
export class ColorStoreComponent implements OnInit {

  colors: string[] = [
    'blue',
    'lime',
    'black',
    'yellow'
  ];

  constructor() { }

  ngOnInit() {
  }

}
