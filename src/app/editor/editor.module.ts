import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PureSvgEditorComponent } from './pure-svg-editor/pure-svg-editor.component';
import { StoreSelectionComponent } from './store-selection/store-selection.component';
import { DragAndDropService } from './drag-and-drop.service';
import { GElementPanelOptionsComponent } from './gelement-panel-options/gelement-panel-options.component';


@NgModule({
  declarations: [
    PureSvgEditorComponent,
    StoreSelectionComponent,
    GElementPanelOptionsComponent
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
