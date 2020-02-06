import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, exhibitions, artworks } from '../services/exhibitions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  exhibitArray: Array<exhibitions> = [];
  exhibit : exhibitions;

  artArray: Array<artworks> = [];
  art : artworks;

  constructor(private apiExhibit : ExhibitionsService) {}

  ngOnInit(){
    this.getExhibitions();
    this.getArtworks();
  }

  getExhibitions(){
    this.apiExhibit.getExhibitionsFromBackEnd().subscribe((res : Array<exhibitions>) => {
      this.exhibitArray = res;

    })
  }

  getArtworks(){
    this.apiExhibit.getArtworksFromBackEnd().subscribe((res : Array<artworks>) =>{
      this.artArray = res;
      console.log(res);
    })
 
  }

}
