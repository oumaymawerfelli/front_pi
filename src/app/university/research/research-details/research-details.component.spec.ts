import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDetailsComponent } from './research-details.component';

describe('ResearchDetailsComponent', () => {
  let component: ResearchDetailsComponent;
  let fixture: ComponentFixture<ResearchDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchDetailsComponent]
    });
    fixture = TestBed.createComponent(ResearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
