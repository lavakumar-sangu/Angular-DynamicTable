import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './profile-form/profile-form.component';
import { IntroComponent } from './intro/intro.component';
import { PaginatorComponent } from './datastorage/datastorage.component';
import { SigninPageComponent } from './signin-page/signin-page.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'signinpage', component: SigninPageComponent },
  { path: 'home', component: IntroComponent },
  { path: 'userData', component: PaginatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
