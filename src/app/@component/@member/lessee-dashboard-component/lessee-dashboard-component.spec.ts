import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesseeDashboardComponent } from './lessee-dashboard-component';

describe('LesseeDashboardComponent', () => {
  let component: LesseeDashboardComponent;
  let fixture: ComponentFixture<LesseeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesseeDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LesseeDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
