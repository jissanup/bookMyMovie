import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage( message: string, action: string, duration) {
    this.snackBar.open(message, action, {duration : duration});
  }
}
