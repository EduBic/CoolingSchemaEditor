import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GElementPanelOptionsComponent } from './gelement-panel-options.component';

describe('GElementPanelOptionsComponent', () => {
  let component: GElementPanelOptionsComponent;
  let fixture: ComponentFixture<GElementPanelOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GElementPanelOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GElementPanelOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
