import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PureSvgEditorComponent } from './pure-svg-editor/pure-svg-editor.component';
import { StoreSelectionComponent } from './store-selection/store-selection.component';
import { DragAndDropService } from './drag-and-drop.service';

@NgModule({
  declarations: [
    PureSvgEditorComponent,
    StoreSelectionComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PureSvgEditorComponent
  ],
  providers: [
    DragAndDropService
  ]
})
export class EditorModule { }
