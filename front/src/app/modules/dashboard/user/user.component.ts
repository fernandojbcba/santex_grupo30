import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { UserCreateDialogComponent } from './user-create-dialog/user-create-dialog.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allUsers: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'username', 'email', 'rol', 'edit' , 'delete']; 
  constructor(private userService:UserService, private toastService:ToastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers()
  }
  loadUsers(){
    this.userService.get<any>('/user/list').subscribe(
      data => {
        this.allUsers=data;
      },
      error => {
       
      }
    );
    
  }
  delete(userId:number){
    this.userService.deleteUser(userId)
    .subscribe(
      (res: any) => {
        this.toastService.UserCreateok("Usuario borrado Correctamente");
        this.loadUsers()
        
      },
      
    )
  }
  openEditDialog(user: any) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px', // Ancho del diálogo
      data: user // Pasa los datos del usuario al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        
        this.loadUsers();
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        
        this.loadUsers();
      }
    });
  }
}
