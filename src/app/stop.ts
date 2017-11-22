import {LatLngLiteral} from "@agm/core";

export interface Stop {
  uuid: string;
  groupId: string;
  coordinate: LatLngLiteral;
}
