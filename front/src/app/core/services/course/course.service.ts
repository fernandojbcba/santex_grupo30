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
export class CourseService {
  public user!: User;
  constructor(
    public http: ApiService,
    public cookieService: CookieService,
    public router: Router,
    public dialog: MatDialog,
  ) {}

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    if (params) {
      url += '?' + params.toString();
    }
    return this.http.get<T>(url);
  }

  public createCourse<T>(course: any): Observable<T> {
    return this.http.post<T>('/courses', course);
  }

  public updateCourse<T>(courseId: number, editedCourse: any): Observable<T> {
    const url = `/courses/${courseId}`;
    const body = editedCourse;
    return this.http.put<T>(url, body);
  }

  public deleteCourse<T>(courseId: number): Observable<T> {
    const url = `/courses/${courseId}`;
    return this.http.delete<T>(url);
  }
}
