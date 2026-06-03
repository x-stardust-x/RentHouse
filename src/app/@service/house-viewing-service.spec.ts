import { TestBed } from '@angular/core/testing';

import { HouseViewingService } from './house-viewing-service';

describe('HouseViewingService', () => {
  let service: HouseViewingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseViewingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
