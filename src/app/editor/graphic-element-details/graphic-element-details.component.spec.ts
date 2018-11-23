import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicElementDetailsComponent } from './graphic-element-details.component';

describe('GraphicElementDetailsComponent', () => {
  let component: GraphicElementDetailsComponent;
  let fixture: ComponentFixture<GraphicElementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicElementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
