import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service'; 
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/interfaces/courses/course.interface';
import {AuthService} from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],

})
export class ListCoursesComponent implements OnInit {
  adminlog:boolean = false;
  teacherlog:boolean = false;
  userlog:boolean = false;
  dateUser?: string | { id: any; user: any; role: any; };
  id: any;
  user: any;
  role: any;
  courses: any[] = [];
  constructor(private courseService:CourseService, private userService:UserService, private router:Router, private authService:AuthService) {}

  ngOnInit() {
  this.loadrol();

  this.listcourse();

  
  }

 loadrol(){
    this.dateUser = this.authService.loadUser2();

    if (typeof this.dateUser === 'object') {
      this.id = this.dateUser.id;
      this.user = this.dateUser.user;
      this.role = this.dateUser.role;
    } else {
      
    }
    if (this.role === 'admin'){
      this.adminlog = true;
      this.router.navigate(['dashboard/courseedit']);
    };
    if (this.role === 'teacher'){
      this.teacherlog = true;
      this.router.navigate(['dashboard/teacher']);

    }
    if (this.role === 'user'){
      this.userlog = true;
    }
  }
  listcourse(){
    this.courseService.get<Course[]>('/courses/list').subscribe(
      data => {
        this.courses = data.filter(Course => Course.isPublished === true);
      
      }
    );
  }
  register(idcourse: any) {
    if (confirm('¿Estás seguro de que quieres inscribirte en este curso?')) {
      this.userService.post<any>('/courses/enrolled/usercourse', idcourse).subscribe(
        data => {
          alert('Inscripción exitosa!');
          this.router.navigateByUrl('/dashboard/my_courses');
        },
        error => {
         
          alert(error.error.error);

          
        }
      ); 
    }
  }
}