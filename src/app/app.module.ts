import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { MapService } from './services/map/map.service';
import { JSService } from './services/jsmap/js.service';
import { NativeService } from './services/native/native.service';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const fireconfig = {
    apiKey: "AIzaSyAl3acCFwURPMeDKi7yzkKl3K9n8SZYx2s",
    authDomain: "creationtestserve.firebaseapp.com",
    databaseURL: "https://creationtestserve.firebaseio.com",
    projectId: "creationtestserve",
    storageBucket: "creationtestserve.appspot.com",
    messagingSenderId: "393626221271"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AppRoutingModule,AngularFireModule.initializeApp(fireconfig),
    AngularFirestoreModule, BrowserModule, IonicModule.forRoot(), ],
providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    MapService,
    JSService,
    NativeService,
    GoogleMaps,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
