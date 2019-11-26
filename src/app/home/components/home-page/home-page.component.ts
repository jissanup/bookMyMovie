import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';

import { HomeService } from '../../services/home.service';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Store } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  @Input()
  moviesList;

  @Input()
  upcomingList;

  @Input()
  theaterList;

  @Input()
  userPreference;

  @Output()
  getNewNowPlayingMovies: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  getNewUpcomingMovies: EventEmitter<number> = new EventEmitter<number>();
  page = 1;
  click = false;
  // isLoading: Boolean = false;
  nowPlayingMoviesList: any = [];
  movieList: any = [];
  filteredMovies: any = [];
  totalPagesForNowShowingMovies: number;
  activeTabIndex = 0;
  nowPlayingMovieFetchedPageNum = 1;
  upcomingMoviesFetchedPageNum = 0;
  selectedLanguage = '';
  selectedGenre = '';
  sortMovie = '';
  sortClick = false;
  languageList = [{ id: 'en', name: 'English' }, { id: 'ja', name: 'Japanese' }, { id: 'zh', name: 'Chinese' }];
  constructor(private homeService: HomeService,
    private store: Store<MovieState.State>) { }

  ngOnInit() {
    this.getNewNowPlayingMovies.emit(this.page);
    this.getNewUpcomingMovies.emit(this.page);
    this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => (this.moviesList = result));
    this.store.select(MovieState.upcomingMovieSelector).subscribe(result => (this.upcomingList = result));
    //  this.cdcheck.markForCheck();
  }

  trackMovie(index, movie) {
    if (movie) {
      return movie.id;
    } else {
      return -1;
    }
  }
  goTop() {
    this.virtualScroll.scrollToIndex(0);
  }
  getMovies(): void {
    if (this.virtualScroll.getDataLength() === this.virtualScroll.getRenderedRange().end) {
      console.log("page number", this.page);
      if (this.activeTabIndex === 0) {
        this.getNewNowPlayingMovies.emit(++this.page);
      }
      else if (this.activeTabIndex === 1) {
        this.getNewUpcomingMovies.emit(++this.page);
      }
    }
  }

  tabChanged(event) {
    this.activeTabIndex = event;
  }

  sort() {
    this.sortClick = !this.sortClick;
    this.sortClick?this.sortMovie ='desc': this.sortMovie ='asc';
  }

  getLanguage(lang) {
    this.selectedLanguage = lang;
  }

  getGenre(g) {
    this.selectedGenre = g;
  }
  ngAfterViewInit(): void {
    this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => this.moviesList = result);
    this.store.select(MovieState.upcomingMovieSelector).subscribe(result => this.upcomingList = result);
  }
}
