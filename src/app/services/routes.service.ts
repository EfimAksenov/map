import {Injectable} from '@angular/core';
import {RoutesDaoService} from "./routes-dao.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {City} from "../interfaces/city";
import {Stop} from "../interfaces/stop";
import {CustomRoute} from "../interfaces/custom-route";
import {Coordinate} from "../interfaces/coordinate";

@Injectable()
export class RoutesService {

  constructor(private routesDAO: RoutesDaoService) {
  }

  getCities(): Observable<City[]> {
    let subject: Subject<City[]> = new Subject();
    let cities: City[] = new Array();
    this.routesDAO.getCities().subscribe(response => {
      (<any>response).entities.forEach(city => {
        cities.push({
          uuid: city.uuid,
          name: city.name
        });
      });
      subject.next(cities);
    });
    return subject.asObservable();
  }

  addStopToRoute(stop: Stop, route: CustomRoute): CustomRoute {
    route.stops.push(stop);
    return route;
  }

  makeRouteInstance(): CustomRoute {
    let route: CustomRoute = {
      routeName: '',
      stops: new Array<Stop>(),
      points: new Array<Coordinate>()
    }
    return route;
  }

  saveRoute(route: CustomRoute, city: City) {
    this.routesDAO.saveRouteWithConnectionToCity(route, city, 'have').subscribe(null, error2 => {
      console.log(error2);
    });
  }

  getRoutes(): Observable<CustomRoute[]> {
    let subject: Subject<CustomRoute[]> = new Subject();
    let routes: CustomRoute[] = [];
    this.routesDAO.getRoutes().subscribe(response => {
      (<any>response).entities.forEach(route => {
        routes.push({
          uuid: route.uuid,
          routeName: route.routeName,
          cityId: route.cityId,
          stops: route.stops,
          points: route.points
        });
      });
      subject.next(routes);
    });
    return subject.asObservable();
  }
}
