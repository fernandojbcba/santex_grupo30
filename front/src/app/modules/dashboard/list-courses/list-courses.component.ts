import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/http/api.service'
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],

})
export class ListCoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private http:ApiService, private http2:UserService, private router:Router,) {}

  ngOnInit() {
    this.http.get<any>('/courses/list').subscribe(
      data => {
        this.courses=data;
      },
      error => {
        
      }
    );
  }
  register(idcourse: any) {
    if (confirm('¿Estás seguro de que quieres inscribirte en este curso?')) {
      this.http2.post<any>('/courses/enrolled/usercourse', idcourse).subscribe(
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