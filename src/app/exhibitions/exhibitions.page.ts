import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, Exhibitions, Artworks, MediaApi, localhost } from '../services/exhibitions.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { IBeacon } from '@ionic-native/ibeacon/ngx'

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.page.html',
  styleUrls: ['./exhibitions.page.scss'],
})
export class ExhibitionsPage implements OnInit {

  localhost = localhost;

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
    private ibeacon: IBeacon
    // private StreamingMedia: StreamingMedia
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

  async getExhibitions() {
    await this.apiExhibit.getExhibitionsFromBackEnd().subscribe((res: Array<Exhibitions>) => {
      this.exhibitArray = res;
      console.log(res);
      // setTimeout(() => {
      //   this.changeExhibition();
      // }, 5000);
    });
  }

  // changeExhibition() {
  //   for (this.exhibit of this.exhibitArray) {
  //     if (this.exhibit.id == 3 || this.exhibit.id == 2) {
  //       this.exhibit.location = 'Area 1';
  //     }
  //     if (this.exhibit.id == 1) {
  //       this.exhibit.location = 'Area 2';
  //     }
  //   }
  // }

  async getArtworks() {
    await this.apiExhibit.getArtworksFromBackEnd().subscribe((res: Array<Artworks>) => {
      this.artArray = res;
      // setTimeout(() => {
      //   this.changeArtwork();
      // }, 5000);

    });
  }

  // changeArtwork() {
  //   for (this.art of this.artArray) {
  //     if (this.art.id == 4) {
  //       this.art.country = 'Italy';
  //     }
  //     if (this.art.id == 5) {
  //       this.art.country = 'Italy';
  //     }
  //     if (this.art.id == 1) {
  //       this.art.country = 'France';
  //     }
  //     if (this.art.id == 2) {
  //       this.art.country = 'France';
  //     }
  //     if (this.art.id == 3) {
  //       this.art.country = 'France';
  //     }
  //   }
  // }

  // async getMedia() {
  //   await this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
  //     this.mediaArray = res;
  //   });
  // }

  // getImg() {
  //   this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
  //     this.mediaArray = res;
  //     for (this.media of this.mediaArray) {
  //       if (this.media.id == 1) {
  //         this.imgToShow = localhost + '/img/' + this.media.fileName + '.' + this.media.extension;
  //       }
  //     }
  //   });
  // }

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

  // showImage(){
  //   console.log("HIDE IMAGE");
  //   document.getElementById("picture").style.display = 'none';
  // }

  // getAudio() {
  //   this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
  //     this.mediaArray = res;
  //     for (this.media of this.mediaArray) {
  //       if (this.media.extension == 'mp3') {
  //         this.audioLink = localhost + '/audio/' + this.media.fileName + '.' + this.media.extension;
  //       }
  //     }
  //   });
  // }


  // getAudio() {
  //   this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
  //     this.mediaArray = res;
  //     for (this.media of this.mediaArray) {
  //       if (this.media.extension == 'mp3') {
  //         this.audioLink = localhost + '/audio/' + this.media.fileName + '.' + this.media.extension;
  //       }
  //     }
  //   });
  // }

  // playerAudio() {
  //   if (this.audioIsPlayed) {
  //     this.stopAudio();
  //   } else {
  //     this.playAudio();
  //   }
  // }

  // playAudio() {
  //   this.audio = new Audio(this.audioLink);
  //   this.audio.load();
  //   this.audio.play();
  //   this.audio.loop = false;
  //   this.audioIsPlayed = true;
  // }

  // stopAudio() {
  //   this.audio.pause();
  //   this.audioIsPlayed = false;
  // }

  // getVideo() {
  //   this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
  //     this.mediaArray = res;
  //     for (this.media of this.mediaArray) {
  //       if (this.media.extension == 'mp4') {
  //         this.videoUrl = localhost + '/video/' + this.media.fileName + '.' + this.media.extension;
  //         // console.log("videoooooo: " + this.videoUrl);
  //       }
  //     }
  //   });
  // }

  // playerVideo() {
  //   this.StreamingMedia.playVideo(this.videoUrl);
  // }
}
