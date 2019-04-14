import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dataline } from 'src/app/classes/dataline';
import { Observable } from 'rxjs';

declare var google;



@Injectable({
  providedIn: 'root'
})
export class JSService {

  map:any;

  poldata:[]; //for use by heatmaps

  doc;
  
//  campaign{
//    start:Date,
//    end: Date,
//    org: String
//    };
 

  constructor() { 

  }

  async CO(){
    this.poldata = [];
    let pointArray = new google.maps.MVCArray(this.poldata);
    await this.doc.subscribe((value)=>{
      for(let x of value){
        pointArray.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().co});
      }
    });
    this.populateData(pointArray);
  }

  async CO2(){
    this.poldata = [];
    let pointArray = new google.maps.MVCArray(this.poldata);
    await this.doc.subscribe((value)=>{
      for(let x of value){
        pointArray.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().co2});
      }
    });
    this.populateData(pointArray);
  }

  async NH4(){
    this.poldata = [];
    let pointArray = new google.maps.MVCArray(this.poldata);
    await this.doc.subscribe((value)=>{
      for(let x of value){
        pointArray.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().nh4});
      }
    });
    this.populateData(pointArray);
  }

  async Eth(){
    this.poldata = [];
    let pointArray = new google.maps.MVCArray(this.poldata);
    await this.doc.subscribe((value)=>{
      for(let x of value){
        pointArray.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().eth});
      }
    });
    this.populateData(pointArray);
  }

  async Tol(){
    this.poldata = [];
    let pointArray = new google.maps.MVCArray(this.poldata);
    await this.doc.subscribe((value)=>{
      for(let x of value){
        pointArray.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().tol});
      }
    });
    this.populateData(pointArray);
  }

  async Ace(){
    this.poldata = [];
    let pointArray = new google.maps.MVCArray(this.poldata);
    await this.doc.subscribe((value)=>{
      for(let x of value){
        pointArray.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().ace});
      }
    });
    this.populateData(pointArray);
  }



  
  populateData(pointArray){
    
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

  async init(location,element,doc){
    this.doc = doc;
    let latLng= new google.maps.LatLng(location.latitude, location.longitude);
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




    this.map = new google.maps.Map(element.nativeElement, mapOptions);
      // This defines the heatmap we see, if dissipating is set false and radius is low, we see nothing. bump radius up and you'll start seeing the circles
  }
}
