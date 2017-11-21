import {LatLngLiteral} from "@agm/core";

export interface Stop {
  uuid: string;
  name: string;
  coordinate: LatLngLiteral;
}
