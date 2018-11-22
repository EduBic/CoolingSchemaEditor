import { TestBed } from '@angular/core/testing';

import { StateSelectionService } from './state-selection.service';

describe('StateSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateSelectionService = TestBed.get(StateSelectionService);
    expect(service).toBeTruthy();
  });
});
