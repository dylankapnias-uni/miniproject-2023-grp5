import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopPage } from './lib/shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopPageRoutingModule 
{}
