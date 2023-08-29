import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service'
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { UserCreateDialogComponent } from './user-create-dialog/user-create-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/core/interfaces/users/user.interface';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = ['firstname', 'lastname', 'username', 'email', 'rol', 'button' ]; 
  dataSource = new MatTableDataSource<Users>();

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService:UserService, private toastService:ToastService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.loadUsers()
  }
  loadUsers() {
    this.userService.get<any>('/user/list').subscribe(
      (data: Users[]) => {
        this.dataSource.data = data; // Assign the array of users to the data source
      },
      error => {
        // Handle error if needed
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  delete(userId:number){
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    this.userService.deleteUser(userId)
    .subscribe(
      (res: any) => {
        this.toastService.UserCreateok("Usuario borrado Correctamente");
        this.loadUsers()
        
      },
      
    )
  }
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
