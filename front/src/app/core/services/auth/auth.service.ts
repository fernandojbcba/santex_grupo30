import { Injectable } from '@angular/core';
import { ApiService } from '../../http/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthResponse } from '../../interfaces/auth/auth.interface'
import { User } from '../../interfaces/users/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user!: User;
  private timer: Subscription = new Subscription;

  constructor(
    public http: ApiService,
    public cookieService: CookieService,
    public router: Router,
    public dialog: MatDialog,
  ) {
    this.loadUser();
  }

  public login(email: string, password: string) {
    const body = {
      email,
      password,
    };

    return this.http.post('/login', body);
  }
  public register(RegisterData: string) {
    const body = RegisterData
    return this.http.post('/login/register', body);
  }
  /**
   * setUser
   * @param user Server user response.
   */
  public setUser(userAuthData: UserAuthResponse): void {
    this.user = userAuthData.user;

    const userJson = JSON.stringify(userAuthData.user);
    const { token } = userAuthData;

    this.cookieService.set('user', userJson, undefined, '/', undefined, false, 'Strict');
    this.cookieService.set('token', token, undefined, '/', undefined, false, 'Strict');

    // Set Authorization Header for all requests.
    this.http.setHeader('Authorization', `Bearer ${token}`);
  }

  /**
   * loadUser
   */
  public loadUser(): void {
    const user = this.cookieService.get('user');
    const token = this.cookieService.get('token');

    if (user && token) {
      try {
        this.user = JSON.parse(user);
      } catch (err) {
        this.logOut();
        return;
      }
      this.http.setHeader('Authorization', `Bearer ${token}`);
    }
  }
  public loadUser2() {
    const token = this.cookieService.get('token');
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const { id, user, role } = payload;
        return{ id, user, role }
      } else {
        console.error('Invalid token format');
      }
    } else {
      console.error('Token not found');
    }
    return token;
  }
  public isLoggedIn(): boolean {
      return !!this.cookieService.get('user');
  }

  public logOut(): void {
    this.dialog.closeAll();
    this.user = {id: 0, username: '', createdAt: new Date(), updatedAt: new Date() };
    this.cookieService.delete('user');
    this.cookieService.delete('token');
    this.cookieService.deleteAll('/',);

    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.router.navigateByUrl('');
  }
}
