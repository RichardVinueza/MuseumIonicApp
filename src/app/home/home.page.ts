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

  img : Media;
  showImg : string;


  constructor(private apiExhibit : ExhibitionsService, private route : ActivatedRoute) {}

  ngOnInit(){
    this.getExhibitions();
    this.getArtworks();
    this.getMedia();
    this.getImg();
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

  getImg(){
    this.route.queryParams.subscribe((res : Media) => {
      this.img = res;
      console.log("MEDIAAA: " + this.img);
    });
    this.showImg = localhost + '/img/' + this.img.fileName + '.' + this.img.extension;
    console.log("SHOOOOW: " + this.showImg);
  }
}
