import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { TMDB_URLS } from '../../../config';
@Component({
  selector: 'app-seat-reservation-modal',
  templateUrl: './seat-reservation-modal.component.html',
  styleUrls: ['./seat-reservation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatReservationModalComponent implements OnInit {
  imagesPath = TMDB_URLS.IMAGE_URL;
  // variable declarations
  movieTitle;
  screen;
  time;

  // rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  rows: string[] = ['A', 'B', 'C', 'D'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2','F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  reserved: string[] = ['A2', 'A3', 'B5', 'C1', 'C2', 'D4'];
  selected: string[] = [];

  ticketPrice = 120;
  convFee = 30;
  totalPrice = 0;
  currency = 'Rs';
  showBook: boolean;
  movieList;
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<SeatReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log('data---', data);
  }

  ngOnInit() {
    const authValid = sessionStorage.getItem('authDetails');
    if (authValid) {
      this.showBook = true;
    } else {
      this.showBook = false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onCloseConfirm() {
    this.dialogRef.close('Confirm');
    const total: number = this.ticketPrice * this.selected.length + this.convFee;
    const theater = this.screen || '';
    this.router.navigate(['/payment', this.movieTitle, theater, '10:00', this.selected.join(','), total]);
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  // return status of each seat
  getStatus(seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
  }

  // click handler
  seatClicked(seatPos: string) {
    console.log('test', seatPos);
    const index = this.selected.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1);
    } else {
      // push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1) {
        this.selected.push(seatPos);
      }
    }
  }
}
