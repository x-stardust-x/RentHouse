import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontNewsComponent } from './front-news-component';

describe('FrontNewsComponent', () => {
  let component: FrontNewsComponent;
  let fixture: ComponentFixture<FrontNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontNewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontNewsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
