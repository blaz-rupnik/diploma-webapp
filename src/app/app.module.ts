import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DxChartModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VacationleavesComponent } from './vacationleaves/vacationleaves.component';
import { VacationleaveCreateComponent } from './vacationleaves/vacationleave-create/vacationleave-create.component';
import { FormsModule } from '@angular/forms';
import { HomeTasksComponent } from './home/home-tasks/home-tasks.component';
import { MonthlyratingsComponent } from './monthlyratings/monthlyratings.component';
import { MonthlyratingCreateComponent } from './monthlyratings/monthlyrating-create/monthlyrating-create.component';
import { HomeSummaryComponent } from './home/home-summary/home-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    UsersComponent,
    NotFoundComponent,
    UserDetailsComponent,
    UserCreateComponent,
    VacationleavesComponent,
    VacationleaveCreateComponent,
    HomeTasksComponent,
    MonthlyratingsComponent,
    MonthlyratingCreateComponent,
    HomeSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DxChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
