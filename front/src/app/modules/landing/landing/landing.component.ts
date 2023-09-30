import {Component, OnInit, AfterViewInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {



  images: string[] = [
    '../../../../assets/img/slide3/1.jpeg',
    '../../../../assets/img/slide3/2.jpeg',
    '../../../../assets/img/slide3/3.jpeg',
    '../../../../assets/img/slide3/4.jpeg',
    '../../../../assets/img/slide3/5.jpeg',
    '../../../../assets/img/slide3/6.jpeg',
 
  ];
  constructor(private router:Router) { }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

  }
  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
