import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { HomeComponent } from './user/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { TokenInterceptor } from './token.interceptor';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    UserLoginComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminNavbarComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
