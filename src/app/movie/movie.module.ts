import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { MovieComponent } from './containers/movie/movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MaterialModule } from '../material.module';
import { SocialFeedsComponent } from './components/movie-page/social-feeds/social-feeds.component';
import { MovieDescriptionComponent } from './components/movie-page/movie-description/movie-description.component';
import { SharedModule } from '../shared/shared.module';
import { SeatReservationModalComponent } from '../shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { MovieService } from './services/movie.service';
import { PreBookingComponent } from '../shared/components/modals/pre-booking/pre-booking.component';
@NgModule({
  declarations: [MoviePageComponent, MovieComponent, SocialFeedsComponent, MovieDescriptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MovieRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [MaterialModule],
  entryComponents: [SeatReservationModalComponent, PreBookingComponent],
  providers: [MovieService]
})
export class MovieModule {}
