import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBookingApprovalComponent } from './product-booking-approval-component';

describe('ProductBookingApprovalComponent', () => {
  let component: ProductBookingApprovalComponent;
  let fixture: ComponentFixture<ProductBookingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBookingApprovalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBookingApprovalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
