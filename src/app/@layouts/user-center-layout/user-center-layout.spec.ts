import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCenterLayout } from './user-center-layout';

describe('UserCenterLayout', () => {
  let component: UserCenterLayout;
  let fixture: ComponentFixture<UserCenterLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCenterLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCenterLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
