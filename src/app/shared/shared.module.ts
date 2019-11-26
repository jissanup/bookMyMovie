import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieBookingComponent } from './movie-booking/movie-booking.component';
import { MaterialModule } from '../material.module';
import {
  MatDialogModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeatReservationModalComponent } from './components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiService } from './ui-service.service';
import { MovieDropdownsComponent } from './movie-dropdowns/movie-dropdowns.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { PaymentBookingComponent } from './components/payment-booking/payment-booking.component';
import { SortMoviePipe } from './pipes/sort-movie.pipe';
import { HomeFilterPipe } from './pipes/home-filter.pipe';
import { PreBookingComponent } from './components/modals/pre-booking/pre-booking.component';
import { SortPipePipe } from './pipes/sort-pipe.pipe';
@NgModule({
  declarations: [
    MovieBookingComponent,
    SeatReservationModalComponent,
    MovieDropdownsComponent,
    ConfirmationModalComponent,
    PaymentBookingComponent,
    SortMoviePipe,
    HomeFilterPipe,
    PreBookingComponent,
    SortPipePipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
  ],
  exports: [
    MovieBookingComponent,
    SeatReservationModalComponent,
    MovieDropdownsComponent,
    SortMoviePipe,
    HomeFilterPipe,
    SortPipePipe,
    PreBookingComponent
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] }],
  entryComponents: [ConfirmationModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
