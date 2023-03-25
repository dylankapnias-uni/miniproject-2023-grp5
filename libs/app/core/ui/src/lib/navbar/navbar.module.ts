import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from './navbar.component';

@NgModule({
    declarations: [NavBarComponent],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [NavBarComponent]
})
export class NavBarModule {}