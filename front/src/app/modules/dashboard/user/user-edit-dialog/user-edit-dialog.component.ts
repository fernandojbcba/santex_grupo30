import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {
  editForm: FormGroup;
  roleOptions: string[] = ['user', 'admin', 'teacher'];
  private roleMap = {
    admin: "1",
    user: "2",
    teacher: "3"
  };
  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.editForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      userName: [user.userName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      password:[user.password],
      RoleName:[user.roleName],
    });
  }

  onSaveChanges() {
    if (this.editForm.valid) {
      const editedUser = this.editForm.value;
      const roleName: keyof typeof this.roleMap = editedUser.RoleName;
      editedUser.RoleId = this.roleMap[roleName];
      delete editedUser.RoleName;
      this.userService.updateUser(this.user.id, editedUser).subscribe(
        (response) => {
          this.dialogRef.close('saved'); 
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }
}

