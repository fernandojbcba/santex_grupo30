import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  myCourses: any[] = [];
  displayedColumns: string[] = ['title', 'description','daysandhr','duration','estado', ]; //'cancel'
  constructor(private http:UserService) { }

  ngOnInit(): void {
    this.http.get<any>('/courses/enrolled/:id').subscribe(
      data => {
        this.myCourses=data;
        
      },
      error => {
       
      }
    );
    
  }
 
}

