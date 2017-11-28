import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {StopsService} from './services/stops.service';
import {CreateStopsComponent} from './create-stops/create-stops.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpRequestService} from "./services/http-request.service";
import {RouterModule} from "@angular/router";
import {CreateRouteComponent} from './create-route/create-route.component';
import {ViewComponent} from './view/view.component';
import {RoutesService} from "./services/routes.service";
import {ListComponent} from './list/list.component';
import {EditFormComponent} from './edit-form/edit-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CreateStopsComponent,
    CreateRouteComponent,
    ViewComponent,
    ListComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCS8uQ84OL22djVKamgw0YEilV8xtq9_gU'
    }),
    RouterModule.forRoot([{
      path: 'createStops',
      component: CreateStopsComponent
    }, {
      path: 'createRoute',
      component: CreateRouteComponent
    }, {
      path: 'view',
      component: ViewComponent
    }, {
      path: '',
      redirectTo: 'view',
      pathMatch: 'full'

    }]),
    AgmJsMarkerClustererModule,
    HttpClientModule
  ],
  providers: [
    StopsService,
    RoutesService,
    HttpRequestService,
    MarkerManager,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
