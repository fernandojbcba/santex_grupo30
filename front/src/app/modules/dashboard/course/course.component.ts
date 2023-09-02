import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseEditDialogComponent } from './course-edit-dialog/course-edit-dialog.component'; 
import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/core/interfaces/courses/course.interface';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<Course>();
  dataTeacher:any[] = [];
  displayedColumns: string[] = [ 'title', 'description', 'daysAndHours', 'duration', 'price', 'isPublished', 'button' ];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private courseService:CourseService, private toastService:ToastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCourses()
    this.loadTeacher()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  loadTeacher(){  this.courseService.get<any>('/user/teachers').subscribe(
    (data: Course[]) => {
      this.dataTeacher = data; 
   
    },
    error => {
     
    }
  );}

  loadCourses(){
    this.courseService.get<any>('/courses/list').subscribe(
      (data: Course[]) => {
        this.dataSource.data = data; 
      },
      error => {
       
      }
    );
    
  }
  delete(courseId:number){
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      this.courseService.deleteCourse(courseId)
    .subscribe(
      (res: any) => {
        this.toastService.UserCreateok("Curso borrado Correctamente");
        this.loadCourses()
        
      },
      
    )
    }
    
  }
  openEditDialog(course: any) {
    const dialogRef = this.dialog.open(CourseEditDialogComponent, {
      width: '400px', 
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
