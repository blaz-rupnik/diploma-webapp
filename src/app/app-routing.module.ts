import { VacationleaveCreateComponent } from './vacationleaves/vacationleave-create/vacationleave-create.component';
import { VacationleavesComponent } from './vacationleaves/vacationleaves.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { MonthlyratingsComponent } from './monthlyratings/monthlyratings.component';
import { MonthlyratingCreateComponent } from './monthlyratings/monthlyrating-create/monthlyrating-create.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'users/new', component: UserCreateComponent },

  { path: 'vacationleaves', component: VacationleavesComponent },
  { path: 'vacationleaves/new', component: VacationleaveCreateComponent },

  { path: 'monthlyratings', component: MonthlyratingsComponent },
  { path: 'monthlyratings/new', component: MonthlyratingCreateComponent },

  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
