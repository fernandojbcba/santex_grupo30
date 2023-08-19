import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/http/api.service'

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private http:ApiService) {}

  ngOnInit() {
    this.http.get<any>('/courses/list').subscribe(
      data => {
        this.courses=data;
      },
      error => {
        console.log(error)
      }
    );
  }
  register() {
    if (confirm('¿Estás seguro de que quieres inscribirte en este curso?')) {
      alert('Inscripción exitosa!');
    }

  }
}