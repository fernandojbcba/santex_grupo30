import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileData: any = {
    userName: 'UsuarioEjemplo',
    firstName: 'NombreEjemplo',
    lastName: 'ApellidoEjemplo',
    email: 'ejemplo@example.com',
  };
  newPassword: string = '';
  confirmPassword: string = '';
  newEmail: string = '';
  confirmEmail: string = '';
  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group(
      {
        firstName: [this.profileData.firstName, Validators.required],
        lastName: [this.profileData.lastName, Validators.required],
        email: [
          this.profileData.email,
          [Validators.required, Validators.email],
        ],
        newEmail: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        newPassword: [''],
        confirmPassword: [''],
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      (data) => {
        this.profileData = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  passwordsMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      return { passwordsNotMatch: true };
    }

    return null;
  }
  emailsMatchValidator(formGroup: FormGroup) {
    const newEmail = formGroup.get('newEmail');
    const confirmEmail = formGroup.get('confirmEmail');

    if (newEmail !== confirmEmail) {
      return { emailsNotMatch: true };
    }

    return null;
  }

  get email() {
    return this.profileForm.get('email');
  }

  get newPasswordControl() {
    return this.profileForm.get('newPassword');
  }
  updateProfile() {
    if (this.profileForm.valid) {
      const passwordsMatch = this.newPassword === this.confirmPassword;
      const emailsMatch = this.newEmail === this.confirmEmail;

      if (passwordsMatch && emailsMatch) {
        console.log('Perfil actualizado:', this.profileForm.value);
      } else {
        console.log('Las contraseñas o emails no coinciden.');
      }
    } else {
      console.log('Formulario no válido. Revisa los campos.');
    }
  }
}
