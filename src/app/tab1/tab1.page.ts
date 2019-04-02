import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{

  map: GoogleMap;
  location: {
    latitude: number,
    longitude: number
  };


  @ViewChild('map') mapElement: ElementRef; // for JS api

  constructor(private platform: Platform, public geolocation: Geolocation, public mapservice: MapService){
  }

  async ngOnInit() {
    await this.platform.ready();
    setTimeout(() => {

      this.loadMap();

    }, 3000);  }
  
  loadMap(){
    // let mapOptions = {
    //   zoom: 10,
    //   mapTypeControl: false,
    //   streetViewControl: false,
    //   fullscreenControl: false
    // }

    // this.map = GoogleMaps.create('map',mapOptions);
    let locopt={
      enableHighAccuracy: true,
      timeout: 25000
    }

    this.geolocation.getCurrentPosition(locopt).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      this.mapservice.init(this.location, this.mapElement, "js");

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
    // LocationService.getMyLocation(locopt).then(loc=>{
    //   let latlng= loc.latLng;
    //   this.map.setCameraTarget(latlng);
    //   this.map.setCameraZoom(14);
    // }).catch(error =>{
    //   console.log('Error getting location', error);
    // });
  
}
