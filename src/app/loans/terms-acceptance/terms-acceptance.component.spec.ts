import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAcceptanceComponent } from './terms-acceptance.component';

describe('TermsAcceptanceComponent', () => {
  let component: TermsAcceptanceComponent;
  let fixture: ComponentFixture<TermsAcceptanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsAcceptanceComponent]
    });
    fixture = TestBed.createComponent(TermsAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
