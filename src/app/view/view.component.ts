import {Component, Input, OnInit} from '@angular/core';
import {RoutesService} from "../services/routes.service";
import {Entity} from "../interfaces/entity";
import {CustomRoute} from "../interfaces/custom-route";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @Input("lat") initLat = 54.962656;
  @Input("lng") initLng = 82.932969;
  @Input("zoom") initZoom = 15;

  cities: Entity[];
  routes: CustomRoute[];
  selectedCity: Entity;
  route: CustomRoute;

  timeout = 1000;

  constructor(private routesService: RoutesService) {
    this.route = routesService.makeRouteInstance();
  }

  ngOnInit() {
    this.routesService.getCities().subscribe(cities => {
      this.cities = cities;
    });

  }

  selectCity(city: Entity) {
    this.selectedCity = city;
    this.route.cityId = city.uuid;
    this.loadRoutesList(this.selectedCity);
  }

  loadRoutesList(city: Entity) {
    setTimeout(() => {
      this.routesService.getRoutes(city).subscribe(routes => {
        this.routes = routes;
      });
    }, this.timeout);
  }

  loadRoute(route: Entity) {
    this.routesService.getRoute(route).subscribe(loadedRoute => {
      this.route = loadedRoute;
    });
  }
}
