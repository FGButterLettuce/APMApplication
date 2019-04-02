import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class JSService {

  map:any;
  poldata:[]; //for use by populate
  constructor() {  }

  populateData(){
   
    // we need the data to be populated here using some magick
    // in a JSON format that looks like location: x , weight: x
    // do some magick to make it fit into a nice array and then the
    // result we will plop into the heatmap
  }

  init(location,element){
    let latLng= new google.maps.LatLng(location.latitude, location.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };
    var heatMapData = [
      {location: new google.maps.LatLng(25.306288, 55.487707), weight: 9},
      {location: new google.maps.LatLng(25.307711, 55.485403), weight: 6},
      {location: new google.maps.LatLng(25.311251, 55.485886), weight: 5}
    ]; //format of weighted heatmap data (currently showing 3 points on the road outside uni)
    this.map = new google.maps.Map(element.nativeElement, mapOptions);
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatMapData,
      dissipating: true,
      maxIntensity: 10,
      radius: 15,
      opacity: 1.0,
      map: this.map
    });  // This defines the heatmap we see, if dissipating is set false and radius is low, we see nothing. bump radius up and you'll start seeing the circles
  }
}
