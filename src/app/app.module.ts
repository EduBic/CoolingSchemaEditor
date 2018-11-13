import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RectComponent } from './rect/rect.component';
import { ItemComponent } from './item/item.component';
import { GroupItemsComponent } from './group-items/group-items.component';
import { CustomShapeComponent } from './custom-shape/custom-shape.component';
import { SVGConfigService } from './svgconfig.service';
import { ColorStoreComponent } from './color-store/color-store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SvgEditorComponent } from './svg-editor/svg-editor.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { HtmlGroupItemsComponent } from './html-group-items/html-group-items.component';
import { PureSvgEditorComponent } from './pure-svg-editor/pure-svg-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    RectComponent,
    ItemComponent,
    GroupItemsComponent,
    CustomShapeComponent,
    ColorStoreComponent,
    SvgEditorComponent,
    HtmlGroupItemsComponent,
    PureSvgEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MaterialModule,
    DragAndDropModule
  ],
  providers: [SVGConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
