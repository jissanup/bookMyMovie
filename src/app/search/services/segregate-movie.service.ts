import { Injectable } from '@angular/core';

// This service will group movies under a language group
@Injectable({
  providedIn: 'root'
})
export class SegregateMovieService {
  constructor() {}

  getSortedbyLanguage(languageList, moviesList) {
    const mlist = [];

    for (const language of languageList) {
      const movieobj = {
        key: language.name,
        code: language.key,
        value: []
      };
      for (const movie of moviesList) {
        if (movie.original_language === language.key) {
          movieobj.value.push(movie);
        }
      }
      mlist.push(movieobj);
    }
    return mlist;
  }
}
