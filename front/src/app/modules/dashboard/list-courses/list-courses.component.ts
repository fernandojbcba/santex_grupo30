import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course/course.service'; 
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/interfaces/courses/course.interface';
@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],

})
export class ListCoursesComponent implements OnInit {
 
  courses: any[] = [];
  constructor(private courseService:CourseService, private userService:UserService, private router:Router,) {}

  ngOnInit() {
    
  this.listcourse();
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