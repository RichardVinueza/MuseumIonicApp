import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const localhost = "http://localhost:8080";

export class Exhibitions{
  id : number;
  name : string;
  openingDate : string;
  closingDate : string;
  location : string;
}

export class Artworks{
  id : number;
  name : string;
  author : string;
  country : string;
}

export class Media{
  id: number;
  displayName : string;
  fileName : string;
  fileType : string;
  extension : string;

}

@Injectable({
  providedIn: 'root'
})

export class ExhibitionsService {

  constructor(private http : HttpClient) { }

  getExhibitionsFromBackEnd(){
    return this.http.get(localhost +  "/exhibitions");
  }

  getArtworksFromBackEnd(){
    return this.http.get(localhost + "/artworks");
  }

  getMediaFromBackEnd(){
    return this.http.get(localhost + "/medias");
  }

  // getImgFromBackEnd(){
  //   return this.http.get(localhost + "/img/la_gioconda.jpg");
  // }

}
