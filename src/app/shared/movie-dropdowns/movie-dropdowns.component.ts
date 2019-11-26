import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HomeService } from 'src/app/home/services/home.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-dropdowns',
  templateUrl: './movie-dropdowns.component.html',
  styleUrls: ['./movie-dropdowns.component.scss']
})
export class MovieDropdownsComponent implements OnInit {
  genresList: any = [];
  @Input() layout;
  @Input() languageList;
  @Output() languageChange$: EventEmitter<any>;
  @Output() genreChange$: EventEmitter<any>;
  @Output() distanceChange$: EventEmitter<any>;
  languageSelected = false;
  genreSelected = false;
  genreObj = { value: '' };
  distanceSelected: number;
  languageSelector: FormControl;
  generSelector: FormControl;
  constructor(private homeService: HomeService) {
    this.languageChange$ = new EventEmitter();
    this.genreChange$ = new EventEmitter();
    this.distanceChange$ = new EventEmitter();
    this.languageSelector = new FormControl();
    this.generSelector = new FormControl();
  }

  ngOnInit() {
    this.genresList = this.homeService.getGenres();
    this.languageSelector.valueChanges.subscribe((value) => {
      this.languageSelected = value ? true : false;
      this.languageChange$.emit(value);
    });
    this.generSelector.valueChanges.subscribe((value) => {
      this.genreSelected = value ? true : false;
      this.genreObj.value = value;
      this.genreObj = Object.assign({}, this.genreObj);
      this.genreChange$.emit(this.genreObj);
    });
  }
}
