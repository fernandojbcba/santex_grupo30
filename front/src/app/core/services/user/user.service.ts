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
  
   
   
    url = url.replace(':id', userId);
    
    
    
    return this.http.get<T>(url);
    
  }
  public post<T>(url: string,course:string): Observable<T> {
    
    const userStr = this.cookieService.get('user');
    const user = JSON.parse(userStr);
    const userId = user.id;
    const body = { "userId": userId, "courseId": course }
    
    
    return this.http.post<T>(url, body);
    
  }
  getProfile(): Observable<User> {
    return this.http.get<User>('/user/profile');
  }
  createUser(user: any): Observable<any> {
    return this.http.post<User>('/users', user);
  }


}