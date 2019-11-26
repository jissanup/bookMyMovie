import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, interval } from 'rxjs';
// import 'rxjs/add/operator/map';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../reducers/index';

import { Movie } from '../../movie/models/movie.model';
import { environment } from '../../../environments/environment';
import { BASE_URL, TMDB_URLS } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
  constructor(private http: HttpClient) {}

  getMovies(searchQuery): Observable<any> {
    const urlSuffix = '&include_adult=false'; // parental filter
    // fetches movie
    return this.http.get(
      BASE_URL.TMDB_API + TMDB_URLS.SEARCH_MOVIE + '?' + environment.API_KEY + '&query=' + searchQuery + urlSuffix
    );
  }

  searchMovieFromStore(movieList, query) {
    const movies = [];
    for (let i = 0; i < movieList.length; i++) {
      if (movieList[i].original_title.indexOf(query) >= 0) {
        movies.push(movieList[i]);
      }
    }
    return movies;
  }
}
