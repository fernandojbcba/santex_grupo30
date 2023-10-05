import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
  })
export class ToastService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private toastController: MatSnackBar) {}
  
  public presentToast(message: string): void {
    this.toastController.open(message, 'Entendido' ,{duration: 2000,horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,});
  }
  public UserCreateok(message: string): void {
    this.toastController.open(message, 'Entendido' ,{duration: 2000, horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,});
  }
}