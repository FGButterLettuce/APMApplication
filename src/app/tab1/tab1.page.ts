import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{

  location: {
    latitude: number,
    longitude: number
  };


  @ViewChild('map') mapElement: ElementRef; // for #map modifying based on chosen service

  constructor(private platform: Platform, public geolocation: Geolocation, public mapservice: MapService){
  }

  async ngOnInit() {
    await this.platform.ready();
    setTimeout(() => {

      this.loadMap();

    }, 3000);  }
  
  loadMap(){
    let locopt={
      enableHighAccuracy: true,
      timeout: 25000
    }

    this.geolocation.getCurrentPosition(locopt).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      this.mapservice.init(this.location, this.mapElement, "js"); // to use native cordova version change js to native 

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
