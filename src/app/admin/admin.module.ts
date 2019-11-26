import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './containers/admin/admin.component';
import { MatTabsModule } from '@angular/material';
import { AddTheaterComponent } from './components/add-theater/add-theater.component';
import { MaterialModule } from '../../app/material.module';
import { AdminService } from './services/admin.service';
import { ChangeShowComponent } from './components/change-show/change-show.component';
import { AdminRoutingModule } from './admin-routing.module';
@NgModule({
  declarations: [AdminComponent, AddTheaterComponent, ChangeShowComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTabsModule,
    MaterialModule,
    AdminRoutingModule
  ],
  providers: [AdminService]
})
export class AdminModule { }
