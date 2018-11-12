import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlGroupItemsComponent } from './html-group-items.component';

describe('HtmlGroupItemsComponent', () => {
  let component: HtmlGroupItemsComponent;
  let fixture: ComponentFixture<HtmlGroupItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlGroupItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlGroupItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
