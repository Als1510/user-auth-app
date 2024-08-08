import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-check-user',
  templateUrl: './check-user.component.html',
  styleUrls: ['./check-user.component.css']
})
export class CheckUserComponent {
  userForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]]
    });
  }

  onSubmit() {
    const { email, phoneNumber } = this.userForm.value;
    if (!email && !phoneNumber) {
      this.error = 'At least one of email or phone number is required.';
      return;
    }
    this.error = null;

    this.authService.checkUserExists(email, phoneNumber).subscribe((response) => {
      const queryParams: any = {};
      if (email) {
        queryParams.email = email;
      }
      if (phoneNumber) {
        queryParams.phoneNumber = phoneNumber;
      }
      if (response?.name) {
        queryParams.name = response.name;
      }
      if (response.exists) {
        this.router.navigate(['/login'], { queryParams });
      } else {
        this.router.navigate(['/signup'], { queryParams });
      }
    });
  }
}
