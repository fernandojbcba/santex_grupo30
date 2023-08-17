import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*  Este servicio se encargará de obtener los datos de los cursos del backend o una base de datos. */

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

/*    obtener datos de los cursos  */
  getCourses(): Observable<any> {
    return this.http.get('http://localhost:3000/courses/list');
  }
  /* Inscripcion que hace un solicitud POST  para inscribir al usuario en el curso con el id especificado */
  /* register(idCourse: number) {
    if (confirm('¿Estás seguro de que quieres inscribirte en este curso?')) {
      this.http.post(`/curso/inscripcion/${idCourse}`, {})
    }
  }*/
} 
