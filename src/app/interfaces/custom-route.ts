import {Stop} from "./stop";
import {Coordinate} from "./coordinate";

export interface CustomRoute {
  uuid?: string;
  routeName: string;
  cityId?: string;
  stops?: Stop[];
  points?: Coordinate[];
}
