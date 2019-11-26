import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserState from '../../../../app/reducers/index';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {

  userDetails: User;
  constructor(
    private router: Router,
    private store: Store<UserState.State>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select(UserState.userSelector).subscribe(result => {
      this.userDetails = result;
      console.log('userDetails auth check', this.userDetails);
    });
    const authValid = this.userDetails;
    if (authValid && authValid.id !== '' && authValid.role === 'Admin') {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home']);
    return false;
  }
}
