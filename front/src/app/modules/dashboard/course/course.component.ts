import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/core/services/course/course.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Course } from 'src/app/core/interfaces/courses/course.interface';
import { CourseEditDialogComponent } from './course-edit-dialog/course-edit-dialog.component';
import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
  dataSource: Course[] = [];
  dataTeacher: any[] = [];
  filteredDataSource: Course[] = [];
  displayedColumns: string[] = ['title', 'description', 'daysAndHours', 'duration', 'price', 'isPublished', 'button'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private courseService: CourseService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadTeacher();
  }

  ngAfterViewInit() {
    this.filteredDataSource = this.dataSource;
    this.paginator.page.subscribe(() => {
      this.applyFilter(null as any);
    });
    this.sort.sortChange.subscribe(() => {
      this.applyFilter(null as any);
      this.paginator.firstPage();
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredDataSource = this.dataSource.filter(course =>
      course.title.toLowerCase().includes(filterValue) ||
      course.description.toLowerCase().includes(filterValue)
    );
    this.paginator.firstPage();
  }
  loadTeacher() {
    this.courseService.get<any>('/user/teachers').subscribe(
      (data: Course[]) => {
        this.dataTeacher = data;
      },
      error => {
        // Manejar el error
      }
    );
  }

  loadCourses() {
    this.courseService.get<any>('/courses/list').subscribe(
      (data) => {
        this.dataSource = data;
        this.filteredDataSource = data;
      },
      error => {
        // Manejar el error
      }
    );
  }

  delete(courseId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      this.courseService.deleteCourse(courseId).subscribe(
        (res: any) => {
          this.toastService.UserCreateok("Curso borrado Correctamente");
          this.loadCourses();
        },
        error => {
          // Manejar el error
        }
      );
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
  private sortData() {
    // Función para ordenar los datos según el criterio de clasificación (si es necesario)
  }
}
