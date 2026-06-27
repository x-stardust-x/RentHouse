import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalMatchingComponent } from './rental-matching-component';

describe('RentalMatchingComponent', () => {
  let component: RentalMatchingComponent;
  let fixture: ComponentFixture<RentalMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalMatchingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalMatchingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
