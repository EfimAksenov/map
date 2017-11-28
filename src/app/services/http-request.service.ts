import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Stop} from "../interfaces/stop";
import {CustomRoute} from "../interfaces/custom-route";
import {Entity} from "../interfaces/entity";

@Injectable()
export class HttpRequestService {

  url = 'http://10.1.1.161:8080/TEST-ORGANIZATION/MAPS/';
  urlGroups = this.url + 'stopGroups/';

  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<Object> {
    return this.http.get(this.urlGroups);
  }

  getStopsByGroupAndConnection(group: Entity, connection: string): Observable<Object> {
    return this.http.get(this.urlGroups + group.uuid + '/' + connection);
  }

  createGroup(group: Entity): Observable<Object> {
    return this.http.post(this.urlGroups, group);
  }

  createStopWithConnectionToGroup(group: Entity, stop: Stop, connection: string): Observable<Object> {
    return this.http.post(this.urlGroups + group.uuid + '/' + connection + '/stops/', stop);
  }

  deleteConnection(group: Entity, connection: string): Observable<Object> {
    return this.http.delete(this.urlGroups + group.uuid + '/' + connection);
  }

  deleteStop(stop: Stop): Observable<Object> {
    return this.http.delete(this.url + 'stops/' + stop.uuid);
  }

  deleteGroup(group: Entity): Observable<Object> {
    return this.http.delete(this.urlGroups + group.uuid);
  }

  getAllStops(): Observable<Object> {
    return this.http.get(this.url + 'stops');
  }

  getCities(): Observable<Object> {
    return this.http.get(this.url + 'cities');
  }

  saveRouteWithConnectionToCity(route: CustomRoute, city: Entity, connection: string): Observable<Object> {
    return this.http.post(this.url + 'cities/' + city.uuid + '/' + connection + '/routes/', route);
  }

  getRoutesByConnectionToCity(city: Entity, connection: string): Observable<Object> {
    return this.http.get(this.url + 'cities/' + city.uuid + '/' + connection);
  }

  getRouteById(route: Entity): Observable<Object> {
    return this.http.get(this.url + 'routes/' + route.uuid);
  }

  getAllRoutes(): Observable<Object> {
    return this.http.get(this.url + 'routes');
  }
}
