import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  PASSWORD_PATTERN,
} from '../../../core/interfaces/users/user.interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  public registerForm = this.formBuilder.group({ commodity: [null] });
  formSubscritions: Subscription = new Subscription();
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.crearRegistroForm();
  }
  private crearRegistroForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new UntypedFormControl(null, Validators.required),
      lastName: new UntypedFormControl(null, Validators.required),
      userName: new UntypedFormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(MIN_USERNAME_LENGTH),
          Validators.maxLength(MAX_USERNAME_LENGTH),
        ])
      ),
      email: new UntypedFormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new UntypedFormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(PASSWORD_PATTERN),
        ])
      ),
    });
  }

  register() {
    const RegisterData = this.registerForm?.value;
    this.formSubscritions.add(
      this.authService.register(RegisterData)
        .subscribe(
          (res: any) => {
            this.toastService.presentToast("Usuario Creado Correctamente");
            this.router.navigateByUrl('/login');
            
          },
          (err) => {
            // 
           this.toastService.presentToast("eroor al crear usuario");

          }
        )
    );
  }
  public checkForm() {
    if (this.registerForm.valid) {
      this.register();
    }
  }
  ngOnDestroy(): void {
    this.formSubscritions.unsubscribe();
  }
}
