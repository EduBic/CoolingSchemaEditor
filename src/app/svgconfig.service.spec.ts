import { TestBed } from '@angular/core/testing';

import { SVGConfigService } from './ang-svg/svgconfig.service';

describe('SVGConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SVGConfigService = TestBed.get(SVGConfigService);
    expect(service).toBeTruthy();
  });
});
