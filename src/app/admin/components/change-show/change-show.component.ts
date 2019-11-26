import { Component, OnInit, Input, ViewChild, TemplateRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { theaterList } from 'src/app/reducers';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-show',
  templateUrl: './change-show.component.html',
  styleUrls: ['./change-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeShowComponent implements OnInit, OnDestroy {
  @Input() theaterList;
  movieInput: FormControl;
  selectTheater: FormControl;
  movieResult;
  selectedTheater;
  subscription: Subscription;
  nowShowing = [];
  nowPlaying = [];
  @ViewChild('successDialog') successDialog: TemplateRef<any>;

  constructor(private adminService: AdminService, private matDialog: MatDialog) {
    this.movieInput = new FormControl();
    this.selectTheater = new FormControl();
  }

  ngOnInit() {
    this.subscription = this.movieInput.valueChanges.subscribe(value => {
      if (value) {
        this.adminService.searchMovie(value).subscribe(movies => {
          this.movieResult = movies['results'];
        });
      }
    });
    this.selectTheater.valueChanges.subscribe(value => {
      this.selectedTheater = value;
      this.nowShowing = [];
    });
  }
  addMovie(movie) {
    this.nowShowing.push(movie.name);
    this.nowPlaying.push(movie.id);
  }
  save() {
    this.matDialog.open(this.successDialog);
    this.adminService.saveNowPlaying(this.nowPlaying, this.selectTheater['tid']);
  }
  cancel() {
    this.nowShowing = [];
  }
  dialogOk() {
    this.nowShowing = [];
    this.movieInput.reset();
    this.selectTheater.reset();
    this.matDialog.closeAll();
    this.movieResult = [];
  }
  trackTheatre(index, theater){
    if(theater){
     return theater.tid;
    } else{
      return -1;
    }
  }
  trackMovie(index, movie){
    if(movie){
     return movie.tid;
    } else{
      return -1;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
