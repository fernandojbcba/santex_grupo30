import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  allUsers: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'username', 'email', 'edit' , 'delete']; 
  constructor(private http:UserService) { }

  ngOnInit(): void {
    this.http.get<any>('/user/list').subscribe(
      data => {
        this.allUsers=data;
      },
      error => {
       
      }
    );
    
  }

}
