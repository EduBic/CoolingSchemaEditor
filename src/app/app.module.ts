import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RectComponent } from './rect/rect.component';
import { ItemComponent } from './item/item.component';
import { GroupItemsComponent } from './group-items/group-items.component';
import { CustomShapeComponent } from './custom-shape/custom-shape.component';
import { SVGConfigService } from './svgconfig.service';
import { ColorStoreComponent } from './color-store/color-store.component';

@NgModule({
  declarations: [
    AppComponent,
    RectComponent,
    ItemComponent,
    GroupItemsComponent,
    CustomShapeComponent,
    ColorStoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SVGConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
