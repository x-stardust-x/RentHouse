import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBookingApplicationTrackingComponent } from './product-booking-application-tracking-component';

describe('ProductBookingApplicationTrackingComponent', () => {
  let component: ProductBookingApplicationTrackingComponent;
  let fixture: ComponentFixture<ProductBookingApplicationTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBookingApplicationTrackingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBookingApplicationTrackingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
