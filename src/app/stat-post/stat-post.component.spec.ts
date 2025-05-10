import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPostComponent } from './stat-post.component';

describe('StatPostComponent', () => {
  let component: StatPostComponent;
  let fixture: ComponentFixture<StatPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatPostComponent]
    });
    fixture = TestBed.createComponent(StatPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
