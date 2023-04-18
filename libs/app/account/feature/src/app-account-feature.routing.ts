import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from './lib/account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPageRoutingModule 
{}
