import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth.service';
import { CheckUserComponent } from './components/check-user/check-user.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, CheckUserComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
