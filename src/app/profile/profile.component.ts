import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from '../home/services/home.service';
import { LoginService } from '../core/services/login.service';

import { Store } from '@ngrx/store';
import * as UserState from '../reducers/index';
import { SetUser } from 'src/app/core/store/action/userDetails.action';
import { User } from 'src/app/core/models/user.model';
import { MatDialog } from '@angular/material';

import { FormBuilder, Validators } from '@angular/forms';
// import { UserState } from "src/app/core/store/reducers/userDetails.reducer";
import * as MovieState from '../reducers/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  genresList: any = [];
  theaterList: any = [];
  name;
  userdatas;
  userDetails: User;
  @ViewChild('successDialog') successDialog: TemplateRef<any>;
  languageList = [
    { name: 'English', value: 'en' },
    { name: 'Hindi', value: 'hi' },
    { name: 'Tamil', value: 'ta' },
    { name: 'Kannada', value: 'kn' }
  ];

  newPreference = this.fb.group({
    lang: ['', Validators.required],
    generes: ['', Validators.required],
    theaters: ['', Validators.required]
  });

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private store: Store<UserState.State>,
    private matDialog: MatDialog
  ) { }

  // after clicking submit button adding preference option is here
  public submitPreferences() {
    let currentSeesion;
    currentSeesion = JSON.parse(sessionStorage.getItem('authDetails'));
    this.homeService.setPreference(this.newPreference.value, currentSeesion['id']);
    this.matDialog.open(this.successDialog);
  }

  ngOnInit() {
    this.store.select(UserState.userSelector).subscribe(result => {
      this.userDetails = result;
    });
    this.genresList = this.homeService.getGenres();
    this.loginService.getUserData().subscribe(data => (this.name = data.users[0].name));
    this.store.select(MovieState.theaterList).subscribe(result => {
      this.theaterList = Object.values(result);
      console.log('updated', result, this.theaterList);
    });
  }
  sucess() {
    this.newPreference.reset();
    this.matDialog.closeAll();
  }
}
