import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeFilter'
})
/*
This pipe could take list of movies as value and filter it based on
genre or language preferences.
*/
export class HomeFilterPipe implements PipeTransform {
  transform(movieList: any, genreInput?: any, languagePref?: any) {
    if (movieList) {
      const filteredMovieList: any = [];
      let check = 4;
      let breaker = 1;
      // no input
      if ((genreInput.value === '' || genreInput === '') && languagePref === '' && breaker) {
        check = 1;
        breaker = 0;
      } else if ((genreInput.value === '' || genreInput === '') && breaker) {
        check = 2;
        breaker = 0;
      } else if (languagePref === '' && breaker) {
        check = 3;
        breaker = 0;
      }

      switch (check) {
        case 1:
          return movieList;
        case 2:
          for (const movie of movieList) {
            if (languagePref === movie.original_language) {
              filteredMovieList.push(movie);
            }
          }
          return filteredMovieList;
        case 3:
          for (const movie of movieList) {
            if (
              movie.genre_ids.includes(parseInt(genreInput.value, 10)) ||
              movie.genre_ids.includes(parseInt(genreInput, 10))
            ) {
              filteredMovieList.push(movie);
            }
          }
          return filteredMovieList;
        case 4:
          for (const movie of movieList) {
            if (
              (movie.genre_ids.includes(parseInt(genreInput.value, 10)) ||
                movie.genre_ids.includes(parseInt(genreInput, 10))) &&
              languagePref === movie.original_language
            ) {
              filteredMovieList.push(movie);
            }
          }
          return filteredMovieList;
      }
    }
  }
}
