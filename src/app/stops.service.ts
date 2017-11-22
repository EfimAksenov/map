import {Injectable} from '@angular/core';
import {Stop} from "./stop";
import {StopGroup} from "./stop-group";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StopsService {

  url = "http://10.1.1.161:8080/TEST-ORGANIZATION/TEST-APP";
  org = "TEST-ORGANIZATION";
  app = "TEST-APP";

  constructor(private http: HttpClient) {
  }

  saveStops(group: StopGroup, stops: Stop[]) {
    let groupId: string;
    this.http.post('http://10.1.1.161:8080/TEST-ORGANIZATION/TEST-APP/stopGroups', group).subscribe(response => {
      groupId = response.entities[0].uuid;
      stops.forEach(stop => {
        stop.groupId = groupId;
        this.http.post(this.url + "/stopGroups/" + groupId + "/contain/stops", stop).subscribe(null, resp => console.log(resp));
      });
    }, response => {
      console.log(response);
    });
  }

  getGroups() {
    let groups: StopGroup[] = new Array();
    this.http.get(this.url + "/stopgroups").subscribe(response => {
      response.entities.forEach(group => {
        groups.push({
          uuid: group.uuid,
          name: group.name
        });
      });
    });
    return groups;
  }

  getStopesByGroupId(id: string) {
    let stops: Stop[] = new Array();
    this.http.get(this.url + "/stopGroups/" + id + "/contain").subscribe(response => {
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
    });
    return stops;
  }
}
