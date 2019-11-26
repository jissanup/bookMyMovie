import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material.module';
import { MovieCardComponent } from './components/home-page/movie-card/movie-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeatReservationModalComponent } from '../shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { ConfirmationModalComponent } from '../shared/components/modals/confirmation-modal/confirmation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PreBookingComponent } from '../shared/components/modals/pre-booking/pre-booking.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HomePageComponent, HomeComponent, MovieCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [MaterialModule],
  entryComponents: [SeatReservationModalComponent, ConfirmationModalComponent, PreBookingComponent]
})
export class HomeModule { }
