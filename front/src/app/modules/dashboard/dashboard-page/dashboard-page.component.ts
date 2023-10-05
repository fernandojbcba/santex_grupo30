import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component,  OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

export class DashboardPageComponent implements  OnInit{
  isMobile: boolean = false;
  adminlog:boolean = false;
  teacherlog:boolean = false;
  dateUser?: string | { id: any; user: any; role: any; };
  id: any;
  user: any;
  role: any;
  

  @ViewChild(MatSidenav) sidenav!: MatSidenav; // Obtengo una referencia a MatSidenav 

  constructor(
    private authService: AuthService,
    private breakpointObserver :BreakpointObserver
    ) {

  }
  ngOnInit(): void {

    // Observo cambios en el breakpoint de resolución
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small]) // Defino breakpoints
        .subscribe((result) => {
        this.isMobile = result.matches;
      });


    this.dateUser = this.authService.loadUser2();

    if (typeof this.dateUser === 'object') {
      this.id = this.dateUser.id;
      this.user = this.dateUser.user;
      this.role = this.dateUser.role;
    } else {
      
    }
    if (this.role === 'admin'){
      this.adminlog = true;
    };
    if (this.role === 'teacher'){
      this.teacherlog = true;
    }
  }
  logout() {
    this.authService.logOut();
  }

   // Define el método toggleSidenav para abrir y cerrar el menú lateral
   toggleSidenav() {
    this.sidenav.toggle();
  }
  closeSidenav() {
    this.sidenav.close();
  }

}
