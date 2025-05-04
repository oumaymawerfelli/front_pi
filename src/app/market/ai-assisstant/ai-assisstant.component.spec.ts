import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAssisstantComponent } from './ai-assisstant.component';

describe('AiAssisstantComponent', () => {
  let component: AiAssisstantComponent;
  let fixture: ComponentFixture<AiAssisstantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiAssisstantComponent]
    });
    fixture = TestBed.createComponent(AiAssisstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
