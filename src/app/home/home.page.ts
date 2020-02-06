import { Component, OnInit } from '@angular/core';
import { ExhibitionsService, exhibitions } from '../services/exhibitions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  exhibitArray: Array <exhibitions> = [];
  exhibit : exhibitions;

  constructor(private apiExhibit : ExhibitionsService) {}

  ngOnInit(){
    this.getExhibitions();
  }

  getExhibitions(){
    this.apiExhibit.getExhibitionsFromBackEnd().subscribe((res : Array<exhibitions>) => {
      this.exhibitArray = res;

    })
  }

}
