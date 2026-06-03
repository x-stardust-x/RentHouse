import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPermissin } from './contact-permissin';

describe('ContactPermissin', () => {
  let component: ContactPermissin;
  let fixture: ComponentFixture<ContactPermissin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPermissin],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPermissin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
