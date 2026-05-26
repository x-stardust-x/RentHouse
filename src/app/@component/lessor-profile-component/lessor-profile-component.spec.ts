import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorProfileComponent } from './lessor-profile-component';

describe('LessorProfileComponent', () => {
  let component: LessorProfileComponent;
  let fixture: ComponentFixture<LessorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessorProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessorProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
