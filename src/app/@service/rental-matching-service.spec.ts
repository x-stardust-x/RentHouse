import { TestBed } from '@angular/core/testing';

import { RentalMatchingService } from './rental-matching-service';

describe('RentalMatchingService', () => {
  let service: RentalMatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalMatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
