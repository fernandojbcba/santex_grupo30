import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  myCourses: any[] = [];
  selectedCourse: number = 0 ;

  constructor(private http:UserService) { }

  ngOnInit(): void {
    this.loadcourses();
    
  }
 public loadcourses(){
  this.http.get<any>('/teacher/enrolled/:id').subscribe(
    data => {
      this.myCourses=data;
    },
    error => {
    }
  );
 }


  showStudents(coursenumber: number): void {
    this.selectedCourse = coursenumber;
  }
}

