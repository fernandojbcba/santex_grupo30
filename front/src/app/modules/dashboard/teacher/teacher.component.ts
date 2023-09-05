import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'
import { CourseService } from 'src/app/core/services/course/course.service';
import {AuthService} from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
 
  myCourses: any[] = [];
  selectedCourse: number = 0 ;
  adminlog:boolean = false;
  teacherlog:boolean = false;
  dateUser?: string | { id: any; user: any; role: any; };
  id: any;
  user: any;
  role: any;
  constructor(private http:UserService, private courseService:CourseService, private authService:AuthService) { }

  ngOnInit(): void {
    this.loadrol();
    this.loadcourses();
    
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
        this.myCourses = data;
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
        this.myCourses = courses;
      
      },
      (error) => {
        // Manejar el error
      }
    );}
 }


  showStudents(coursenumber: number): void {
    this.selectedCourse = coursenumber;
  }
}

