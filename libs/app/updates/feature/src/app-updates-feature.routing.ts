import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatesPage } from './lib/updates.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatesPageRoutingModule 
{}
