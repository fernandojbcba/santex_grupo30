import { Component,  OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

export class DashboardPageComponent implements  OnInit{
  adminlog:boolean = false;
  dateUser?: string | { id: any; user: any; role: any; };
  id: any;
  user: any;
  role: any;
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    this.dateUser = this.authService.loadUser2();

    if (typeof this.dateUser === 'object') {
      this.id = this.dateUser.id;
      this.user = this.dateUser.user;
      this.role = this.dateUser.role;
    } else {
      
    }
    if (this.role === 'admin'){
      this.adminlog = true;
    }
  }
  logout() {
    this.authService.logOut();
  }
}
