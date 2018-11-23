import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PureSvgEditorComponent } from './pure-svg-editor/pure-svg-editor.component';
import { StoreSelectionComponent } from './store-selection/store-selection.component';
import { DragAndDropService } from './drag-and-drop.service';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StateSelectionService } from './state-selection.service';
import { DataElementDetailsComponent } from './data-element-details/data-element-details.component';
import { GraphicElementDetailsComponent } from './graphic-element-details/graphic-element-details.component';


@NgModule({
  declarations: [
    PureSvgEditorComponent,
    StoreSelectionComponent,
    DataElementDetailsComponent,
    GraphicElementDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    PureSvgEditorComponent
  ],
  providers: [
    DragAndDropService,
    StateSelectionService
  ]
})
export class EditorModule { }
