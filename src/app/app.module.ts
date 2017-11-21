import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import {StopsService} from './stops.service';
import { CreateStopsComponent } from './create-stops/create-stops.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateStopsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCS8uQ84OL22djVKamgw0YEilV8xtq9_gU'
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [
    StopsService,
    MarkerManager,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
