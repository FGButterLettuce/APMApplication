import { Injectable } from '@angular/core';
import { GoogleMap, GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps/ngx';

@Injectable({
  providedIn: 'root'
})
export class NativeService {
  map: GoogleMap;
  constructor(public googleMaps: GoogleMaps) {
    
  }

  init(location, element){
    let latLng = new LatLng(location.latitude, location.longitude);

    let mapOptions= {
      camera : {
        latLng: latLng,
        zoom: 15
      },
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };

    this.map = GoogleMaps.create(element.nativeElement, mapOptions);    
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }
}
