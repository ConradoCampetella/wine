import { TestBed, inject } from '@angular/core/testing';

import { WinesService } from './wines.service';

describe('WinesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinesService]
    });
  });

  it('should be created', inject([WinesService], (service: WinesService) => {
    expect(service).toBeTruthy();
  }));
});
