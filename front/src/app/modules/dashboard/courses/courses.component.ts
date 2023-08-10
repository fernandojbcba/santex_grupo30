import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private courseService: CourseService) { }
  
  courses: any[] = [];

  /* intenta obtener una lista de cursos utilizando el servicio courseService. Si la obtención de cursos es exitosa, los cursos se asignan a la propiedad courses del componente. De lo contrario se registra error por consola*/ 

  async ngOnInit(): Promise<void> {
    try {
      const fetchedCourses = await this.courseService.getCourses().toPromise();
      // Verifica si fetchedCourses es undefined antes de asignarlo a courses
      if (fetchedCourses !== undefined) {
        this.courses = fetchedCourses;
      }
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    }
  }

  register(idCourse: number) {
    this.courseService.register(idCourse);
  }
}
