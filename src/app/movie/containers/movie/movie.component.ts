import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../../../home/models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, AfterContentInit {
  movieDetails: any;
  id;
  theaterList;
  category: string;
  defaultData: Partial<Movie>;
  movieData;
  constructor(
    private store: Store<MovieState.State>,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params.id, 10);
      this.category = params.category;
    });
    this.defaultData = {
      id: this.id,
      title: 'Waiting for content',
      overview: 'Waiting for content'
    };
    if (this.category === 'nowPlaying') {
      this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => {
        this.movieDetails = result.find(movie => movie.id === this.id);
      });
    } else if (this.category === 'upComing') {
      this.store.select(MovieState.upcomingMovieSelector).subscribe(result => {
        this.movieDetails = result.find(movie => movie.id === this.id);
      });
    }
    this.store.select(MovieState.theaterList).subscribe(result => {
      this.theaterList = Object.values(result);
    });
  }

  ngAfterContentInit() {
    if (!this.movieDetails) {
      this.movieData = this.defaultData;
      this.movieService.getMovie(this.id).subscribe((value: Movie) => {
        this.movieData.title = value.title;
        this.movieData.overview = value.overview;
        this.movieData.poster_path = value.poster_path;
      });
      this.movieService.getCastAndCrew(this.id).subscribe(res => {
        console.log(res);
        this.movieData.casts = res['cast'].splice(0, 5);
        this.movieData.crews = res['crew'].splice(0, 5);
      });
    } else {
      this.movieData = this.movieDetails;
    }
  }
}
