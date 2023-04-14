import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent, NavBarModule } from './navbar';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NavBarModule,
  ],
  declarations: [],
  exports: [NavBarComponent]
})
export class CoreModule {}