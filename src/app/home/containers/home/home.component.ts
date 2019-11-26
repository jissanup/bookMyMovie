import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import * as UserState from '../../../reducers/index';
import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nowPlayingMoviesList: any = [];
  upcomingMoviesList: any = [];
  genresList: any = [];
  theaterList: any = [];
  userPreference: any = [];

  constructor(
    private store: Store<MovieState.State>,
    private userStore: Store<UserState.State>,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.getNewSetofNowPlayingMovies(1);
    this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => (this.nowPlayingMoviesList = result));
    this.store.select(MovieState.upcomingMovieSelector).subscribe(result => {
      this.upcomingMoviesList = result;
    });
    this.store.select(MovieState.theaterList).subscribe(result => {
      if(result){
      this.theaterList = Object.values(result);
    }
    });
    this.userStore.select(UserState.userSelector).subscribe(result => {
      this.userPreference = result.preference;
    });
    this.genresList = this.homeService.getGenres();
  }

  getNewSetofNowPlayingMovies(page) {
    this.homeService.getNowshowing(page);
  }
  getNewSetofComingMovies(page) {
    this.homeService.getUpcomingMovies(page);
  }
  fetchGenres(){
    this.homeService.fetchGenres();
  }
 
}
