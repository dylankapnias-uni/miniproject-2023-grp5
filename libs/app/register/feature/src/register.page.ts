import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from '@mp/app/register/util';
import { FormGroup } from '@angular/forms';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AgeGroup } from '@mp/api/profiles/util';

@Component({
  selector: 'ms-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  
  myForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      age: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['']
    });
  }
  
}
