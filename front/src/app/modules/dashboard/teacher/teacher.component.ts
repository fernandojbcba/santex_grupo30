import { Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'
import { CourseService } from 'src/app/core/services/course/course.service';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from 'src/app/core/interfaces/courses/course.interface';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit, AfterViewInit {
  StatusCourse:any[] = [];
  myCourses: any[] = [];
  selectedCourse: number = 0 ;
  adminlog:boolean = false;
  teacherlog:boolean = false;
  dateUser?: string | { id: any; user: any; role: any; };
  id: any;
  user: any;
  role: any;
   // Definir las columnas a mostrar en la tabla
   displayedColumns: string[] = ['title', 'start', 'end', 'status', 'actions', 'initEndCourse'];

   // Fuente de datos para la tabla
   dataSource= new MatTableDataSource<Course>();

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
  constructor(private http:UserService, private courseService:CourseService, private authService:AuthService,private router: Router, ) { }

  ngOnInit(): void {
    
    this.loadrol();
    this.loadcourses();
   
  }
  ngAfterViewInit() {
    this.getCourseStatuses();
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
  public loadrol(){
    this.dateUser = this.authService.loadUser2();

    if (typeof this.dateUser === 'object') {
      this.id = this.dateUser.id;
      this.user = this.dateUser.user;
      this.role = this.dateUser.role;
    } else {
      
    }
    if (this.role === 'admin'){
      this.adminlog = true;
    };
    if (this.role === 'teacher'){
      this.teacherlog = true;
    }
  }
  
 public loadcourses(){
  if (this.adminlog) {
    this.courseService.get<any>('/courses/list').subscribe(
      (data) => {
        this.dataSource.data = data;
       
      },
      (error) => {
        console.log(error);
      }
    );
  }
  if (this.teacherlog) {

    this.http.get<any>('/teacher/enrolled/:id').subscribe(
      (data) => {
        const courses = data.map((item: { course: any; }) => item.course);
        this.dataSource.data = courses;
    
      },
      (error) => {
        
      }
    );}
 }
 
 public Students(courseId: number): void {
  const url = `/dashboard/students/${courseId}`;
  this.router.navigate([url]);
}
public startCourse(courseId: number): void {
  const currentDate = new Date();
  const formattedDate = this.formatDateToDDMMYY(currentDate);
  const data = {
    startCourse: currentDate,
  };
  this.courseService.StartCourse<any>(courseId, data).subscribe(
    (data) => {
      this.loadcourses()
      console.log('Course started successfully:', data);
    },
    (error) => {
      console.error('Error starting course:', error);
    }
  );
}

public endCourse(courseId: number): void {
  const currentDate = new Date();
  const formattedDate = this.formatDateToDDMMYY(currentDate);
  const data = {
    endCourse: currentDate,
  };
  this.courseService.EndCourse<any>(courseId, data).subscribe(
    (data) => {
      this.loadcourses()
    },
    (error) => {
      
      console.error('Error ending course:', error);
    }
  );
}

public getCourseStatuses(): void {
  this.courseService.courseStatus<any>().subscribe(
    (data) => {
      this.StatusCourse= data
    },
    (error) => {
      console.error('Error getting course statuses:', error);
    }
  );
}

public formatDateToDDMMYY(date:any) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear().toString().slice(-2); 

  return `${day}/${month}/${year}`;
}
getStatusCourseName(statuscourseId: number): string {

  const status = this.StatusCourse.find(status => status.id === statuscourseId);
  return status ? status.name : 'Desconocido';
}
}
