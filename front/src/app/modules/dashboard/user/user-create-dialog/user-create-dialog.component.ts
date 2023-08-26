import { Component, OnInit,  OnDestroy } from '@angular/core';
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
} from '../../../../core/interfaces/users/user.interface';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.css']
})
export class UserCreateDialogComponent implements OnInit, OnDestroy{
  public registerForm = this.formBuilder.group({ commodity: [null] });
  formSubscritions: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<UserCreateDialogComponent>,
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.crearRegistroForm();
  }
  private crearRegistroForm() {
    this.registerForm  = this.formBuilder.group({
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
      this.userService.createUser(RegisterData)
        .subscribe(
          (res: any) => {
            this.toastService.UserCreateok("Usuario Creado Correctamente");
            this.dialogRef.close('saved'); 
            
          },
          (err) => {
            // 
           this.toastService.presentToast("eroor al crear usuario");
           console.error('Error al crear el usuario:', err);
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


