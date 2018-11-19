import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PureSvgEditorComponent } from './pure-svg-editor/pure-svg-editor.component';

@NgModule({
  declarations: [
    PureSvgEditorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PureSvgEditorComponent
  ]
})
export class EditorModule { }
