import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean = false;
  isPhoneNumber: boolean = false;
  step: number = 1;
  organizations: any[] = [];
  errorMessage: string | null = null;
  designations: string[] = ['Designation 1', 'Designation 2'];
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.signupForm = this.fb.group({
      email: [''],
      phoneNumber: [''],
      name: ['', Validators.required],
      password: ['', Validators.required],
      organizationName: ['', Validators.required],
      organizationId: ['', Validators.required],
      designation: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit(): void {
    this.authService.getOrganizations().subscribe(orgs => this.organizations = orgs);
    this.route.queryParams.subscribe(params => {
      const phoneNumber = params['phoneNumber'] || '';
      this.isPhoneNumber = !!phoneNumber;
      this.signupForm.patchValue({
        email: !this.isPhoneNumber ? params['email'] || '' : '',
        phoneNumber: this.isPhoneNumber ? phoneNumber : ''
      });
    });
  }

  onContinue(): void {
    const { email, phoneNumber, password } = this.signupForm.value;
    const identifier = this.isPhoneNumber ? phoneNumber : email;
    if (!identifier || !password) {
      this.error = 'Please fill the details';
      return;
    }
    this.authService.checkUserExists(this.signupForm.value.email, this.signupForm.value.phoneNumber).subscribe(response => {
      if (!response.exists) {
        this.error = null;
        this.step = 2;
      } else {
        this.error = 'User already exists.';
      }
    });
  }

  onBack(): void {
    this.step = 1;
  }

  onSubmit(): void {
    const { email, phoneNumber, name, password, organizationName, organizationId, designation, birthDate, city, pincode } = this.signupForm.value;
    const identifier = this.isPhoneNumber ? phoneNumber : email;

    const organizationExists = this.organizations.some(org => org.id === organizationId);
    if (!organizationExists) {
      this.error = 'Unknown organization-id';
      return;
    }

    if (this.signupForm.invalid) {
      this.error = 'Please fill the details';
      return;
    }

    this.authService.addUser(identifier, name, password, organizationName, organizationId, designation, birthDate, city, pincode).subscribe(response => {
      if (response.success) {
        this.submitted = true;
        const queryParams: any = {};
        if (email) {
          queryParams.email = email;
        }
        if (phoneNumber) {
          queryParams.phoneNumber = phoneNumber;
        }
        if (name) {
          queryParams.name = name;
        }
        setTimeout(() => {
          this.router.navigate(['/login'], { queryParams });
          this.signupForm.reset();
        }, 3000)
      } else {
        this.error = response.message;
      }
    });
  }
}
