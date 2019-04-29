import { Injectable } from '@angular/core';


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

  CO(){
    let pointArrayco = new google.maps.MVCArray([]);
     this.doc.subscribe((value)=>{
      for(let x of value){
        pointArrayco.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().co});
      }
    });
    var gradi = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ] 
    var heatmap1 = new google.maps.visualization.HeatmapLayer({
      data: pointArrayco,
      dissipating: true,
      maxIntensity: 10,
      gradient: gradi,
      radius: 15,
      opacity: 1.0,
      map: this.map
    });
    // this.populateData(pointArray);
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

  Ace(){
    let pointArrayace = new google.maps.MVCArray([]);
     this.doc.subscribe((value)=>{
      for(let x of value){
        pointArrayace.push({location: new google.maps.LatLng(x.payload.doc.data().lat,x.payload.doc.data().lon), weight: x.payload.doc.data().ace});
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


    this.CO()
    this.Ace()
      // This defines the heatmap we see, if dissipating is set false and radius is low, we see nothing. bump radius up and you'll start seeing the circles
  }
}
