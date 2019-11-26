import { User } from 'src/app/core/models/user.model';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatInput } from '@angular/material';
import { GoogleLoginProvider } from 'angular-6-social-login';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../../services/login.service';
import { UserDetailService } from '../../services/userDetails.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as UserState from '../../../reducers/index';
import { SetUser, RemoveUser } from 'src/app/core/store/action/userDetails.action';
import { UiService } from '../../../shared/ui-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput') input: MatInput;
  constructor(
    private dialog: MatDialog,
    private socialAuthService: AuthService,
    private loginService: LoginService,
    private userDetailService: UserDetailService,
    private router: Router,
    private store: Store<UserState.State>,
    private uiService: UiService
  ) {}
  authFlag = false;
  userID: string;
  signUpFlag = false;
  adminFlag = false;
  userDetails: User;

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService
      .signIn(socialPlatformProvider)
      .then(userData => {
        this.loginService.getUserData().subscribe(data => {
          const users = data;
          let userDetails;

          for (const user of data.users) {
            if (user.uid === userData.id) {
              this.signUpFlag = true;
              userDetails = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                image: userData.image,
                token: userData.token,
                role: user.role,
                preference: {
                  language: user.preferences.lang,
                  genre: user.preferences.generes,
                  theater: user.preferences.theaters
                },
                rating: {
                  movieId: user.ratings.movieId,
                  rating: user.ratings.rating
                }
              };
              sessionStorage.setItem('authDetails', JSON.stringify(userDetails));
              this.store.dispatch(new SetUser(userDetails));
              this.validate();
              // this.router.navigate(['/home']);
            }
          }
          if (this.signUpFlag === false) {
            this.userDetailService.addNewUser(userData);
            this.validate();
          }
        });
      })
      .catch(err => {
        this.uiService.showMessage('Oh gosh, SOMETHING WENT WRONG !!!!', '', 3000);
      });
  }

  public socialSignOut(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signOut().then(data => {
      // window.open('https://accounts.google.com/Logout');
      sessionStorage.clear();
      this.store.dispatch(new RemoveUser());
      this.router.navigate(['/home']);
      this.validate();
    });
  }

  public loadProfile() {
    this.router.navigate(['/profile']);
  }

  public validate() {
    const authDetails = sessionStorage.getItem('authDetails');
    this.userDetails = JSON.parse(authDetails);
    if (authDetails) {
      this.authFlag = true;
      if (this.userDetails.role === 'Admin') {
        this.adminFlag = true;
      }
    } else {
      this.authFlag = false;
      this.adminFlag = false;
    }
  }

  ngOnInit() {
    this.store.select(UserState.userSelector).subscribe(user => {
      this.validate();
    });
  }

  openSearchPage(): void {
    this.router.navigate(['/search']);
  }
}
