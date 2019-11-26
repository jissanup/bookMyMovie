import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
    console.log('confirmation booking', data);
  }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.dialogRef.close('Confirm');
    this.router.navigate(['/home']);
  }
}
