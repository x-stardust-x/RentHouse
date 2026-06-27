import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseManagementComponent } from './house-management';

describe('HouseManagementComponent', () => {
  let component: HouseManagementComponent;
  let fixture: ComponentFixture<HouseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
