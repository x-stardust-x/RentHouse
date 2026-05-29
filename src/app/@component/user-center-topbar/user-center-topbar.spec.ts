import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCenterTopbar } from './user-center-topbar';

describe('UserCenterTopbar', () => {
  let component: UserCenterTopbar;
  let fixture: ComponentFixture<UserCenterTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCenterTopbar],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCenterTopbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
