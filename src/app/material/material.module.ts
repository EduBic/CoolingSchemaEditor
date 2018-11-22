import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
];


@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
