/* VER README */
import { Injectable } from '@angular/core';
/*import { HttpClient } from '@angular/common/http';BACK*/
import { Observable, of } from 'rxjs';

/*  Este servicio se encargará de obtener los datos de los cursos del backend o una base de datos. */

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: any[] = [
    {
      id: 1,
      name: "Curso de Angular",
      description: "Aprende a construir aplicaciones con Angular.",
      cupos: 30
    },
    {
      id: 2,
      name: "Curso de React",
      description: "Domina la creación de componentes con React.",
      cupos: 25
    }
  ];

  constructor() { }

  getCourses(): Observable<any[]> {
    return of(this.courses);
  }

  register(idCourse: number) {
    if (confirm('¿Estás seguro de que quieres inscribirte en este curso?')) {
      alert('Inscripción exitosa!');
    }
  }
  /*constructor(private http: HttpClient) { }

   obtener datos de los cursos 
  getCourses(): Observable<any> {
    return this.http.get('/database/courses');
  }*/
  /* Inscripcion que hace un solicitud POST  para inscribir al usuario en el curso con el id especificado
  register(idCourse: number) {
    if (confirm('¿Estás seguro de que quieres inscribirte en este curso?')) {
      this.http.post(`/curso/inscripcion/${idCourse}`, {}).subscribe(() => {
        alert('Inscripción exitosa!');
      });
    }
  }*/
}
