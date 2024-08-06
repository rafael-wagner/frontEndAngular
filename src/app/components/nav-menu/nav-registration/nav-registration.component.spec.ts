import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavRegistrationComponent } from './nav-registration.component';

describe('NavRegistrationComponent', () => {
  let component: NavRegistrationComponent;
  let fixture: ComponentFixture<NavRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
