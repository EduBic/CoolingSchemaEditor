import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RectComponent } from './rect/rect.component';
import { ItemComponent } from './item/item.component';
import { GroupItemsComponent } from './group-items/group-items.component';

@NgModule({
  declarations: [
    AppComponent,
    RectComponent,
    ItemComponent,
    GroupItemsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
