import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { MapService } from '../services/map/map.service';
import { JSService } from '../services/jsmap/js.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dataline } from '../classes/dataline';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{

  @ViewChild('map') mapElement: ElementRef; // for #map modifying based on chosen service

  location: {
    latitude: number,
    longitude: number
  };

  //firestore
  collection: AngularFirestoreCollection;
  doc: any;

  constructor(private platform: Platform, public geolocation: Geolocation, public mapservice: MapService,public jsservice: JSService, public afs: AngularFirestore){

  }

  setHMCO(){
    this.jsservice.CO();
  }

  setHMCO2(){
    this.jsservice.CO2();
  }
  setHMNH4(){

  }
  setHMEth(){

  }
  setHMTol(){
    this.jsservice.Ace();
  }
  setHMAce(){

  }




  async ngOnInit() {
    await this.platform.ready();
    setTimeout(() => {

      this.loadMap();

    }, 3000);  } // allows for init time of JS map(slower), for native we can scrap the timer BUT we only use JS
  
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

      this.collection = this.afs.collection<Dataline>('weightage');
      this.doc = this.collection.snapshotChanges();
      this.jsservice.init(this.location, this.mapElement,this.doc);


       // to use native cordova version change js to native 
      //DONT MESS WITH IT IF YOU DONT KNOW WHAT YOURE DOING, it could break the build and i dont want to deal with that - niru
      // native = faster but bunch of features missing / js = feature filled but slower 
      
      // this calls mapservice init() --> depending on string goes to either nativeserv or jsserv--> init() in jsserv/nativeserv and plops out nice baby map
      // we use js as it has heatmap functionalities
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
