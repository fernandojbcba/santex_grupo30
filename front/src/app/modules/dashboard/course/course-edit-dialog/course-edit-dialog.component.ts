import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.css']
})
export class CourseEditDialogComponent  {
  editForm: FormGroup;
  publicarOptions: string[] = ['Publicar', 'No_Publicar'];
 coursein:any;
 publicarMap= {
    Publicar: '1',
    No_Publicar: '0'
  }
  constructor(
    public dialogRef: MatDialogRef<CourseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course: any,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
  
   
  ) {
    this.coursein=course
    this.editForm = this.formBuilder.group({
      title: [course.title, Validators.required],
      description: [course.description, Validators.required],
      daysAndHours: [course.daysAndHours, Validators.required],
      duration: [course.duration, Validators.required],
      price:[course.price],
      isPublished:[course.isPublished],
    });
  }


  
  editCourse() {
    if (this.editForm.valid) {
    const courseData = this.editForm?.value;
    const isPublished: keyof typeof this.publicarMap = courseData.isPublished;
    courseData.isPublished = this.publicarMap[isPublished];

      this.courseService.updateCourse(this.course.id ,courseData).subscribe(
        (res: any) => {
          this.dialogRef.close('saved');
        },
        (err) => {
          console.error('Error al crear el curso:', err);
        }
      )
  }
}
}
  

  
  

