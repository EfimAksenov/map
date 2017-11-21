import {Component, Input, OnInit} from '@angular/core';
import {Stop} from "../stop";

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

  constructor() {
    this.stops = new Array();
  }

  ngOnInit() {
  }

  mapClicked(event: MouseEvent) {
    this.stops.push({
      uuid: "1",
      name: "newStop",
      coordinate: {
        lat: event.coords.lat,
        lng: event.coords.lng
      }
    });
    console.log(this.stops);
  }

}
