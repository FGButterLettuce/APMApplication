import { Injectable } from '@angular/core';
import { JSService } from './../jsmap/js.service';
import { NativeService } from '../native/native.service';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  map: any;
  type: string;

  constructor() {
    if(this.type=="native"){
      this.map = new NativeService(GoogleMaps); 
    }
    else{
      this.map = new JSService();
    }

   }

  init(location, element, type){
    this.map.init(location, element);
    this.type = type;
  }


}
