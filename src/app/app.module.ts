import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ExhibitionsPage } from './exhibitions/exhibitions.page';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { BLE } from '@ionic-native/ble/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],

  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    BLE,
    IBeacon,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
