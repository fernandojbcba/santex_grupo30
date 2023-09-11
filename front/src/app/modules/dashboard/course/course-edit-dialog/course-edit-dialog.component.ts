import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/core/interfaces/courses/course.interface';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.css'],
})
export class CourseEditDialogComponent implements OnInit {
  
  dataTeacher: any[] = [];
  editForm: FormGroup;
  teacherForm: FormGroup;
  teacherDataLog:boolean=false;
  publicarOptions: string[] = ['Publicar', 'No_Publicar'];
  coursein: any;
  publicarMap = {
    Publicar: '1',
    No_Publicar: '0',
  }
  teacherData: {
    id: number;
    TeacherCourseId: number;
    User: {
      id: number;
      UserName: string;
    };
  } = {
    id: 0,
    TeacherCourseId: 0,
    User: {
      id: 0,
      UserName: '',
    },
  }
  constructor(
    public dialogRef: MatDialogRef<CourseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course: any,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private teacherService: TeacherService
  ) {
    this.coursein = course;
    const initialIsPublishedValue = course.isPublished === true ? 'Publicar' : 'No_Publicar';
    this.editForm = this.formBuilder.group({
      title: [course.title, Validators.required],
      description: [course.description, Validators.required],
      daysAndHours: [course.daysAndHours, Validators.required],
      duration: [course.duration, Validators.required],
      price: [course.price],
      isPublished: [initialIsPublishedValue],
    });
    this.teacherForm = this.formBuilder.group({
      teacherId: [''],
    });
  }
  ngOnInit(): void {
    this.loadteacherforcourse()
    this.loadTeacher();
  }
  loadTeacher() {
    this.courseService.get<any>('/user/teachers').subscribe(
      (data: Course[]) => {
        this.dataTeacher = data;
      },
      (error) => {}
    );
  }
  loadteacherforcourse() {
    const url = `/teacher/getTeacher/${this.course.id}`;

    this.courseService.get<any>(url).subscribe(
      (data) => {
       this.teacherData = data;
       this.teacherDataLog=true;
      
      },
      (error) => {
     this.teacherDataLog=false;
      }
    );
  }
 addTeacherCourse(){
  const courseId = this.course.id;
  const teacherId =  parseInt(this.teacherForm.value.teacherId, 10);
   const url = `/teacher/enrolled/teachercourse`;
   const body = {
     userId : teacherId,
     teacherCourseId:courseId
   }
   this.teacherService.post<any>(url, body).subscribe(
     (data) => {
      this.loadteacherforcourse();
     },
     (error) => {}
   );
 
 }
 deleteTeacherCourse(){
  const idrel = this.teacherData.id;
   this.teacherService.delete<any>(idrel).subscribe(
    (res: any) => {
      // this.dialogRef.close('saved');
      this.loadteacherforcourse();
    },
    (err) => {
      console.error('Error al borrar el profesor:', err);
    }
  );
}
 

  editCourse() {
    if (this.editForm.valid) {
      const courseData = this.editForm?.value;
      const isPublished: keyof typeof this.publicarMap = courseData.isPublished;
      courseData.isPublished = this.publicarMap[isPublished];

      this.courseService.updateCourse(this.course.id, courseData).subscribe(
        (res: any) => {
          this.dialogRef.close('saved');
        },
        (err) => {
          console.error('Error al crear el curso:', err);
        }
      );
    }
  }


}
