import {Coordinate} from "./coordinate";
import {Entity} from "./entity";

export interface Stop extends Entity{
  groupId?: string;
  coordinate: Coordinate;
}
