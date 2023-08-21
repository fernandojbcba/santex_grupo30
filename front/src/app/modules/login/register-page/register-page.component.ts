import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  PASSWORD_PATTERN,
} from '../../../core/interfaces/users/user.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  public registerForm = this.formBuilder.group({});

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new UntypedFormControl(null, Validators.required),
      lastName: new UntypedFormControl(null, Validators.required),
      username: new UntypedFormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(MIN_USERNAME_LENGTH),
          Validators.maxLength(MAX_USERNAME_LENGTH),
        ])
      ),
      email: new UntypedFormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email, 
        ])
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
    if (this.registerForm.valid) {
      // TOOD llamar a la API y en caso de haber un error capturarlo y mostrarselo al usuario con un toastr como en el login
    }
  }
}
