import {Component, Input, OnInit} from '@angular/core';
import {StopsService} from "../services/stops.service";
import {Stop} from "../interfaces/stop";
import {CustomRoute} from "../interfaces/custom-route";
import {RoutesService} from "../services/routes.service";
import {Coordinate} from "../interfaces/coordinate";
import {Entity} from "../interfaces/entity";

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
  cities: Entity[] = [];
  routes: CustomRoute[] = [];
  route: CustomRoute;
  selectedCity: Entity;

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
  }


  selectCity(city: Entity) {
    this.selectedCity = city;
    this.route.cityId = city.uuid;
    this.loadRoutesList(this.selectedCity);
  }

  saveRoute(event) {
    this.route.entityName = event.entityName;
    this.routesService.saveRoute(this.route, this.selectedCity);
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

  // Map events

  addPoint(event: Coordinate) {
    this.route.points.push({
      lat: event.lat,
      lng: event.lng
    });
  }

  removeLastPoint() {
    this.route.points.splice(this.route.points.length - 1, 1);
  }

  addToRoute(stop: Stop) {
    this.route.stops.push(stop);
    this.addPoint(stop.coordinate);
  }

}
