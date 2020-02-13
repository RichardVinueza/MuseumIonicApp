import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, Exhibitions, Artworks, Media, localhost } from '../services/exhibitions.service';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.page.html',
  styleUrls: ['./exhibitions.page.scss'],
})
export class ExhibitionsPage implements OnInit {

  exhibitArray: Array<Exhibitions> = [];
  exhibit: Exhibitions;

  artArray: Array<Artworks> = [];
  art: Artworks;

  mediaArray: Array<Media> = [];
  media: Media;

  imgToShow: string;

  audioLink: string;
  audio = new Audio();
  audioIsPlayed: boolean = false;

  videoUrl: string;

  constructor(
    private apiExhibit: ExhibitionsService,
  ) { }

  ngOnInit() {
    this.getExhibitions();
    this.getArtworks();
    this.getMedia();
    this.showImg();
    this.getAudio();
    this.getVideo();
  }

  getExhibitions() {
    this.apiExhibit.getExhibitionsFromBackEnd().subscribe((res: Array<Exhibitions>) => {
      this.exhibitArray = res;
    });
  }

  getArtworks() {
    this.apiExhibit.getArtworksFromBackEnd().subscribe((res: Array<Artworks>) => {
      this.artArray = res;
      console.log(res);
    });
  }

  getMedia() {
    this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<Media>) => {
      this.mediaArray = res;
    });
  }


  showImg() {
    this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<Media>) => {
      this.mediaArray = res;
      for (this.media of this.mediaArray) {
        if (this.media.id == 1) {
          this.imgToShow = localhost + '/img/' + this.media.fileName + '.' + this.media.extension;
        }
      }
    });
  }


  getAudio() {
    this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<Media>) => {
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
    this.apiExhibit.getMediaFromBackEnd().subscribe((res: Array<Media>) => {
      this.mediaArray = res;
      for (this.media of this.mediaArray) {
        if (this.media.extension == 'mp4') {
          this.videoUrl = localhost + '/video/' + this.media.fileName + '.' + this.media.extension;
          console.log("videoooooo: " + this.videoUrl);
        }
      }
    });
  }
}
