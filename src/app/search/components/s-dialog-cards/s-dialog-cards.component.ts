import { Component, OnInit, Input, AfterContentChecked, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material';

// import { MoviePipePipe } from './../../pipes/movie-pipe.pipe';
import { HomeFilterPipe } from '../../../shared/pipes/home-filter.pipe';
import { SortMoviePipe } from '../../../shared/pipes/sort-movie.pipe';
import * as UserState from '../../../reducers/index';
import { Store } from '@ngrx/store';

// import { MatCardModule } from '@angular/material'

@Component({
  selector: 'app-s-dialog-cards',
  templateUrl: './s-dialog-cards.component.html',
  styleUrls: ['./s-dialog-cards.component.scss']
})
export class SDialogCardsComponent implements AfterContentChecked, DoCheck, OnInit {
  @Input() movieList; // movie seperated by language
  @Input() movieFilter; // genre
  @Input() languageList; // list of languages
  @Input() selectedLanguage; // user language selection
  userPreference: any = [];

  // movieList DS
  // key: language.name,
  // code: language.key,
  // value: []

  constructor(private userStore: Store<UserState.State>) {}

  ngOnInit(): void {
    this.userStore.select(UserState.userSelector).subscribe(result => {
      this.userPreference = result.preference;
      // console.log('uspref', this.userPreference);
    });
  }

  ngAfterContentChecked() {}

  ngDoCheck(): void {}
}
