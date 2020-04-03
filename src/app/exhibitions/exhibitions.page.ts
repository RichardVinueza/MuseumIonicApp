import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, Exhibitions, Artworks, MediaApi, localhost, Beacons } from '../services/exhibitions.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { Storage } from '@ionic/storage';
import { NgZone } from '@angular/core';
import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.page.html',
  styleUrls: ['./exhibitions.page.scss'],
})

export class ExhibitionsPage implements OnInit {

  localhost = localhost;

  devices: any[] = [];
  beaconArray: Array<Beacons> = [];
  auxDevice: any;
  beacon: Beacons;

  exhibitArray: Array<Exhibitions> = [];
  exhibit: Exhibitions;

  artArray: Array<Artworks> = [];
  artArrayShow = new Array<Artworks>();
  art: Artworks;
  imgArtwork: any;

  typeFileChoices: [String];

  constructor(
    private apiExhibit: ExhibitionsService,
    private storage: Storage,
    private ble: BLE,
    private ibeacon: IBeacon
  ) { }

  ngOnInit() {
    this.getBeacons();
    this.getExhibitions();
  }

  ngAfterViewInit() {
    // this.getExhibitions();
  }

  getBeacons() {
    this.apiExhibit.getBeaconsFromBackEnd().subscribe((res: Array<Beacons>) => {
      this.beaconArray = res;
    })
  }

  scanForBeacons() {
    console.log("SCAN...");
    this.ble.startScan([]).subscribe(device => {
      if (device.name) {
        console.log(JSON.stringify(device));
      }
      for (this.beacon of this.beaconArray) {
        if (this.beacon.mac == device.id) {
          console.log("IDs MATCH");
          document.getElementById("load-exhibit").style.display = "block";
          this.getArtworks();
        }
      }
    })
    console.log("BEACON FOUND");
  }

  getExhibitions() {
    this.apiExhibit.getExhibitionsFromBackEnd().subscribe((res: Array<Exhibitions>) => {
      this.exhibitArray = res;
      console.log(res);

      this.storage.set('exhibitRes', res);
      this.storage.get('exhibitRes').then((val) => {
        console.log('exhibit array', res);
      })
    });
  }

  getArtworks() {
    this.apiExhibit.getArtworksFromBackEnd().subscribe((res: Array<Artworks>) => {
      this.artArray = res;
      console.log(res);

      this.storage.set('artworkRes', res);
      this.storage.get('artworkRes').then((val) => {
        console.log('artwork array', val);
      })
    });
  }

  changeTypeFile(event) {
    let fileChoice: [String] = event.detail.value;
    if (fileChoice == []) {
      this.typeFileChoices = ["image"]
      this.artArrayShow = this.artArray;
    } else {
      this.loadArtWorkShow(fileChoice);
    }
  }

  loadArtWorkShow(fileChoice: [String]) {
    this.artArrayShow = new Array<Artworks>();
    for (let art of this.artArray) {
      let mediaShow = false;
      for (let media of art.media) {
        if (fileChoice.includes(media.fileType)) {
          mediaShow = true;
        }
      }
      if (mediaShow == true) {
        this.artArrayShow.push(art);
      }
    }
    console.log(this.artArrayShow);
  }
}
