import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyComponent } from './safety-component';

describe('SafetyComponent', () => {
  let component: SafetyComponent;
  let fixture: ComponentFixture<SafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafetyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
