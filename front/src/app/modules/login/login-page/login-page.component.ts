import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../../../../app/core/interfaces/users/user.interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public loginForm = this.formBuilder.group({ commodity: [null] });
  formSubscritions: Subscription = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.crearLoginForm();
  }

  private crearLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new UntypedFormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(MAX_USERNAME_LENGTH),
        ])
      ),
      password: new UntypedFormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(MAX_PASSWORD_LENGTH),
        ])
      ),
    });
  }

  public login(): void {
    const loginData = this.loginForm?.value;
    this.formSubscritions.add(
      this.authService.login(loginData.username, loginData.password)
        .subscribe(
          (res: any) => {
            this.authService.setUser(res);
            this.router.navigateByUrl('/dashboard');
          },
          (err) => {
            const { message } = err.error;
          
            if (err instanceof HttpErrorResponse) {
              if (!navigator.onLine) {
                this.toastService.presentToast("No hay conexión a Internet.");
              } else {
                if (err.status === 401) {
                  this.toastService.presentToast(message);
                } else {
                  this.toastService.presentToast("Error en la conexión.");
                }
              }
            }
          }
        )
    );
  }
  public checkForm() {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  ngOnDestroy(): void {
    this.formSubscritions.unsubscribe();
  }
}
