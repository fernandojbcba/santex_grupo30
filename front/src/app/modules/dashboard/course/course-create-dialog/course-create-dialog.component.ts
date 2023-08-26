import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CourseService } from 'src/app/core/services/course/course.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-create-dialog',
  templateUrl: './course-create-dialog.component.html',
  styleUrls: ['./course-create-dialog.component.css'],
})
export class CourseCreateDialogComponent implements OnInit, OnDestroy {
  public createForm = this.formBuilder.group({ commodity: [null] });
  formSubscriptions: Subscription = new Subscription();
  publicarOptions: string[] = ['Publicar', 'No_Publicar'];
 
 publicarMap= {
    Publicar: '1',
    No_Publicar: '0'
  }
  constructor(
    public dialogRef: MatDialogRef<CourseCreateDialogComponent>,
    private formBuilder: UntypedFormBuilder,
    private courseService: CourseService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCourseForm();
  }
 
  private createCourseForm() {
    this.createForm = this.formBuilder.group({
      title: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null, Validators.required),
      duration: new UntypedFormControl(null, Validators.required),
      daysAndHours: new UntypedFormControl(null, Validators.required),
      price: new UntypedFormControl(null, Validators.required),
      isPublished: new UntypedFormControl(false),
    });
  }
  
  createCourse() {
    const courseData = this.createForm?.value;
    const isPublished: keyof typeof this.publicarMap = courseData.isPublished;
    courseData.isPublished = this.publicarMap[isPublished];
      
    this.formSubscriptions.add(
      this.courseService.createCourse(courseData).subscribe(
        (res: any) => {
          this.toastService.presentToast('Curso Creado Correctamente');
          this.dialogRef.close('saved');
        },
        (err) => {
          this.toastService.presentToast('Error al crear el curso');
          console.error('Error al crear el curso:', err);
        }
      )
    );
  }

  public checkForm() {
    if (this.createForm.valid) {
      this.createCourse();
    }
  }

  ngOnDestroy(): void {
    this.formSubscriptions.unsubscribe();
  }
}
