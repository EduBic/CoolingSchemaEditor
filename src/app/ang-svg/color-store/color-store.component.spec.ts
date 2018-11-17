import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorStoreComponent } from './color-store.component';

describe('ColorStoreComponent', () => {
  let component: ColorStoreComponent;
  let fixture: ComponentFixture<ColorStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
