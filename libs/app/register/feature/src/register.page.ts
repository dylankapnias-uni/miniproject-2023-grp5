import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from '@mp/app/register/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @Select(actionsExecuting([Register]))
  busy$!: Observable<ActionsExecuting>;
  registerForm = this.fb.group({
    email: [
      '',
      [Validators.email, Validators.minLength(6), Validators.maxLength(64)],
    ],
    phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    dateOfBirth: ['', [Validators.minLength(6), Validators.maxLength(64)]],
    age: ['', [Validators.minLength(1), Validators.maxLength(3)]],
    password: ['', [Validators.minLength(6), Validators.maxLength(64)]],
    confirmPassword: ['', [Validators.minLength(6), Validators.maxLength(64)]],
  });
  showPassword = false;

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get emailError(): string {
    if (this.email?.errors?.['email']) return 'Email is invalid';
    if (this.email?.errors?.['required']) return 'Email is required';
    if (this.email?.errors?.['minlength'])
      return 'Email should be longer than 6 characters';
    if (this.email?.errors?.['maxlength'])
      return 'Email should be shorter than 64 characters';

    return 'Email is invalid';
  }

  get passwordError(): string {
    if (this.password?.errors?.['required']) return 'Password is required';
    if (this.password?.errors?.['minlength'])
      return 'Password should be longer than 6 characters';
    if (this.password?.errors?.['maxlength'])
      return 'Password should be shorter than 64 characters';

    return 'Password is invalid';
  }

  get confirmPasswordError(): string {
    if (this.password?.errors?.['required']) return 'Password is required';
    if (this.password?.errors?.['minlength'])
      return 'Password should be longer than 6 characters';
    if (this.password?.errors?.['maxlength'])
      return 'Password should be shorter than 64 characters';

    return 'Password is invalid';
  }

  get phoneNumberError(): string {
    if (this.phoneNumber?.errors?.['required'])
      return 'Phone number is required';
    if (this.phoneNumber?.errors?.['minlength'] || this.phoneNumber?.errors?.['maxlength'])
      return 'Phone number should be 10 digits long';

    return 'Phone number is invalid';
  }

  get dateOfBirthError(): string {
    if (this.dateOfBirth?.errors?.['required']) 
      return 'Date of birth is required';
     

    return 'Date of birth is invalid';
  }

  get ageError(): string {
    if (this.age?.errors?.['required']) return 'Age is required'; 
    if (this.age?.errors?.['minlength'])
      return 'Age is empty';
    if (this.age?.errors?.['maxlength'])
      return 'Age should be shorter than 3 digits long';

    return 'Age is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  register() {
    if (this.registerForm.valid) {
      this.store.dispatch(new Register());
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
