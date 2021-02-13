import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumChangeComponent } from './curriculum-change.component';

describe('CurriculumChangeComponent', () => {
  let component: CurriculumChangeComponent;
  let fixture: ComponentFixture<CurriculumChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
