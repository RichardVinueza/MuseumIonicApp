import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, Exhibitions, Artworks, Media, localhost } from '../services/exhibitions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  exhibitArray: Array<Exhibitions> = [];
  exhibit : Exhibitions;

  artArray: Array<Artworks> = [];
  art : Artworks;

  mediaArray : Array<Media> =[];
  media : Media;

  imgToShow : string;

  audioLink : string;
  audio = new Audio();




  constructor(private apiExhibit : ExhibitionsService, private route : ActivatedRoute) {}

  ngOnInit(){
    this.getExhibitions();
    this.getArtworks();
    this.getMedia();
    this.showImg();
    this.GetAudio();
  } 

  getExhibitions(){
    this.apiExhibit.getExhibitionsFromBackEnd().subscribe((res : Array<Exhibitions>) => {
      this.exhibitArray = res;
    });
  }

  getArtworks(){
    this.apiExhibit.getArtworksFromBackEnd().subscribe((res : Array<Artworks>) =>{
      this.artArray = res;
      console.log(res);
    });
  }

  getMedia(){
    this.apiExhibit.getMediaFromBackEnd().subscribe((res : Array<Media>) =>{
      this.mediaArray = res;
    });
  }

  
  showImg(){
    this.apiExhibit.getMediaFromBackEnd().subscribe((res : Array<Media>) =>{
      this.mediaArray = res;
      for(this.media of this.mediaArray){
        if(this.media.id == 1){
          this.imgToShow = localhost + '/img/' + this.media.fileName + '.' + this.media.extension; 
        }           
      }
    });
  }


  GetAudio(){
    this.apiExhibit.getMediaFromBackEnd().subscribe((res : Array<Media>) =>{
      this.mediaArray = res;
      for(this.media of this.mediaArray){
        if(this.media.extension == 'mp3' ){
          this.audioLink = localhost + '/audio/' + this.media.fileName + '.' + this.media.extension;       
        }        
      }
    });
  }

  playAudio(){
    this.audio.pause();
    this.audio = new Audio(this.audioLink);
    this.audio.load();
    this.audio.play();  
    this.audio.loop = false;
  }



}
