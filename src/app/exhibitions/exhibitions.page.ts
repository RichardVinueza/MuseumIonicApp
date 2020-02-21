import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, Exhibitions, Artworks, MediaApi, localhost } from '../services/exhibitions.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.page.html',
  styleUrls: ['./exhibitions.page.scss'],
})
export class ExhibitionsPage implements OnInit {

  exhibitArray: Array<Exhibitions> = [];
  exhibit: Exhibitions;
  auxEhibitArray: Array<Exhibitions> = [];
  auxExhibit: Exhibitions;
  exhibitBool: boolean;

  artArray: Array<Artworks> = [];
  art: Artworks;

  mediaArray: Array<MediaApi> = [];
  media: MediaApi;

  imgToShow: string;

  audioLink: string;
  audio = new Audio();
  audioIsPlayed: boolean = false;

  videoUrl: string;

  constructor(
    private apiExhibit: ExhibitionsService,
    private StreamingMedia: StreamingMedia
  ) { }

  ngOnInit() {
    this.getArtworks();
    this.getMedia();
    // this.showImg();
    this.getAudio();
    this.getVideo();
  }

  ngAfterViewInit() {
    this.getExhibitions();
  }

  async getExhibitions() {
    await this.apiExhibit.getExhibitionsFromBackEnd().subscribe((res: Array<Exhibitions>) => {
      this.exhibitArray = res;
      // setTimeout(() => {
      //   this.changeExhibition();
      // }, 10000);

    });
  }

  changeExhibition() {
    for (this.exhibit of this.exhibitArray) {
      if (this.exhibit.id == 3 || this.exhibit.id == 2) {
        this.exhibit.location = 'Area 1';
      }
      if (this.exhibit.id == 1) {
        this.exhibit.location = 'Area 2';
      }
    }
  }

  getArtworks() {
    this.apiExhibit.getArtworksFromBackEnd().subscribe((res: Array<Artworks>) => {
      this.artArray = res;
      // setTimeout(() => {
      //   this.changeArtwork();
      // }, 10000);
      
    });
  }

  changeArtwork() {
    for (this.art of this.artArray) {
      if (this.art.id == 4) {
        this.art.country = 'Italy';
      }
      if (this.art.id == 5) {
        this.art.country = 'Italy';
      }
      if (this.art.id == 1) {
        this.art.country = 'France';
      }
      if (this.art.id == 2) {
        this.art.country = 'France';
      }
      if (this.art.id == 3) {
        this.art.country = 'France';
      }
    }
  }

  async getMedia() {
    await this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
      this.mediaArray = res;
    });
  }

  showImg() {
    this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
      this.mediaArray = res;
      for (this.media of this.mediaArray) {
        if (this.media.id == 1) {
          this.imgToShow = localhost + '/img/' + this.media.fileName + '.' + this.media.extension;
        }
      }
    });
    document.getElementById('picture').style.display = 'block';
  }

  getAudio() {
    this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
      this.mediaArray = res;
      for (this.media of this.mediaArray) {
        if (this.media.extension == 'mp3') {
          this.audioLink = localhost + '/audio/' + this.media.fileName + '.' + this.media.extension;
        }
      }
    });

  }

  playerAudio() {
    if (this.audioIsPlayed) {
      this.stopAudio();
    } else {
      this.playAudio();
    }
  }

  playAudio() {
    this.audio = new Audio(this.audioLink);
    this.audio.load();
    this.audio.play();
    this.audio.loop = false;
    this.audioIsPlayed = true;
  }

  stopAudio() {
    this.audio.pause();
    this.audioIsPlayed = false;
  }

  getVideo() {
    this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<MediaApi>) => {
      this.mediaArray = res;
      for (this.media of this.mediaArray) {
        if (this.media.extension == 'mp4') {
          this.videoUrl = localhost + '/video/' + this.media.fileName + '.' + this.media.extension;
          // console.log("videoooooo: " + this.videoUrl);
        }
      }
    });
  }

  playerVideo() {
    this.StreamingMedia.playVideo(this.videoUrl);
  }
}
