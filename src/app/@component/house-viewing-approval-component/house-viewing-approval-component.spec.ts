import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseViewingApprovalComponent } from './house-viewing-approval-component';

describe('HouseViewingApprovalComponent', () => {
  let component: HouseViewingApprovalComponent;
  let fixture: ComponentFixture<HouseViewingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseViewingApprovalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HouseViewingApprovalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
