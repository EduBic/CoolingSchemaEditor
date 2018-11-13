import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PureSvgEditorComponent } from './pure-svg-editor.component';

describe('PureSvgEditorComponent', () => {
  let component: PureSvgEditorComponent;
  let fixture: ComponentFixture<PureSvgEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PureSvgEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PureSvgEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
