import { Component } from '@angular/core';
import { AgmCoreModule, LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My first AGM project';
  latA = 54.962656;
  lngA = 82.932969;

  latB= 54.96;
  lngB = 82.93;

   zoom = 15;
   map: any;

   initMap(event) {
     this.map = event;
     console.log(this.map);
     console.log(this.map.center.lat());
   }

   createStop() {
     console.log('create stop');
   }

   centerChange(event) {
     console.log(event);
   }
}
