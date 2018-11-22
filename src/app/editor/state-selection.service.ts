import { Injectable } from '@angular/core';
import { GElement } from './model/schema/GElement';
import { SElement } from './model/schema/SElement';
import { Editor } from './model/Editor';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateSelectionService {

  private editor: Editor;

  private selected: SElement;
  selectedElement$: Observable<SElement>;

  constructor() { }

  initEditor(svgId: string): Editor {
    this.editor = new Editor(svgId);

    this.editor.buildChildren();
    this.editor.draw();

    // expose stream
    this.selectedElement$ = this.editor.select$.pipe(
      tap(this.log),
      // map(selected => selected !== this.selected ? selected : undefined)
    );

    return this.editor;
  }

  private log(x) {
    console.log('State Selection Service stream', x);
  }
}
