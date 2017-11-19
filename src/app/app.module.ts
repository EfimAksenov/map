import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCS8uQ84OL22djVKamgw0YEilV8xtq9_gU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
