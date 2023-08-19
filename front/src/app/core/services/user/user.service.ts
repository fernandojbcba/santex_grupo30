import { Injectable } from '@angular/core';
import { ApiService } from '../../http/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { MatDialog } from '@angular/material/dialog';

import { User } from '../../interfaces/users/user.interface';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user!: User;
  
  constructor(
    public http: ApiService,
    public cookieService: CookieService,
    public router: Router,
    public dialog: MatDialog,
  ) {
    
  }


  public get<T>(url: string, params?: HttpParams): Observable<T> {
    
    const userStr = this.cookieService.get('user');
    
    const user = JSON.parse(userStr);

    const userId = user.id;
    console.log(userId)
   
   
    url = url.replace(':id', userId);
    
    
    
    return this.http.get<T>(url);
    
  }
}