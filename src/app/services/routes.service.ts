import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Stop} from "../interfaces/stop";
import {CustomRoute} from "../interfaces/custom-route";
import {Coordinate} from "../interfaces/coordinate";
import {HttpRequestService} from "./http-request.service";
import {Entity} from "../interfaces/entity";

@Injectable()
export class RoutesService {

  routeToCityConnection = 'haveroutes';

  constructor(private http: HttpRequestService) {
  }

  getCities(): Observable<Entity[]> {
    const subject: Subject<Entity[]> = new Subject();
    const cities: Entity[] = new Array();
    this.http.getCities().subscribe(response => {
      (<any>response).entities.forEach(city => {
        cities.push({
          uuid: city.uuid,
          entityName: city.name
        });
      });
      subject.next(cities);
    });
    return subject.asObservable();
  }

  saveRoute(route: CustomRoute, city: Entity): Observable<null> {
    const subject = new Subject<null>();
    this.http.saveRouteWithConnectionToCity(route, city, this.routeToCityConnection).subscribe(() => {
      subject.next(null);
    }, error2 => {
      console.log(error2);
    });
    return subject.asObservable();
  }

  getRoutes(city: Entity): Observable<CustomRoute[]> {
    const subject: Subject<CustomRoute[]> = new Subject();
    const routes: CustomRoute[] = [];
    this.http.getRoutesByConnectionToCity(city, this.routeToCityConnection).subscribe(response => {
      (<any>response).entities.forEach(route => {
        routes.push({
          uuid: route.uuid,
          entityName: route.entityName,
          cityId: route.cityId,
          stopsForward: route.stops,
          points: route.points
        });
      });
      subject.next(routes);
    });
    return subject.asObservable();
  }

  getRoute(route: Entity): Observable<CustomRoute> {
    const subject: Subject<CustomRoute> = new Subject();
    const loadedRoute: CustomRoute = {};
    this.http.getRouteById(route).subscribe(response => {
      loadedRoute.uuid = (<any>response).entities[0].uuid;
      loadedRoute.entityName = (<any>response).entities[0].entityName;
      loadedRoute.cityId = (<any>response).entities[0].cityId;
      loadedRoute.stopsForward = (<any>response).entities[0].stops;
      loadedRoute.points = (<any>response).entities[0].points;
      subject.next(loadedRoute);
    });
    return subject.asObservable();
  }

  deleteRouteById(route: Entity) {
    this.http.deleteRouteById(route).subscribe(null, error2 => {
      console.log(error2);
    });
  }

  updateRoute(route: CustomRoute): Observable<null> {
    const subject: Subject<null> = new Subject();
    this.http.updateRoute(route).subscribe(() => {
      subject.next(null);
    });
    return subject.asObservable();
  }

  // Utils

  makeRouteInstance(): CustomRoute {
    const route: CustomRoute = {
      entityName: '',
      stopsForward: new Array<Stop>(),
      stopsBack: new Array<Stop>(),
      points: new Array<Coordinate>()
    };
    return route;
  }

  deleteStopFromList(stops: Stop[], stop: Entity): Stop[] {
    stops.splice(stops.findIndex(stopInArray => {
      return stop.uuid.localeCompare(stopInArray.uuid) === 0;
    }), 1);
    return stops;
  }
}
