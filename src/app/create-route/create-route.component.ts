import {Component, Input, OnInit} from '@angular/core';
import {StopsService} from "../services/stops.service";
import {Stop} from "../interfaces/stop";
import {City} from "../interfaces/city";
import {CustomRoute} from "../interfaces/custom-route";
import {RoutesService} from "../services/routes.service";
import {Coordinate} from "../interfaces/coordinate";

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  @Input("lat") initLat = 54.962656;
  @Input("lng") initLng = 82.932969;
  @Input("zoom") initZoom = 15;

  timeout = 1000;

  stops: Stop[] = [];
  cities: City[] = [];
  routes: CustomRoute[] = [];
  route: CustomRoute;
  selectedCity: City;

  constructor(private stopService: StopsService, private routesService: RoutesService) {
    this.route = routesService.makeRouteInstance();
  }

  ngOnInit() {
    this.stopService.getAllStops().subscribe(stops => {
      this.stops = stops;
    });

    this.routesService.getCities().subscribe(cities => {
      this.cities = cities;
    });

    this.loadRoutes();
  }

  addToRoute(stop: Stop) {
    this.route = this.routesService.addStopToRoute(stop, this.route);
    this.drawLine(stop.coordinate);
  }

  drawLine(event: Coordinate) {
    this.route.points.push({
      lat: event.lat,
      lng: event.lng
    });
  }

  setName(name: string) {
    this.route.routeName = name;
  }

  selectCity(city: City) {
    this.selectedCity = city;
    this.route.cityId = city.uuid;
  }

  saveRoute() {
    this.routesService.saveRoute(this.route, this.selectedCity);
    this.loadRoutes();
  }

  loadRoutes() {
    setTimeout(() => {
      this.routesService.getRoutes().subscribe(routes => {
        this.routes = routes;
      });
    }, this.timeout);
  }
}
