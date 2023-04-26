import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherUserPage } from './other-user.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OtherUserPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherUserRouting {}