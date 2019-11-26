import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MovieListService } from '../../../core/movie/movie-list.service';
import {} from '../../../home/store/actions/home.action';
import { HomeService } from '../../../home/services/home.service';
import { SegregateMovieService } from '../../services/segregate-movie.service';
import { SearchApiService } from '../../services/search-api.service';
import { OnDestroy } from '@angular/core';
import { HostBinding } from '@angular/core';

@Component({
  selector: 'app-s-dialog',
  templateUrl: './s-dialog.component.html',
  styleUrls: ['./s-dialog.component.scss']
})
export class SDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class.app-s-dialog') bgColor = true;
  moviesList: any = [];
  genresList: any = [];

  originalMovieList: any = [];

  value = '';
  lang: String = 'en';
  selectedGenre: any;
  selectedLanguage = 'en';
  languageList: any;

  movieFilterObj = {
    filter: 'genre',
    value: ''
  };
  movieObjArray = []; // movie seperated by language

  searchField = new FormControl();

  constructor(
    private store: Store<MovieState.State>,
    private homeService: HomeService,
    private movieListService: MovieListService,
    private segregateMovies: SegregateMovieService,
    private searchService: SearchApiService
  ) {}

  ngOnInit() {
    // movie from store
    this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => {
      this.originalMovieList = result;
      this.moviesList = result;
      this.movieObjArray = this.movieListService.getLanguageList(this.moviesList); // get movies with languages
      // console.log(this.movieObjArray);
      // this.movieObjArray = this.segregateMovies.getSortedbyLanguage(this.languageList, this.moviesList);
    });

    // genre list from service
    this.genresList = this.homeService.getGenres();

    // fetch from api/store
    this.searchField.valueChanges.pipe(debounceTime(400)).subscribe(searchString => {
      this.searchService.getMovies(searchString).subscribe(
        searchList => {
          this.moviesList = searchList.results;
          this.movieObjArray = this.movieListService.getLanguageList(this.moviesList);
          // this.movieObjArray = this.segregateMovies.getSortedbyLanguage(this.languageList, this.moviesList);
        },
        error => {
          this.moviesList = this.searchService.searchMovieFromStore(this.originalMovieList, searchString);
          this.movieObjArray = this.movieListService.getLanguageList(this.moviesList); // get Languages
          // console.log('error', this.movieObjArray);
          // this.movieObjArray = this.segregateMovies.getSortedbyLanguage(this.languageList, this.moviesList);
        }
      );
    });
  }

  // change detection for genre dropdown
  changeGenere() {
    this.movieFilterObj.filter = 'genre';
    this.movieFilterObj.value = this.selectedGenre;
    this.movieFilterObj = Object.assign({}, this.movieFilterObj);
  }

  ngOnDestroy(): void {
    // console.log('destroy');
    this.moviesList = [];
  }
}
