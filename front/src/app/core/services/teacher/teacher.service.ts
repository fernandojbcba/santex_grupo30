import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../http/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(
    public http: ApiService,
    public cookieService: CookieService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    if (params) {
      url += '?' + params.toString();
    }
    return this.http.get<T>(url);
  }

  public post<T>(url:any, body:any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  public update<T>(courseId: number, editedCourse: any): Observable<T> {
    const url = `/courses/${courseId}`;
    const body = editedCourse;
    return this.http.put<T>(url, body);
  }

  public delete<T>(idrel: number): Observable<T> {
    const url = `/teacher/delete-teachercourse/${idrel}`;
    return this.http.delete<T>(url);
  }
}
