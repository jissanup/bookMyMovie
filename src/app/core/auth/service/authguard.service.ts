import { take, map, tap } from 'rxjs/operators';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanLoad
} from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import * as UserState from '../../../../app/reducers/index';
import { SetUser } from 'src/app/core/store/action/userDetails.action';
import { User } from 'src/app/core/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
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
        if (authValid && authValid.id !== '') {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home']);
        return false;
    }

    canLoad(route: Route): Observable<boolean> | boolean {
        this.store.select(UserState.userSelector).subscribe(result => {
            this.userDetails = result;
            console.log('userDetails auth check', this.userDetails);
        });
        const authValid = this.userDetails;
        if (authValid) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home']);
        return false;
    }
}
