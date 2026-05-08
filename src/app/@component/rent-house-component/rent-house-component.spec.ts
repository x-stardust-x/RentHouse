import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentHouseComponent } from './rent-house-component';

describe('RentHouseComponent', () => {
  let component: RentHouseComponent;
  let fixture: ComponentFixture<RentHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentHouseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RentHouseComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
