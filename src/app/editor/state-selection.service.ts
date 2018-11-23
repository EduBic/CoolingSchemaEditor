import { Injectable } from '@angular/core';
import { GElement } from './model/schema/GElement';
import { SElement } from './model/schema/SElement';
import { Editor } from './model/Editor';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DElement } from './model/schema/DElement';

@Injectable({
  providedIn: 'root'
})
export class StateSelectionService {

  private editor: Editor;

  private selected: SElement;
  selectedData$: Observable<DElement>;
  selectedGraphic$: Observable<GElement>;

  constructor() { }

  initEditor(svgId: string): Editor {
    this.editor = new Editor(svgId);

    this.editor.buildChildren();
    this.editor.draw();

    // expose streams
    this.selectedData$ = this.editor.dataSelectedChange$;
    this.selectedGraphic$ = this.editor.graphicSelectedChange$;

    return this.editor;
  }

}
