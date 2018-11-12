import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatButtonToggleModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,

  DragDropModule
];


@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
