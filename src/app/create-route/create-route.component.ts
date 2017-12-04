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
    this.routesService.saveRoute(this.route, this.selectedCity).subscribe(() => {
      this.loadRoutesList(this.selectedCity);
    });
  }

  loadRoutesList(city: Entity) {
    this.routesService.getRoutes(city).subscribe(routes => {
      this.routes = routes;
    });
  }

  loadRoute(route: Entity) {
    this.routesService.getRoute(route).subscribe(loadedRoute => {
      this.route = loadedRoute;
    });
  }

  deleteRoute(route: Entity) {
    this.routesService.deleteRouteById(route);
    this.loadRoutesList(this.selectedCity);
  }

  updateRoute(route: Entity) {
    this.route.entityName = route.entityName;
    this.routesService.updateRoute(this.route).subscribe(() => {
      this.loadRoutesList(this.selectedCity);
    });
  }

  deleteStopFromForwardList(stop: Entity) {
    this.route.stopsForward = this.routesService.deleteStopFromList(this.route.stopsForward, stop);
  }

  deleteStopFromBackList(stop: Entity) {
    this.route.stopsBack = this.routesService.deleteStopFromList(this.route.stopsBack, stop);
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
    this.route.stopsForward.push(stop);
    this.addPoint(stop.coordinate);
  }

}
