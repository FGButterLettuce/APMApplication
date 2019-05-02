import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { MapService } from '../services/map/map.service';
import { JSService } from '../services/jsmap/js.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dataline } from '../classes/dataline';


import * as L from 'leaflet';
import 'heatmap.js'
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap'
import { DonutService } from '../services/donut.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  @ViewChild('map') public mapElement: ElementRef; // for #map modifying based on chosen service


  location: {
    latitude: number,
    longitude: number
  };
c
  //firestore
  collection: AngularFirestoreCollection;
  doc: any;
  heatmap;
  constructor(public donut:DonutService, private platform: Platform, public geolocation: Geolocation, public mapservice: MapService, public jsservice: JSService, public afs: AngularFirestore) {

  }


  setHMCO() {
    var array = [];
    var testdata;

    var cfgco = {
      "radius": 40,
      "maxOpacity": .8,
      "scaleRadius": false,
      "useLocalExtrema": true,
      "gradient": {
        '.6': 'cyan',
        '.7': 'blue',
        '.9': 'red'
      },
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };
    this.heatmap.reconfigure(cfgco);
    this.doc.subscribe((value) => {
      for (let i = 0; i < value.data().lat_arr.length; i++) {
        array.push({ lat: value.data().lat_arr[i], lng: value.data().long_arr[i], count: value.data().ace_arr[i] })
      }
    });

    setTimeout(() => {

      testdata = {
        max: 1000,
        // min : 0,
        data: array
      }
    }, 500);

    setTimeout(() => {
      this.heatmap.setData(testdata);
    }, 1000);
  }

  setHMCO2() {
    var array = [];
    var testdata;

    var cfgco2 = {
      "radius": 40,
      "maxOpacity": .8,
      "scaleRadius": false,
      "useLocalExtrema": true,
      "gradient": {
        '.6': 'yellow',
        '.7': 'orange',
        '.9': 'red'
      },
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };
    this.heatmap.reconfigure(cfgco2);

    this.doc.subscribe((value) => {
      for (let i = 0; i < value.data().lat_arr.length; i++) {
        array.push({ lat: value.data().lat_arr[i], lng: value.data().long_arr[i], count: value.data().co2_arr[i] })
      }
    });

    setTimeout(() => {

      testdata = {
        max: 1000,
        // min : 0,
        data: array
      }
    }, 500);

    setTimeout(() => {
      this.heatmap.setData(testdata);
    }, 1000);
  }

  setHMNH4() {
    var array = [];
    var testdata;

    var cfgnh4 = {
      "radius": 40,
      "maxOpacity": .8,
      "scaleRadius": false,
      "useLocalExtrema": true,
      "gradient": {
        '.6': 'magenta',
        '.7': 'purple',
        '.9': 'red'
      },
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };
    this.heatmap.reconfigure(cfgnh4);

    this.doc.subscribe((value) => {
      console.log(value.data())
      for (let i = 0; i < value.data().lat_arr.length; i++) {
        array.push({ lat: value.data().lat_arr[i], lng: value.data().long_arr[i], count: value.data().nh4_arr[i] })
      }
    });

    setTimeout(() => {

      testdata = {
        max: 1000,
        // min : 0,
        data: array
      }
    }, 500);

    setTimeout(() => {
      this.heatmap.setData(testdata);
    }, 1000);
  }

  setHMEth() {
    var array = [];
    var testdata;

    var cfgeth = {
      "radius": 40,
      "maxOpacity": .8,
      "scaleRadius": false,
      "useLocalExtrema": true,
      "gradient": {
        '.6': 'pink',
        '.7': 'purple',
        '.9': 'red'
      },
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };
    this.heatmap.reconfigure(cfgeth);

    this.doc.subscribe((value) => {
      for (let i = 0; i < value.data().lat_arr.length; i++) {
        array.push({ lat: value.data().lat_arr[i], lng: value.data().long_arr[i], count: value.data().eth_arr[i] })
      }
    });

    setTimeout(() => {

      testdata = {
        max: 1000,
        data: array
      }
    }, 500);

    setTimeout(() => {
      this.heatmap.setData(testdata);
    }, 1000);
  }

  setHMAce() {
    var array = [];
    var testdata;

    var cfgace = {
      "radius": 40,
      "maxOpacity": .8,
      "scaleRadius": false,
      "useLocalExtrema": true,
      "gradient": {
        '.6': 'white',
        '.7': 'yellow',
        '.9': 'red'
      },
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };
    this.heatmap.reconfigure(cfgace);

    this.doc.subscribe((value) => {
      for (let i = 0; i < value.data().lat_arr.length; i++) {
        array.push({ lat: value.data().lat_arr[i], lng: value.data().long_arr[i], count: value.data().ace_arr[i] })
      }
    });

    setTimeout(() => {

      testdata = {
        max: 1000,
        // min : 0,
        data: array
      }
    }, 500);

    setTimeout(() => {
      this.heatmap.setData(testdata);
    }, 1000);
  }

  setHMTol() {
    var array = [];
    var testdata;

    var cfgtol = {
      "radius": 40,
      "maxOpacity": .8,
      "scaleRadius": false,
      "useLocalExtrema": true,
      "gradient": {
        '.6': 'blue',
        '.7': 'red',
        '.9': 'white'
      },
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };
    this.heatmap.reconfigure(cfgtol);

    this.doc.subscribe((value) => {
      for (let i = 0; i < value.data().lat_arr.length; i++) {
        array.push({ lat: value.data().lat_arr[i], lng: value.data().long_arr[i], count: value.data().tol_arr[i] })
      }
    });

    setTimeout(() => {

      testdata = {
        max: 1000,
        // min : 0,
        data: array
      }
    }, 500);

    setTimeout(() => {
      this.heatmap.setData(testdata);
    }, 1000);
  }





  async ngOnInit() {
    await this.platform.ready();
    setTimeout(() => {

      this.loadMap();

    }, 1500); // allows for init time of JS map(slower), for native we can scrap the timer BUT we only use JS

  }

  loadMap() {
    let locopt = {
      enableHighAccuracy: true,
      timeout: 25000
    }

    this.geolocation.getCurrentPosition(locopt).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      this.collection = this.afs.collection<Dataline>('cluster');
      this.doc = this.collection.doc('clustering').get();
      this.mapset();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  
  mapset() {
    var cfg = {
      "radius": 20,
      "maxOpacity": .8,
      "scaleRadius": false,
      "useLocalExtrema": true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };

    this.heatmap = new HeatmapOverlay(cfg);

    var baseLayer = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Google Maps JavaScript API © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 20
      }
    );

    var center = new L.LatLng(this.location.latitude, this.location.longitude)

    var map = new L.Map(this.mapElement.nativeElement, {
      center: center,
      zoom: 15,
      layers: [baseLayer, this.heatmap]
    });
  }
}

