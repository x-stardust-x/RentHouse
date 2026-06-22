import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorCurrentMatchesComponent } from './lessor-current-matches-component';

describe('LessorCurrentMatchesComponent', () => {
  let component: LessorCurrentMatchesComponent;
  let fixture: ComponentFixture<LessorCurrentMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessorCurrentMatchesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessorCurrentMatchesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
