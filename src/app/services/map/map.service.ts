import { Injectable } from '@angular/core';
import { JSService } from './../jsmap/js.service';
import { NativeService } from '../native/native.service';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  map: any;
  type: string;

  afs: AngularFirestore//for afs init

  constructor() {
    if(this.type=="native"){
      this.map = new NativeService(GoogleMaps); 
    }
    else{
      this.map = new JSService();
    }

   }

  async init(location, element, type){
    // await this.map.populateData(this.afs)
    this.map.init(location, element);
    this.type = type;
  }


}
