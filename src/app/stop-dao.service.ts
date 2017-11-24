import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StopGroup} from "./stop-group";
import {Observable} from "rxjs/Observable";
import {Stop} from "./stop";

@Injectable()
export class StopDaoService {

  url = 'http://10.1.1.161:8080/TEST-ORGANIZATION/MAPS/';
  urlGroups = this.url + 'stopGroups/';

  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<Object> {
    return this.http.get(this.urlGroups);
  }

  getStopsByGroupAndConnection(group: StopGroup, connection: string): Observable<Object> {
    return this.http.get(this.urlGroups + group.uuid + '/' + connection);
  }

  createGroup(group: StopGroup): Observable<Object> {
    return this.http.post(this.urlGroups, group);
  }

  createStopWithConnectionToGroup(group: StopGroup, stop: Stop, connection: string): Observable<Object> {
    return this.http.post(this.urlGroups + group.uuid + '/' + connection + '/stops/', stop);
  }

  deleteConnection(group: StopGroup, connection: string): Observable<Object> {
    return this.http.delete(this.urlGroups + group.uuid + '/' + connection);
  }

  deleteStop(stop: Stop): Observable<Object> {
    return this.http.delete(this.url + 'stops/' + stop.uuid);
  }

  deleteGroup(group: StopGroup): Observable<Object> {
    return this.http.delete(this.urlGroups + group.uuid);
  }


}
