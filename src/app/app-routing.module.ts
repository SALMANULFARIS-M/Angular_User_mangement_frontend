import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./user/home/home.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { UserLoginComponent } from "./user/user-login/user-login.component";
import { UserRegistrationComponent } from "./user/user-registration/user-registration.component";
import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { CreateUserComponent } from "./admin/create-user/create-user.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'login',component:UserLoginComponent},
  {path:'signup',component:UserRegistrationComponent},
  {path:'admin',component:AdminLoginComponent},
  {path:'admin/dashboard' ,component:DashboardComponent},
  {path:'admin/createuser' ,component:CreateUserComponent},
  {path:'admin/edituser/:id' ,component:CreateUserComponent},
  { path: '**', redirectTo: 'login' } // Redirect all other routes to the default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
