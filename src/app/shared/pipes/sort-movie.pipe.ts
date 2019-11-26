import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortMovie'
})
export class SortMoviePipe implements PipeTransform {
  constructor() { }
  transform(moviesList: any, userPref: any): any {
    if (moviesList && moviesList.length > 0) {
      const preferedList: Object[] = [];
      const remainingList: Object[] = [];
      if (userPref) {
        const genres = userPref.genre;
        const language = userPref.language;
        for (const movie of moviesList) {
          if (language || (genres && genres.length > 0)) {
            if (language && (genres && genres.length > 0)) {
              if (movie.original_language === language) {
                preferedList.push(movie);
              } else if (movie.genre_ids.some(genre => genres.includes(genre))) {
                preferedList.push(movie);
              } else {
                remainingList.push(movie);
              }
            } else {
              if (language) {
                if (movie.original_language === language) {
                  preferedList.push(movie);
                }
              } else if (genres && genres.length > 0) {
                if (movie.genre_ids.some(genre => genres.includes(genre))) {
                  preferedList.push(movie);
                }
              } else {
                remainingList.push(movie);
              }
            }
          } else {
            remainingList.push(movie);
          }
        }
        return preferedList.concat(remainingList);
      } else {
        return moviesList;
      }
    }
  }
}
