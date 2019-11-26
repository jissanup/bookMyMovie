import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pre-booking',
  templateUrl: './pre-booking.component.html',
  styleUrls: ['./pre-booking.component.scss']
})
export class PreBookingComponent implements OnInit {

  constructor( public dialog: MatDialog,
    private dialogRef: MatDialogRef<PreBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
