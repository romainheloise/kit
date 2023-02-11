import { TestBed } from '@angular/core/testing';

import { RHoldButtonService } from './r-hold-button.service';

describe('RHoldButtonService', () => {
  let service: RHoldButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RHoldButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
