import { TestBed } from '@angular/core/testing';

import { CalendarLinkService } from './calendar-link-service';

describe('CalendarLinkService', () => {
  let service: CalendarLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
