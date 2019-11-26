import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, TMDB_URLS } from '../../shared/config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  MOVIE_URL = BASE_URL.TMDB_API + TMDB_URLS.GET_CREDITS;
  constructor(private http: HttpClient) {
  }

  getMovie(id) {
    return this.http.get(this.MOVIE_URL + id + '?' + environment.API_KEY);
  }
  getCastAndCrew(id) {
    const getCreditsUrl = BASE_URL.TMDB_API + TMDB_URLS.GET_CREDITS + id + '/credits?' + environment.API_KEY;
    return this.http.get(getCreditsUrl);
  }
}
