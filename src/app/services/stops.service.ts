import {Injectable} from '@angular/core';
import {Stop} from "../interfaces/stop";
import {Observable} from "rxjs/Observable";
import {HttpRequestService} from "./http-request.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Entity} from "../interfaces/entity";

@Injectable()
export class StopsService {

  private connection = 'contain';

  constructor(private http: HttpRequestService) {
  }

  saveGroup(group: Entity, stops: Stop[]) {
    this.http.createGroup(group).subscribe(response => {
      group.uuid = (<any>response).entities[0].uuid;
      this.saveStopsWithConnectionToGroup(group, stops);
    }, response => {
      console.log(response);
    });
  }

  // todo: refactor
  updateGroup(group: Entity, stops: Stop[]) {
    this.deleteGroup(group).subscribe(() => {
      this.saveGroup(group, stops);
    });
  }

  private saveStopsWithConnectionToGroup(group: Entity, stops: Stop[]) {
    stops.forEach(stop => {
      stop.groupId = group.uuid;
      stop.entityName = group.entityName;
      this.http.createStopWithConnectionToGroup(group, stop, this.connection)
        .subscribe(null, resp => console.log(resp));
    });
  }

  deleteGroup(group: Entity): Observable<{}> {
    const subject = new Subject();
    this.getStopsByGroup(group).subscribe(stops => {
      stops.forEach(stop => {
        this.http.deleteStop(stop).subscribe(null, error => {
          console.log(error);
        });
      });
      this.http.deleteGroup(group).subscribe(() => {
        subject.next(group);
      }, error => {
        console.log(error);
      });
    });
    return subject.asObservable();
  }


  getGroups(): Observable<Entity []> {
    const groups: Entity[] = new Array();
    const subject = new BehaviorSubject(groups);
    this.http.getGroups().subscribe(response => {
      (<any>response).entities.forEach(group => {
        groups.push({
          uuid: group.uuid,
          entityName: group.entityName
        });
      });
      subject.next(groups);
    });
    return subject.asObservable();
  }

  getStopsByGroup(group: Entity): Observable<Stop[]> {
    const stops: Stop[] = new Array();
    const subject: Subject<Stop[]> = new Subject();
    this.http.getStopsByGroupAndConnection(group, this.connection).subscribe(response => {
      (<any>response).entities.forEach(entity => {
        stops.push({
          uuid: entity.uuid,
          groupId: entity.groupId,
          entityName: entity.entityName,
          coordinate: {
            lat: entity.coordinate.lat,
            lng: entity.coordinate.lng,
          }
        });
      });
      subject.next(stops);
    });
    return subject.asObservable();
  }

  getAllStops(): Observable<Stop[]> {
    const stops: Stop[] = new Array();
    const subject: Subject<Stop[]> = new Subject();
    this.http.getAllStops().subscribe(response => {
      (<any>response).entities.forEach(entity => {
        stops.push({
          uuid: entity.uuid,
          groupId: entity.groupId,
          entityName: entity.entityName,
          coordinate: {
            lat: entity.coordinate.lat,
            lng: entity.coordinate.lng,
          }
        });
      });
      subject.next(stops);
    });
    return subject.asObservable();
  }

}
