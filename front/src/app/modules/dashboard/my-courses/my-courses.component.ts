import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'
import { Course } from 'src/app/core/interfaces/courses/course.interface';
import { PaymentService } from 'src/app/core/services/payment/payment-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  myCourses: any[] = [];
  displayedColumns: string[] = ['title', 'description','daysandhr','duration','estado', 'cancel']; 
  constructor(private http:UserService,private router: Router, private authService: AuthService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.http.get<any>('/courses/enrolled/:id').subscribe(
      (data) => {
        this.myCourses=data;
        console.log(data);
      },
      error => {
        console.error('Error al obtener cursos:', error);
      }
    );
    
  }
  payForCourse(course: Course) {
    if (course.price !== undefined) {
      const courseprice: number = course.price;
      console.log('Datos de la solicitud de pago:', courseprice);
      // Llama al servicio de pago para iniciar el proceso de pago
      this.paymentService.initiatePayment(courseprice).subscribe(
        (response: any) => {
          if (response && response.order) {
            const orderUrl = response.order;
            console.log('URL de pago recibida:', orderUrl);
            // Redirige al usuario a la página de pago de MercadoPago
            window.location.href = orderUrl;
          } else {
            console.error('Respuesta de pago incorrecta:', response);
            // Handle the case where the response does not contain the expected order URL.
            // You can display an error message to the user or take appropriate action.
          }
        },
        (error: any) => {
          console.error('Error al iniciar el proceso de pago:', error);
          alert('Error al iniciar el proceso de pago. Por favor, inténtalo más tarde.');
        }
      );
      
  }
  
}
}
