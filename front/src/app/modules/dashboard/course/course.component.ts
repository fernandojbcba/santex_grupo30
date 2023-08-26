import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseEditDialogComponent } from './course-edit-dialog/course-edit-dialog.component'; 
import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component'; 

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseEditComponent implements OnInit {
  
  
  allCourses: any[] = [];
  displayedColumns: string[] = [ 'title', 'description', 'daysAndHours', 'duration', 'price', 'isPublished', 'edit', 'delete'];
  constructor(private courseService:CourseService, private toastService:ToastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCourses()
  }
  loadCourses(){
    this.courseService.get<any>('/courses/list').subscribe(
      data => {
        this.allCourses=data;
      },
      error => {
       
      }
    );
    
  }
  delete(courseId:number){
    this.courseService.deleteCourse(courseId)
    .subscribe(
      (res: any) => {
        this.toastService.UserCreateok("Curso borrado Correctamente");
        this.loadCourses()
        
      },
      
    )
  }
  openEditDialog(course: any) {
    console.log(course)
    const dialogRef = this.dialog.open(CourseEditDialogComponent, {
      width: '400px', // Ancho del diálogo
      data: course 
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        
        this.loadCourses();
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CourseCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        
        this.loadCourses();
      }
    });
  }
}
