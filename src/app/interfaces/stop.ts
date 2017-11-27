import {Coordinate} from "./coordinate";

export interface Stop {
  uuid?: string;
  groupId?: string;
  stopName?: string;
  coordinate: Coordinate;
}
