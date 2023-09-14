import { Injectable } from '@angular/core';
import { ApiService } from '../../http/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { MatDialog } from '@angular/material/dialog';


import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    public http: ApiService,
    public cookieService: CookieService,
    public router: Router,
    public dialog: MatDialog,
  ) {
    
  }
  public post<T>(url: string, body: any): Observable<T>{
    
    
    return this.http.post<T>(url, body);
    
  }


}