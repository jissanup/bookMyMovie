import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit {

  @Input() overview;
  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
