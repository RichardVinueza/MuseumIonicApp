import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExhibitionsPage } from './exhibitions.page';
import { HttpClientModule } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';

describe('ExhibitionsPage', () => {
  let component: ExhibitionsPage;
  let fixture: ComponentFixture<ExhibitionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionsPage ],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [StreamingMedia],
    }).compileComponents();

    fixture = TestBed.createComponent(ExhibitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('fun getExhibition', () => {
    component.getExhibitions();
    expect(component.exhibitArray).toEqual(jasmine.any(Array));
    for (let i = 0; i < component.exhibitArray.length; i++) {
      expect(component.exhibitArray[i].id).toEqual(jasmine.any(Number));
      expect(component.exhibitArray[i].name).toEqual(jasmine.any(String));
      expect(component.exhibitArray[i].closingDate).toEqual(jasmine.any(String));
      expect(component.exhibitArray[i].openingDate).toEqual(jasmine.any(String));
      expect(component.exhibitArray[i].location).toEqual(jasmine.any(String));
    }
  })

  it('fun changeArtwork work good', async() => {
    component.artArray = [
      {
        id: 1,
        name: "Gioconda",
        author: "Richard",
        country: "efw",
        media: [{
          id : 1,
          displayName: "string",
          fileName: "string",
          fileType: "string",
          extension: "string"
        }]  
      },
      {
        id: 2,
        name: "Gioconda",
        author: "Richard",
        country: "ewf",
        media: [{
          id : 1,
          displayName: "string",
          fileName: "string",
          fileType: "string",
          extension: "string"
        }]  
      },
      {
        id: 3,
        name: "Gioconda",
        author: "Richard",
        country: "ewfewf",
        media: [{
          id : 1,
          displayName: "string",
          fileName: "string",
          fileType: "string",
          extension: "string"
        }]              
      },
      {
        id: 4,
        name: "Gioconda",
        author: "Richard",
        country: "ewfewf",
        media: [{
          id : 1,
          displayName: "string",
          fileName: "string",
          fileType: "string",
          extension: "string"
        }]  
      },
      {
        id: 5,
        name: "Gioconda",
        author: "Richard",
        country: "ewfewf",
        media: [{
          id : 1,
          displayName: "string",
          fileName: "string",
          fileType: "string",
          extension: "string"
        }]  
      },
    ];

    await component.changeArtwork();

    expect(component.artArray[0].country).toBe("France");
    expect(component.artArray[1].country).toBe("France");
    expect(component.artArray[2].country).toBe("France");
    expect(component.artArray[3].country).toBe("Italy");
    expect(component.artArray[4].country).toBe("Italy");
  })

  it('fun getMedia', async() => {
    await component.getExhibitions();
    expect(component.mediaArray).toEqual(jasmine.any(Array));
    for (let i = 0; i < component.mediaArray.length; i++) {
      expect(component.mediaArray[i].id).toEqual(jasmine.any(Number));
      expect(component.mediaArray[i].displayName).toEqual(jasmine.any(String));
      expect(component.mediaArray[i].extension).toEqual(jasmine.any(String));
      expect(component.mediaArray[i].fileName).toEqual(jasmine.any(String));
      expect(component.mediaArray[i].fileType).toEqual(jasmine.any(String));
    }
  })

  it('fun playAudio', async() => {
    component.playAudio();

    expect(!component.audio.loop).toBeTruthy();
    expect(component.audioIsPlayed).toBeTruthy();
  })

  it('fun getArtworks', () => {
    component.getExhibitions();
    expect(component.artArray).toEqual(jasmine.any(Array));
    for (let i = 0; i < component.artArray.length; i++) {
      expect(component.artArray[i].id).toEqual(jasmine.any(Number));
      expect(component.artArray[i].name).toEqual(jasmine.any(String));
      expect(component.artArray[i].author).toEqual(jasmine.any(String));
      expect(component.artArray[i].country).toEqual(jasmine.any(String));
    }
  })
  

});
