import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalMatchingDetailComponent } from './rental-matching-detail-component';

describe('RentalMatchingDetailComponent', () => {
  let component: RentalMatchingDetailComponent;
  let fixture: ComponentFixture<RentalMatchingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalMatchingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalMatchingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
