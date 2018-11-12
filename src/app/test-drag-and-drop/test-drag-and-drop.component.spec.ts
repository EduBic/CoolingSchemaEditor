import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDragAndDropComponent } from './test-drag-and-drop.component';

describe('TestDragAndDropComponent', () => {
  let component: TestDragAndDropComponent;
  let fixture: ComponentFixture<TestDragAndDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDragAndDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
