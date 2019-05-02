import { Injectable, ElementRef } from '@angular/core';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';




import * as L from 'leaflet';
// import * as HeatmapOverlay from 'heatmap.js'

import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';

// import 'leaflet'
// import 'google-maps'
// import 'gmaps.overlays'
// import 'leaflet.heat'
// import { HeatmapOverlay } from 'heatmap.js/plugins/gmaps-heatmap';
declare var google;

@Injectable({
  providedIn: 'root'
})

export class JSService {

  map: any;

  poldata: []; //for use by heatmaps

  doc;
  loc;
  elmt: ElementRef;



  constructor() {

  }


  heatmapc() {


    

    // heatmap.setData(testdata);

  }
  // Ace() {
  //   let pointArrayace = new google.maps.MVCArray([]);
  //   this.doc.subscribe((value) => {
  //     for (let x of value) {
  //       pointArrayace.push({ location: new google.maps.LatLng(x.payload.doc.data().lat, x.payload.doc.data().lon), weight: x.payload.doc.data().ace });
  //     }
  //   });
  //   var heatmap2 = new google.maps.visualization.HeatmapLayer({
  //     data: pointArrayace,
  //     dissipating: true,
  //     maxIntensity: 10,
  //     radius: 15,
  //     opacity: 1.0,
  //     map: this.map
  //   });
  //   // this.populateData(pointArray);
  // }




  // populateData(pointArray) {

  //   var heatmap = new google.maps.visualization.HeatmapLayer({
  //     data: pointArray,
  //     dissipating: true,
  //     maxIntensity: 10,
  //     radius: 15,
  //     opacity: 1.0,
  //     map: this.map
  //   });

  //   // we need the data to be populated here using some magick
  //   // in a JSON format that looks like location: x , weight: x
  //   // do some magick to make it fit into a nice array and then the
  //   // result we will plop into the heatmap
  //   // this.map.heatmap.setMap(null);

  // }

  async init(location, element, doc) {
    this.doc = doc;
    this.loc = location;
    this.elmt = element;
    // let latLng = new google.maps.LatLng(location.latitude, location.longitude);
    // console.log(doc);
    // let mapOptions = {
    //   center: latLng,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP,
    //   mapTypeControl: false,
    //   streetViewControl: false,
    //   fullscreenControl: false
    // };





    // this.map = new google.maps.Map(element.nativeElement, mapOptions);


    this.heatmapc();
  }
}






    // let array = [];
    // this.doc.subscribe((value) => {
    //   for (let x of value) {
    //     array.push([[Number(x.payload.doc.data().lat), Number(x.payload.doc.data().lon), x.payload.doc.data().ace]])
    //   }
    // });
    // console.log(array); 