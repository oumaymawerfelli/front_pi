import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityHomeComponent } from './university-home.component';

describe('UniversityHomeComponent', () => {
  let component: UniversityHomeComponent;
  let fixture: ComponentFixture<UniversityHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversityHomeComponent]
    });
    fixture = TestBed.createComponent(UniversityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
