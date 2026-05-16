import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDashboradComponent } from './member-dashborad-component';

describe('MemberDashboradComponent', () => {
  let component: MemberDashboradComponent;
  let fixture: ComponentFixture<MemberDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberDashboradComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberDashboradComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
