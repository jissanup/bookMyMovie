import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  theaterList;
  subscription: Subscription;
  constructor(private adminService: AdminService, private store: Store<MovieState.State>) { }

  ngOnInit() {
    this.subscription = this.store.select(MovieState.theaterList).subscribe(result => {
      if (result) {
        this.theaterList = Object.values(result);
      }
    });
  }

  addTheater(formData) {
    this.adminService.newTheater(formData);
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
