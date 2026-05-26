import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHomiefunComponent } from './about-homiefun-component';

describe('AboutHomiefunComponent', () => {
  let component: AboutHomiefunComponent;
  let fixture: ComponentFixture<AboutHomiefunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutHomiefunComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutHomiefunComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
