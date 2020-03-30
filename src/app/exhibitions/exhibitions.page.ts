import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, Exhibitions, Artworks, MediaApi, localhost } from '../services/exhibitions.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { Storage } from '@ionic/storage';
import { BLE } from '@ionic-native/ble/ngx';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.page.html',
  styleUrls: ['./exhibitions.page.scss'],
})

export class ExhibitionsPage implements OnInit {

  localhost = localhost;

  devices: any[] = [];

  exhibitArray: Array<Exhibitions> = [];
  exhibit: Exhibitions;
  // auxEhibitArray: Array<Exhibitions> = [];
  // auxExhibit: Exhibitions;
  // exhibitBool: boolean;

  artArray: Array<Artworks> = [];
  artArrayShow = new Array<Artworks>();
  art: Artworks;
  imgArtwork: any;

  typeFileChoices: [String];

  // mediaArray: Array<MediaApi> = [];
  // media: MediaApi;

  // imgToShow: string;

  // audioLink: string;
  // audio = new Audio();
  // audioIsPlayed: boolean = false;

  // videoUrl: string;


  constructor(
    private apiExhibit: ExhibitionsService,
    private storage: Storage,
    private ibeacon: IBeacon,
    private ble: BLE,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.getArtworks();
    // this.getMedia();
    // this.getImg();
    // this.getAudio();
    // this.getVideo();
  }

  ngAfterViewInit() {
    this.getExhibitions();
  }

  scanForBeacon() {
    this.ble.startScan([]).subscribe(device => {
      console.log(JSON.stringify(device));
    });
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
