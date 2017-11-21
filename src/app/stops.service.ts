import {Injectable} from '@angular/core';
import {Stop} from "./stop";

@Injectable()
export class StopsService {

  stops: Stop[];

  constructor() {
    this.stops = new Array();
  }

  saveStops(stops: Stop[]) {
    this.stops = stops;
  }
}
