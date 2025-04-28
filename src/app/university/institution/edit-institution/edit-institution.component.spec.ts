import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionComponent } from './edit-institution.component';

describe('EditInstitutionComponent', () => {
  let component: EditInstitutionComponent;
  let fixture: ComponentFixture<EditInstitutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInstitutionComponent]
    });
    fixture = TestBed.createComponent(EditInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
