import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store'
import { Observable } from 'rxjs'

import { UpdateAccountDetails } from '@mp/app/account/util';
import { AccountState } from '@mp/app/account/data-access';
import { Account } from '@mp/app/account/util';

@Component({
  selector: 'mp-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage 
{
  @Select(AccountState.getAccountDetails) account$!: Observable<Account>
  input = {
    name: '',
    email: '',
    number: '',
    gender: '',
    dob: ''
  };

  constructor(public r : Router, private store: Store) {}

  LoadSettingsPage()
  {
    this.r.navigate(['/settings'])
  }

  updateAccount() {
    console.log("Here")
    this.store.dispatch(new UpdateAccountDetails({name: this.input.name, email: this.input.email, number: this.input.number, gender: this.input.gender, dob: this.input.dob}))
    console.log(this.input)
  }

  getAccount() {
    console.log(this.account$)
  }
}
