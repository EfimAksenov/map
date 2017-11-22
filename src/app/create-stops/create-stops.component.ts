import {Component, Input, OnInit} from '@angular/core';
import {Stop} from "../stop";
import {StopGroup} from "../stop-group";
import {StopsService} from "../stops.service";

@Component({
  selector: 'app-create-stops',
  templateUrl: './create-stops.component.html',
  styleUrls: ['./create-stops.component.css']
})
export class CreateStopsComponent implements OnInit {

  @Input("lat") initLat = 54.962656;
  @Input("lng") initLng = 82.932969;
  @Input("zoom") initZoom = 15;

  stops: Stop[];
  groups: StopGroup[];
  group: StopGroup;

  constructor(private stopsService: StopsService) {
    this.stops = new Array();
    this.groups = new Array();
    this.group = {
      uuid: "",
      name: ""
    };
  }

  ngOnInit() {
    this.groups = this.stopsService.getGroups();
  }

  addStop(event: MouseEvent) {
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

  saveStops() {
    this.stopsService.saveStops(this.group, this.stops);
    this.groups = this.stopsService.getGroups();
  }

  loadGroup(group: StopGroup) {
    this.stops = this.stopsService.getStopesByGroupId(group.uuid);
    this.group = group;
  }

  clear() {
    this.stops = new Array();
  }

  removeMarker(index) {
    this.stops.splice(index, 1);
  }
}
