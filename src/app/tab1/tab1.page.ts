import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';


declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{
  map: any;
  @ViewChild('map') mapElement: ElementRef;
  constructor(private geolocation: Geolocation, private platform: Platform){

  }

  ngOnInit() {
    this.platform.ready().then(() => {
      let mapOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);

      this.geolocation.getCurrentPosition().then(loc=>{
        let latlng= new google.maps.LatLng(loc.coords.latitude,loc.coords.longitude);
        this.map.setCenter(latlng);
        this.map.setZoom(14);
      }).catch(error =>{
        console.log('Error getting location', error);
      });
    });
  }
}
