import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateDialogComponent } from './course-create-dialog.component';

describe('CourseCreateDialogComponent', () => {
  let component: CourseCreateDialogComponent;
  let fixture: ComponentFixture<CourseCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCreateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
