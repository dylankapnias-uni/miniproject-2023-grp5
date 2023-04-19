import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterestsPage } from './lib/interests.page';

const routes: Routes = [
  {
    path: '',
    component: InterestsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class interestsPageRoutingModule 
{}
