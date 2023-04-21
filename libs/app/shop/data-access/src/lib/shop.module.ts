import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { ShopState } from './shop.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      ShopState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
