import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearchComponent } from './edit-research.component';

describe('EditResearchComponent', () => {
  let component: EditResearchComponent;
  let fixture: ComponentFixture<EditResearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditResearchComponent]
    });
    fixture = TestBed.createComponent(EditResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
