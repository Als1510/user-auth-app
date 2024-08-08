import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { CheckUserComponent } from './components/check-user/check-user.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-check', pathMatch: 'full' },
  { path: 'user-check', component: CheckUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/user-check' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadingStrategy, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
