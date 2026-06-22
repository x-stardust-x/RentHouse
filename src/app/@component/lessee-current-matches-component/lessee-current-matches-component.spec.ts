import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesseeCurrentMatchesComponent } from './lessee-current-matches-component';

describe('LesseeCurrentMatchesComponent', () => {
  let component: LesseeCurrentMatchesComponent;
  let fixture: ComponentFixture<LesseeCurrentMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesseeCurrentMatchesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LesseeCurrentMatchesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
