import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class exhibitions{
  id : number;
  name : string;
  openingDate : string;
  closingDate : string;
  location : string;
}

export class artworks{
  id : number;
  name : string;
  author : string;
  country : string;
}

@Injectable({
  providedIn: 'root'
})

export class ExhibitionsService {

  localhost = "http://localhost:8080"

  constructor(private http : HttpClient) { }

  getExhibitionsFromBackEnd(){
    return this.http.get(this.localhost + "/exhibitions");
  }

  getArtworksFromBackEnd(){
    return this.http.get(this.localhost + "/artworks");
  }
}
