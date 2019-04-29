import { Injectable, ElementRef } from '@angular/core';

import 'heatmap.js'
import 'heatmap.js/plugins/gmaps-heatmap';
import 'leaflet'
import 'google-maps'
import 'leaflet.heat'
declare var google;
declare var L: any;
declare var HeatmapOverlay;

@Injectable({
  providedIn: 'root'
})

export class JSService {

  map: any;

  poldata: []; //for use by heatmaps

  doc;
  loc;
  elmt: ElementRef;
  //  campaign{
  //    start:Date,
  //    end: Date,
  //    org: String
  //    };


  constructor() {

  }


 async heatmapc() {
    let mapOptions = {
      center: new google.maps.LatLng(this.loc.latitude, this.loc.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };
    var nmap = new google.maps.Map(this.elmt.nativeElement, mapOptions);

    var heatmap = new HeatmapOverlay(nmap, 
      {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": 2,
        "maxOpacity": 1, 
        // scales the radius based on map zoom
        "scaleRadius": true, 
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries 
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'weight'
      }
    );
    // this.map = L.map("map").fitWorld();
    // L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    //   maxZoom: 20,
    //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    // }).addTo(this.map);
    // this.map.locate({
    //   setView: true,
    //   maxZoom: 10
    // }).on('locationfound', (e) => {
    //   let markerGroup = L.featureGroup();
    //   let marker: any = L.marker([e.latitude, e.longitude]).on('click', () => {
    //     alert('Marker clicked');
    //   })
    //   markerGroup.addLayer(marker);
    //   this.map.addLayer(markerGroup);
    // }).on('locationerror', (err) => {
    //   alert(err.message);
    // });
    let array = [];
    await this.doc.subscribe((value) => {
      for (let x of value) {
        array.push([[Number(x.payload.doc.data().lat), Number(x.payload.doc.data().lon), x.payload.doc.data().ace]])
      }
    });
    console.log(array);
    // var heat = L.heatLayer(array, {
    //   radius: 20,
    //   blur: 15,
    //   maxZoom: 17,
    // }).addTo(this.map);


    var testdata = {
      max : 500,
      data: array
    }
    heatmap.setData(testdata);

  }
  Ace() {
    let pointArrayace = new google.maps.MVCArray([]);
    this.doc.subscribe((value) => {
      for (let x of value) {
        pointArrayace.push({ location: new google.maps.LatLng(x.payload.doc.data().lat, x.payload.doc.data().lon), weight: x.payload.doc.data().ace });
      }
    });
    var heatmap2 = new google.maps.visualization.HeatmapLayer({
      data: pointArrayace,
      dissipating: true,
      maxIntensity: 10,
      radius: 15,
      opacity: 1.0,
      map: this.map
    });
    // this.populateData(pointArray);
  }




  populateData(pointArray) {

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray,
      dissipating: true,
      maxIntensity: 10,
      radius: 15,
      opacity: 1.0,
      map: this.map
    });

    // we need the data to be populated here using some magick
    // in a JSON format that looks like location: x , weight: x
    // do some magick to make it fit into a nice array and then the
    // result we will plop into the heatmap
    // this.map.heatmap.setMap(null);

  }

  async init(location, element, doc) {
    this.doc = doc;
    this.loc = location;
    this.elmt = element;
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);
    console.log(doc);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };

    // var heatMapData = [
    //   {location: new google.maps.LatLng(25.306288, 55.487707), weight: 9},
    //   {location: new google.maps.LatLng(25.307711, 55.485403), weight: 6},
    //   {location: new google.maps.LatLng(25.311251, 55.485886), weight: 5}
    // ]; 
    //format of weighted heatmap data (currently showing 3 points on the road outside uni)

    // let pointArray = new google.maps.MVCArray(heatMapData);




    // this.map = new google.maps.Map(element.nativeElement, mapOptions);


    this.heatmapc();
    // This defines the heatmap we see, if dissipating is set false and radius is low, we see nothing. bump radius up and you'll start seeing the circles
  }
}
