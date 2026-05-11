import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact'; 

describe('ContactComponent', () => { // (字串順便改一下比較統一)
  
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [ContactComponent],
    }).compileComponents();

    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
