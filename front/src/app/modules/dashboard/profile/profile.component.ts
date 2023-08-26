import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/services/user/user.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  
  profileData: any;
  
  constructor(private userService: UserService) {}
 ngOnInit(): void {
    this.userService.getProfile().subscribe(
      (data) => {
        this.profileData = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}