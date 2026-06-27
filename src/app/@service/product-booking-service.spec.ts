import { TestBed } from '@angular/core/testing';

import { ProductBookingService } from './product-booking-service';

describe('ProductBookingService', () => {
  let service: ProductBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
