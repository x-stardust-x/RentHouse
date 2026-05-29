import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCenterSidebar } from './user-center-sidebar';

describe('UserCenterSidebar', () => {
  let component: UserCenterSidebar;
  let fixture: ComponentFixture<UserCenterSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCenterSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCenterSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
