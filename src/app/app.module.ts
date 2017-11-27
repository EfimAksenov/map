import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {StopsService} from './services/stops.service';
import {CreateStopsComponent} from './create-stops/create-stops.component';
import {HttpClientModule} from "@angular/common/http";
import {StopDaoService} from "./services/stop-dao.service";
import {RouterModule} from "@angular/router";
import {CreateRouteComponent} from './create-route/create-route.component';
import {ViewComponent} from './view/view.component';
import {RoutesService} from "./services/routes.service";
import {RoutesDaoService} from "./services/routes-dao.service";

@NgModule({
  declarations: [
    AppComponent,
    CreateStopsComponent,
    CreateRouteComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
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
    StopDaoService,
    RoutesDaoService,
    MarkerManager,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
