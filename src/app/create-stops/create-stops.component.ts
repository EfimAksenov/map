import {Component, Input, OnInit} from '@angular/core';
import {Stop} from "../interfaces/stop";
import {StopsService} from "../services/stops.service";
import {Observable} from "rxjs/Observable";
import {Entity} from "../interfaces/entity";

@Component({
  selector: 'app-create-stops',
  templateUrl: './create-stops.component.html',
  styleUrls: ['./create-stops.component.css']
})
export class CreateStopsComponent implements OnInit {

  @Input("lat") initLat = 54.962656;
  @Input("lng") initLng = 82.932969;
  @Input("zoom") initZoom = 15;

  stops: Stop[] = [];
  groups: Entity[] = [];
  selectedGroup: Entity = {};

  timeout = 1000;

  constructor(private stopsService: StopsService) {
  }

  ngOnInit() {
    this.loadGroups();
  }

  saveGroup(group: Entity) {
    this.stopsService.saveGroup(group, this.stops);
    this.loadGroups();
  }

  updateGroup(group: Entity) {
    this.selectedGroup.entityName = group.entityName;
    this.stopsService.updateGroup(this.selectedGroup, this.stops);
    this.loadGroups();
  }

  deleteGroup(group: Entity) {
    this.stopsService.deleteGroup(group);
    this.loadGroups();
  }

  loadStops(group: Entity) {
    this.stopsService.getStopsByGroup(group).subscribe(response => {
      this.stops = response;
    });
    this.selectedGroup = group;
  }

  loadGroups() {
    setTimeout(() => {
      this.stopsService.getGroups().subscribe(groups => {
        this.groups = groups;
      });
    }, this.timeout);
  }

  // Map events

  addStop(event: any) {
    this.stops.push({
      coordinate: {
        lat: event.coords.lat,
        lng: event.coords.lng
      }
    });
  }

  clear() {
    this.stops = [];
  }

  removeMarker(index) {
    this.stops.splice(index, 1);
  }
}
