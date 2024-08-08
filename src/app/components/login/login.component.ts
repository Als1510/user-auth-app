import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  isPhoneNumber: boolean = false;
  error: string | null = null;
  name: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: [''],
      phoneNumber: [''],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name']
      const phoneNumber = params['phoneNumber'] || '';
      this.isPhoneNumber = !!phoneNumber;
      this.loginForm.patchValue({
        email: !this.isPhoneNumber ? params['email'] || '' : '',
        phoneNumber: this.isPhoneNumber ? phoneNumber : ''
      });
    });
  }

  onSubmit(): void {
    const { email, phoneNumber, password } = this.loginForm.value;
    const identifier = this.isPhoneNumber ? phoneNumber : email;

    this.authService.validatePassword(identifier, password).subscribe(response => {
      if (response.success) {
        this.submitted = true;
        this.loginForm.reset();
      } else {
        this.error = response.message;
      }
    });
  }
}
