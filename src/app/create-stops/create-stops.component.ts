import {Component, Input, OnInit} from '@angular/core';
import {Stop} from "../stop";
import {StopGroup} from "../stop-group";
import {StopsService} from "../stops.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-create-stops',
  templateUrl: './create-stops.component.html',
  styleUrls: ['./create-stops.component.css']
})
export class CreateStopsComponent implements OnInit {

  @Input("lat") initLat = 54.962656;
  @Input("lng") initLng = 82.932969;
  @Input("zoom") initZoom = 15;

  stops: Stop[] = new Array();
  groups: Observable<StopGroup[]>;
  group: StopGroup;

  timeout = 1000;

  constructor(private stopsService: StopsService) {
    this.group = {
      uuid: "",
      name: ""
    };
  }

  ngOnInit() {
    this.loadGroups();
  }

  addStop(event: any) {
    this.stops.push({
      uuid: "",
      groupId: "",
      coordinate: {
        lat: event.coords.lat,
        lng: event.coords.lng
      }
    });
  }

  deleteStop(event: MouseEvent) {
    this.stops.pop();
  }

  setName(stopGroupName) {
    this.group.name = stopGroupName;
  }

  saveGroup() {
    this.stopsService.saveGroup(this.group, this.stops);
    this.loadGroups();
  }

  updateGroup(group: StopGroup) {
    this.stopsService.updateGroup(group, this.stops);
    this.loadGroups();
  }

  deleteGroup(group: StopGroup) {
    this.stopsService.deleteGroup(this.group);
    this.loadGroups();
  }

  loadStops(group: StopGroup) {
    this.stopsService.getStopsByGroup(group).subscribe(response => {
      this.stops = response;
    });
    this.group = group;
  }

  loadGroups() {
    setTimeout(() => {
      this.groups = this.stopsService.getGroups();
    }, this.timeout);
  }

  clear() {
    this.stops = new Array();
  }

  removeMarker(index) {
    this.stops.splice(index, 1);
  }
}
