import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notificationsPage } from './lib/notifications.page';

const routes: Routes = [
  {
    path: '',
    component: notificationsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class notificationsPageRoutingModule 
{}