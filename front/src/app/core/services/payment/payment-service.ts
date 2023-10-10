import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
    private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  initiatePayment(title: string,courseprice: number): Observable<string> {
    const url = `${this.apiUrl}/payments/create-order`;
    
    // Envía una solicitud al backend para iniciar el proceso de pago
    return this.http.post<string>(url, { title, courseprice });

  }
}
