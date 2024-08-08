import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResponse, Organization, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [
    {
      phoneNumber: '9876543210',
      name: 'John Doe',
      password: 'password123',
      organizationName: 'Organization One',
      organizationId: 'org1',
      designation: 'Designation 1',
      birthDate: new Date('1990-05-15'),
      city: 'New York',
      pincode: '100001'
    }, {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'password456',
      organizationName: 'Organization Two',
      organizationId: 'org2',
      designation: 'Designation 2',
      birthDate: new Date('1985-09-10'),
      city: 'San Francisco',
      pincode: '94107'
    }
  ];

  private mockOrganizations: Organization[] = [
    { id: 'org1', name: 'Organization One' },
    { id: 'org2', name: 'Organization Two' }
  ];

  checkUserExists(email: string, phoneNumber?: string): Observable<{ exists: boolean, name: string | null }> {
    const user = this.mockUsers.find(user =>
      user.email === email || user.phoneNumber === phoneNumber
    );

    return of({
      exists: !!user,
      name: user ? user.name : null
    });
  }

  validatePassword(identifier: string, password: string): Observable<AuthResponse> {
    const user = this.mockUsers.find(u => u.email === identifier || u.phoneNumber === identifier);
    const isValid = user && user.password === password;
    return of({
      success: isValid,
      message: isValid ? '' : 'Invalid password'
    });
  }

  getOrganizations(): Observable<Organization[]> {
    return of(this.mockOrganizations);
  }

  addUser(identifier: string, name: string, password: string, organizationName: string, organizationId: string, designation: string, birthDate: Date, city: string, pincode: string): Observable<AuthResponse> {
    const userExists = this.mockUsers.find(u => u.email === identifier || u.phoneNumber === identifier);
    if (userExists) {
      return of({
        success: false,
        message: 'User with this email or phone number already exists'
      });
    }

    this.mockUsers.push({
      email: identifier.includes('@') ? identifier : '',
      phoneNumber: identifier.includes('@') ? '' : identifier, name, password, organizationName, organizationId, designation, birthDate, city, pincode
    });

    return of({
      success: true
    });
  }
}
