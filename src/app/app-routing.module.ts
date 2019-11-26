import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { PaymentBookingComponent } from './shared/components/payment-booking/payment-booking.component';
import { AuthGuard } from './core/auth/service/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', loadChildren: './home/home.module#HomeModule'
  },
  { path: 'movie', loadChildren: './movie/movie.module#MovieModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'payment/:movieTitle/:theatre/:time/:seat/:total', component: PaymentBookingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
