import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PureSvgEditorComponent } from './pure-svg-editor/pure-svg-editor.component';
import { AngSvgModule } from './ang-svg/ang-svg.module';

@NgModule({
  declarations: [
    AppComponent,
    PureSvgEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

    AngSvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
