import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseManagement } from './house-management';

describe('HouseManagement', () => {
  let component: HouseManagement;
  let fixture: ComponentFixture<HouseManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
