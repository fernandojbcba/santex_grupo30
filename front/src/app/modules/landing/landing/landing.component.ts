import {Component, OnInit, AfterViewInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';


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
    '../../../../assets/img/slide3/5.jpg',
    '../../../../assets/img/slide3/6.jpeg',
 
  ];
  constructor() { }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

  }
  
}
