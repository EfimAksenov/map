import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CustomRoute} from "../interfaces/custom-route";
import {City} from "../interfaces/city";

@Injectable()
export class RoutesDaoService {

  url = 'http://10.1.1.161:8080/TEST-ORGANIZATION/MAPS/';

  constructor(private http: HttpClient) {
  }

  getCities(): Observable<Object> {
    return this.http.get(this.url + 'cities');
  }

  saveRouteWithConnectionToCity(route: CustomRoute, city: City, connection: string): Observable<Object> {
    return this.http.post(this.url + 'cities/' + city.uuid + '/' + connection + '/routes/', route);
  }

  getRoutes(): Observable<Object> {
    return this.http.get(this.url + 'routes');
  }
}
