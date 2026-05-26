import { TestBed } from '@angular/core/testing';

import { HouseFacilityService } from './house-facility-service';

describe('HouseFacilityService', () => {
  let service: HouseFacilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseFacilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
