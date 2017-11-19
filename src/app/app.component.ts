import { Component } from '@angular/core';
import { AgmCoreModule, LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'My first AGM project';
  latA: number = 54.962656;
  lngA: number = 82.932969;

  latB: number = 54.96;
  lngB: number = 82.93;

   zoom: number = 10;

}
