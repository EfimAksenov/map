import {Stop} from "./stop";
import {Coordinate} from "./coordinate";
import {Entity} from "./entity";

export interface CustomRoute extends Entity{
  cityId?: string;
  stops?: Stop[];
  points?: Coordinate[];
}
