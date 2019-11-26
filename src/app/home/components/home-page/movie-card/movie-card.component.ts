import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
// tslint:disable-next-line:max-line-length
import { SeatReservationModalComponent } from '../../../../shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { FormControl } from '@angular/forms';
import { BASE_URL, TMDB_URLS } from '../../../../shared/config';
import { Movie } from '../../../../search/models/search.model';
import { PreBookingComponent } from '../../../../shared/components/modals/pre-booking/pre-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent implements OnInit, OnChanges {
  @Input()
  movie;
  @Input()
  theaterList;
  @Input()
  category;

  imagesPath = TMDB_URLS.IMAGE_URL;
  castCrewPath = TMDB_URLS.CAST_CREW_SMALL;
  movieName = 'Robot 2.O';
  dialogResult;
  rating = 4.7;
  totalReviews = 51;

  minDate = new Date();
  date = new FormControl(this.minDate);
  selectTheater: FormControl;
  selectedTheater;
  selectedTime;
  subscription: Subscription;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  ngOnChanges() {
    this.selectTheater = new FormControl();
    this.selectTheater.setValue(this.theaterList[0]);
    this.selectedTheater = this.theaterList[0];
    this.subscription = this.selectTheater.valueChanges.subscribe(selectedTheater => {
      this.selectedTheater = selectedTheater;
    });
  }
  onValChange(val: string) {
    this.selectedTime = val;
  }
  isInvalid() {
    if (this.selectedTheater && this.selectedTheater.name) {
      return false;
    }
    return true;
  }
  checKToDialog() {
    this.category === 'nowPlaying' ? this.openDialog() : this.preBookDialog();
  }
  preBookDialog() {
    const dialogRef = this.dialog.open(PreBookingComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SeatReservationModalComponent, {
      width: sessionStorage.getItem('authDetails') ? window.innerWidth + 'px' : 'auto',
      height: sessionStorage.getItem('authDetails') ? '599px' : 'auto',
      data: { category: this.category },
      disableClose: true
    });

    const bookingInstance = dialogRef.componentInstance;
    bookingInstance.movieTitle = this.movie.title;
    bookingInstance.screen = this.selectedTheater && this.selectedTheater.name;
    bookingInstance.time = this.selectedTime;
    bookingInstance.movieList = this.movie;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog closed: ${result}`);
      //  this.dialogResult = result;
    });
  }

  trackCastandCrew(index, cast) {
    if (cast) {
      return cast.id;
    } else {
      return -1;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
