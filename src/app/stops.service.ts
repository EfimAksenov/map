import {Injectable} from '@angular/core';
import {Stop} from "./stop";
import {StopGroup} from "./stop-group";
import {Observable} from "rxjs/Observable";
import {StopDaoService} from "./stop-dao.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

@Injectable()
export class StopsService {

  private connection = 'contain';

  constructor(private stopDAO: StopDaoService) {
  }

  saveGroup(group: StopGroup, stops: Stop[]) {
    this.stopDAO.createGroup(group).subscribe(response => {
      group.uuid = response.entities[0].uuid;
      this.saveStopsWithConnectionToGroup(group, stops);
    }, response => {
      console.log(response);
    });
  }

  updateGroup(group: StopGroup, stops: Stop[]) {
  this.deleteGroup(group).subscribe(() => {
    this.saveGroup(group, stops);
  });
  }

  private saveStopsWithConnectionToGroup(group: StopGroup, stops: Stop[]) {
    stops.forEach(stop => {
      stop.groupId = group.uuid;
      this.stopDAO.createStopWithConnectionToGroup(group, stop, this.connection)
        .subscribe(null, resp => console.log(resp));
    });
  }

  deleteGroup(group: StopGroup): Observable<{}> {
    let subject = new Subject();
    this.getStopsByGroup(group).subscribe(stops => {
      stops.forEach(stop => {
        this.stopDAO.deleteStop(stop).subscribe(null, error => {
          console.log(error);
        });
      });
      this.stopDAO.deleteGroup(group).subscribe(() => {
        subject.next(group);
      }, error => {
        console.log(error);
      });
    });
    return subject.asObservable();
  }


  getGroups(): Observable<StopGroup []> {
    let groups: StopGroup[] = new Array();
    let subject = new BehaviorSubject(groups);
    this.stopDAO.getGroups().subscribe(response => {
      response.entities.forEach(group => {
        groups.push({
          uuid: group.uuid,
          name: group.name
        });
      });
      subject.next(groups);
    });
    return subject.asObservable();
  }

  getStopsByGroup(group: StopGroup): Observable<Stop[]> {
    let stops: Stop[] = new Array();
    let subject: Subject<Stop[]> = new Subject();
    this.stopDAO.getStopsByGroupAndConnection(group, this.connection).subscribe(response => {
      response.entities.forEach(entity => {
        stops.push({
          uuid: entity.uuid,
          groupId: entity.groupId,
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
